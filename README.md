# CrypToGame

> html5跨域api postMessage 解决同一浏览器多个窗口(iframe)跨域通信的js

<br><br>
## 使用

###    script 引用
```javascript
     <script type="text/javascript" src="路径/cryptogame.js"></script>
```
<br><br>

###    API


* ### 获取账户信息

 **请求**
```javascript
    CTG.getuserinfo(function(response){
        // response: 返回的用户信息
    })
```
**返回**

```javascript
    {
      Status: 0,
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
|Status | number |  0 表示获取成功 |
|Data.Name | string | 用户名称 |
|Data.Uid | string | 用户ID |
|Data.Vip | uint32 | 用户Vip等级|
|Data.Lang | string | 语言|

<br>

* ### **充值**

 **请求**
```javascript
    CTG.pay(function(response){
        // response: 返回的充值消息
    })
```
**返回**

```javascript
    {
      Status: 0,
        Data: {
            Coin: "BTC",
          Amount: 1000
        }
    }
```

参数

| 字段 | 类型 | 描述 |
| - | :-: | :- |
|Status | number |  0 表示充值成功 |
|Data.Coin | uint32 | 币种。1 - BTC; 144 - USD|
|Data.Amount | float64 | 充值数量 |

<br>

* ### **横屏**

 **请求**
```javascript
    CTG.landscape()
```
**返回**

```javascript
    无
```

<br>

* ### **竖屏**

 **请求**
```javascript
    CTG.portrait()
```
**返回**

```javascript
    无
```


