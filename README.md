# CrypToGame

> html5跨域api postMessage 解决同一浏览器多个窗口(iframe)跨域通信的js

## 使用

###    script 引用
```javascript
     <script type="text/javascript" src="路径/cryptogame.js"></script>
```
<br><br>
###    初始化
```javascript
    //添加监听事件
    CTG.addEventListener("callbackName", function(data) {
        业务逻辑....
    });
```
>参数
   * callbackName:  本体窗口的回调名称(可自定义,其他窗口发送消息给本窗体需要对应此名称)
   * data:  接收到的数据

<br><br>
###   发送消息
```javascript
    //发送请求
    CTG.send("targetName" , "callbackName" ,data)
```
>参数
   * targetName:  目标窗体名称,子窗体一律填"MESTER",父窗体要根据 iframe中的名称来填写,如 <br>
 ```javascript
    <iframe src="slave1.html" name="SLAVE1" id="SLAVE1"></iframe> 
    //发送请求
    CTG.send("SLAVE1" , "callbackName" ,data)
 ```

   *    callbackName: 目标窗体的回调函数名称
   *    data: 发送的数据
<br><br>

###    API
>通讯协议
*   请求
```javascript
    {
        Type: TypeName,
        Data: YourData
    }

    //充值请求
    CTG.send("targetName" , "callbackName" ,{
        Type: "pay",
    })
```
    
*   响应
```javascript
    {   
      Status: true,
        Type: TypeName,
        Data: Datas
    }

    //返回充值消息
    {
      Status: true/false,
        Type: "pay",
        Data: {
             Coin: "USD",
           Amount: 1000
        }
    }
```
<br>


* ### getUserInfo

 **请求账户信息**
```javascript
    {
        Type: "getuserinfo"
    }
```
**返回账户信息**

```javascript
    {
      Status: true,
        Type: "getuserinfo",
        Data: {
            Name: "tony",
             Uid: "6MarTd",
             Vip: 0,
            Lang: "zh-cn",
        }
    }
```

参数

| 字段 | 类型 | 描述 |
| - | :-: | :- |
|Status | bool |  是否获取成功 |
|Type | string| 类型为 getuserinfo |
|Data.Name | string | 用户名称 |
|Data.Uid | string | 用户ID |
|Data.Vip | uint32 | 用户Vip等级|
|Data.Lang | string | 语言|

<br>

* ### **PAY**

 **请求充值**
```javascript
    {
        Type: "pay"
    }
```
**返回充值信息**

```javascript
    {
      Status: true,
        Type: "pay",
        Data: {
            Coin: "BTC",
          Amount: 1000
        }
    }
```

参数

| 字段 | 类型 | 描述 |
| - | :-: | :- |
|Status | bool |  是否充值成功 |
|Type | string| 类型为 pay |
|Data.Coin | uint32 | 币种。1 - BTC; 144 - USD|
|Data.Amount | float64 | 充值数量 |



