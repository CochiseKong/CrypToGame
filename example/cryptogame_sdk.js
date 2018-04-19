(function() {
  var CTG = function() {};
  CTG.prototype = {
    setCookie: function(c_name, value, expiredays) {
      var exdate = new Date()
      exdate.setMinutes(exdate.getMinutes() + expiredays)
      document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    getCookie: function(c_name) {
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1
          c_end = document.cookie.indexOf(";", c_start)
          if (c_end == -1) c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ""
    },
    _isEmbeded: function() {
      return window.self !== window.top;
    },
    // 通信方法
    Ajax: function(postData, url, fn) {
      var xhr = null;
      try {
        xhr = new XMLHttpRequest();
      } catch (e) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      };
      xhr.open('post', 'https://tw1.cryptogame.com/opensdk/v0.1.0' + url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      xhr.withCredentials = true;
      xhr.send(JSON.stringify(postData));
      xhr.onreadystatechange = function() {　　 //当状态为4的时候，执行以下操作
        if (xhr.readyState == 4) {
          try {
            let redata = JSON.parse(xhr.responseText);
            if (redata.Status != 0) {
              if (this._isEmbeded()) {
                window.parent.postMessage('NoLogin', '*');
              } else {
                window.location.href = 'https://tw1.cryptogame.com/index.html#/login'
              }
            }
            if (url == "/user/token") {
              fn(JSON.parse(xhr.responseText));
            } else if (url == "/game/userinfo") {
              redata.Data.AppId = getParam('AppId');
              fn(redata);
            } else {
              fn(redata);
            }
          } catch (e) {
            // console.log(e);
          };
        };
      };
    },

    //获取用户信息
    getuserinfo: function(fn) {
      this.Ajax({
        "Token": window.CTGToken,
        "Time": parseInt(window.CTGTime),
        "Data": {
          "AppId": parseInt(getParam('AppId'))
        }
      }, "/game/userinfo", fn)
    },
    //横屏
    landscape: function(fn) {
      window.parent.postMessage('landscape', '*');
    },
    //竖屏
    portrait: function(fn) {
      window.parent.postMessage('portrait', '*');
    },
    //充值
    pay: function(fn) {
      var Quantity
      var Unconfirm
      var Currency
      var dialog = document.createElement('div');
      var bgbox = document.createElement('div');
      var h2 = document.createElement('h2');
      // var Quantity = document.createElement('span');
      // var Unconfirm = document.createElement('span');
      var hang1 = document.createElement('div');
      var hang2 = document.createElement('div');
      var input = document.createElement('input');
      var btnBox = document.createElement('div');
      var enter = document.createElement('button');
      var cancel = document.createElement('button');
      // 样式
      bgbox.style.position = 'absolute';
      bgbox.style.zIndex = '998';
      bgbox.style.left = '0';
      bgbox.style.right = '0';
      bgbox.style.top = '0';
      bgbox.style.bottom = '0';
      bgbox.style.background = 'black';
      bgbox.style.opacity = '0.6';
      dialog.style.position = 'absolute';
      dialog.style.zIndex = '999';
      dialog.style.borderRadius = '10px';
      dialog.style.margin = '20px';
      dialog.style.background = '#ddd';
      dialog.style.textAlign = 'center';
      dialog.style.top = '50%';
      dialog.style.left = '0';
      dialog.style.width = '90%';
      dialog.style.height = '300px';
      dialog.style.marginTop = '-150px';
      btnBox.style.marginTop = "20px";
      //数字类型
      input.type = "number";
      // 文本
      h2.innerHTML = '充值';
      enter.innerHTML = '确认';
      cancel.innerHTML = '取消';
      // 在容器元素中放入其他元素
      dialog.appendChild(h2);
      dialog.appendChild(hang1);
      dialog.appendChild(hang2);
      dialog.appendChild(input);
      dialog.appendChild(btnBox);
      btnBox.appendChild(enter);
      btnBox.appendChild(cancel);

      // 确定按钮绑定事件
      let _this = this
      enter.onclick = function() {
        document.body.removeChild(bgbox);
        document.body.removeChild(dialog);
        if (Quantity + Unconfirm >= parseInt(input.value)) {
          // 提交充值
          _this.Ajax({
            "Token": window.CTGToken,
            "Time": parseInt(window.CTGTime),
            "Data": {
              "AppId": parseInt(getParam('AppId')),
              "Amount": parseInt(input.value)
            }
          }, "/game/transfer", function(data) {
            if (data.Status == 0) {
              fn({
                Status: 0,
                Data: {
                  Coin: Currency,
                  Amount: input.value
                }
              })
            } else {
              alert(data.Error)
            }
          })
        } else {
          alert('余额不足')
        }
      }

      // 取消按钮绑定事件
      cancel.onclick = function() {
        document.body.removeChild(bgbox);
        document.body.removeChild(dialog);
      }

      document.body.appendChild(bgbox);
      document.body.appendChild(dialog);
      // 查询余额
      this.Ajax({
        "Token": window.CTGToken,
        "Time": parseInt(window.CTGTime),
        "Data": {
          "AppId": parseInt(getParam('AppId'))
        }
      }, "/game/userbalance", function(data) {
        if (data.Status == 0) {
          Quantity = data.Data.Quantity
          Unconfirm = data.Data.Unconfirm
          Currency = data.Data.Currency
          hang1.innerHTML = '总余额:' + data.Data.Quantity + ' / ' + '未确认:' + data.Data.Unconfirm;
          hang2.innerHTML = '提现冻结量:' + data.Data.Withdraw + ' / ' + '转账冻结量:' + data.Data.Transfer + ' / ' + '保证金冻结量:' + data.Data.Deposit + '<br/>';
        } else {
          alert('查询余额失败,请刷新重试')
        }
      })
    }
  };

  window.CTG = new CTG();

  // 获取 url 参数
  var getParam = function(name) {
    var search = document.location.href;
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      } catch (e) {
        try {
          items = decodeURIComponent(matcher[1]);
        } catch (e) {
          items = matcher[1];
        }
      }
    } else {
      console.log('url缺少参数');
      window.location.href = 'https://tw1.cryptogame.com/index.html#/login'
    }
    return items;
  };

  //获取 Token/Time
  if (window.CTG.getCookie('CTGTime') != '' && window.CTG.getCookie('CTGToken') != '') {
    if (window.CTG.getCookie('CTGTime') > getParam('Time')) {
      window.CTGTime = window.CTG.getCookie('CTGTime')
      window.CTGToken = window.CTG.getCookie('CTGToken')
    } else {
      window.CTGTime = getParam('Time')
      window.CTGToken = getParam('Token')
    }
  } else {
    window.CTGToken = getParam('Token');
    window.CTGTime = getParam('Time');
  }

  function CTGTimer() {
    setTimeout(function() {
      // 定时器
      window.CTG.Ajax({
        "Token": window.CTGToken,
        "Time": parseInt(window.CTGTime)
      }, "/user/token", function(res) {
        window.CTG.setCookie('CTGToken', res.Data.OpenToken, 10)
        window.CTG.setCookie('CTGTime', res.Data.Time, 10)
        window.CTGToken = res.Data.OpenToken
        window.CTGTime = res.Data.Time.toString()
      })
      CTGTimer()
    }, 600000);
  }
  CTGTimer()

})(this);
