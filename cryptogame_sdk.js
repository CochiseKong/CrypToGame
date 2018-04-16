(function () {
	// 获取 url 参数
	var getParam = function (name) {
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
			console.log('未登录');
		}
		return items;
	};
	var Token = getParam('Token');
	var Time = getParam('Time');

	var CTG = function () {};
	CTG.prototype = {
		// 通信方法
		Ajax: function (postData, url, fn) {
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
			xhr.onreadystatechange = function () {　　 //当状态为4的时候，执行以下操作
				// console.log(xhr.readyState)
				if (xhr.readyState == 4) {
					try {
						fn(JSON.parse(xhr.responseText));
					} catch (e) {
						// alert('你访问的页面出错了');
					};
				};
			};
		},

		//获取用户信息
		getuserinfo: function (fn) {
			this.Ajax({
				"Token": Token,
				"Time": parseInt(Time)
			}, "/user/info", fn)
		},
		//横屏
		landscape: function (fn) {
			window.parent.postMessage('landscape', '*');
		},
		//竖屏
		portrait: function (fn) {
			window.parent.postMessage('portrait', '*');
		},
		//充值
		pay: function (fn) {
			var dialog = document.createElement('div');
			var bgbox = document.createElement('div');
			var h2 = document.createElement('h2');
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
			btnBox.style.marginTop= "20px";
			//数字类型
			input.type="number";
			// 文本
			h2.innerHTML = '充值';
			enter.innerHTML = '确认';
			cancel.innerHTML = '取消';
			// 在容器元素中放入其他元素		
			dialog.appendChild(h2);
			dialog.appendChild(input);
			dialog.appendChild(btnBox);
			btnBox.appendChild(enter);
			btnBox.appendChild(cancel);
			// 给按键绑定点击
			enter.onclick = function () {
				document.body.removeChild(bgbox);  
				document.body.removeChild(dialog);    
				// dialog.style.display = 'none'
				fn({
					"Status": input.value!=''?'success':'error',
					"Type": "pay",
					"data": {
						"Coin": "BTC",
						"Amount": input.value
					}
				})
			}
			cancel.onclick = function () {
				document.body.removeChild(bgbox);   
				document.body.removeChild(dialog);   
			}
			document.body.appendChild(bgbox);
			document.body.appendChild(dialog);
		},
	};
	window.CTG = new CTG();
})(this);
