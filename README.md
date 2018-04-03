# PostMessage

> html5跨域api postMessage 解决同一浏览器多个窗口(iframe)跨域通信的js

## 使用

###    script 引用
```javascript
     <script type="text/javascript" src="路径/PostMessage.js"></script>
```
<br><br>
###    初始化
```javascript
    //监听事件
    PM.extends("callbackName", function(data) {
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
    PM.send("targetName" , "callbackName" ,data)
```
>参数
   * targetName:  目标窗体名称,子窗体一律填"MESTER",父窗体要根据 iframe中的名称来填写,如 <br>
 ```javascript
    <iframe src="slave1.html" name="SLAVE1" id="SLAVE1"></iframe> 
    //发送请求
    PM.send("SLAVE1" , "callbackName" ,data)
 ```

   *    callbackName: 目标窗体的回调函数名称
   *    data: 发送的数据
<br><br>

###    API  (发送/接收中的data)
>通讯协议
*   请求
```javascript
    {
        Type: TypeName,
        Data: YourData
    }

    //充值请求
    PM.send("targetName" , "callbackName" ,{
        Type: "pay",
        Data: ""
    })
```
    
*   响应
```javascript
    {
        Type: TypeName,
        Data: Datas
    }

    //返回充值消息
    {
        Type: "pay",
        Data: {
           Status: true,
             Coin: "USD",
           Amount: 1000
        }
    }
```
<br>

*   获取账号信息 **Info** 

    <!-- (页面加载父窗口会主动发送) -->

参数

| 字段 | 类型 | 描述 |
| - | :-: | :- |
|Type | string| 类型为 info |
|Data.Uid | string | 用户ID |
|Data.Vip | uint32 | 用户Vip等级|
|Data.Name | string | 用户名称 |
|Data.Lang | string | 语言|


