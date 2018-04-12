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
    CTG.addEventListener(function(data) {
        业务逻辑....
    });
```
>参数
   * data:  接收到的数据

<br><br>

###    API


* ### 获取账户信息

 **请求**
```javascript
    CTG.getuserinfo()
```
**返回**

```javascript
    {
      Status: true,
        Type: "info",
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
|Type | string| 类型为 info |
|Data.Name | string | 用户名称 |
|Data.Uid | string | 用户ID |
|Data.Vip | uint32 | 用户Vip等级|
|Data.Lang | string | 语言|

<br>

* ### **充值**

 **请求**
```javascript
    CTG.pay()
```
**返回**

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



