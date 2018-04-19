# CrypToGame_SDK

> 游戏管理平台 与 外部游戏通信SDK

<br><br>
## 使用

###    script 引用
```javascript
     <script type="text/javascript" src="路径/cryptogame_sdk.js"></script>
```
<br><br>

###    API


* ### 获取账户信息

 **请求**
```javascript
    CTG.getuserinfo(function(response){
        // response:    返回的用户信息
    })
```
**返回**

```javascript
    {
      Status: 0,
        Data: {
            AppId:"1001"
            Lang:"zh-cn"
            Name:"tdex.1001.t"
            Nonce:"I6CGQC2OPSFXMOQ3"
            Sign:"4c4664510a376090bc35d6462bb60516"
            Time:1524106506
            Token:"f36c27143086893a37c81e60bdcb7745"
            Uid:"6L8Nhi"
        }
    }
```

参数

| 字段 | 类型 | 描述 |
| - | :-: | :- |
|Status | number |  0 表示获取成功 |
|Data.AppId | string | 游戏 id|
|Data.Lang | string | 语言|
|Data.Name | string | 用户名称 |
|Data.Nonce | string | 随机值|
|Data.Uid | string | 用户ID |
|Data.Time | string | 时间戳|
|Data.Token | string | Token|
|Data.Sign | string | 用于游戏校验参数|
    Sign = MD5("Uid={Uid}&Name={Name}&Nonce={Nonce}&Key={Key}")


<br>

* ### **充值**

 **请求**
```javascript
    CTG.pay(function(response){
        // response:    返回的充值消息
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
|Data.Coin | uint32 | 币种|
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


