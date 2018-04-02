# PostMessage

> html5跨域api postMessage 解决同一浏览器多个窗口(iframe)跨域通信的js

## 使用

####    script 引用
     <script type="text/javascript" src="路径/PostMessage.js"></script>

####    初始化
    //监听事件
    PM.extends("callbackName", function(data) {
        业务逻辑....
    });

   * callbackName:  本体窗口的回调名称(可自定义,其他窗口发送消息给本窗体需要对应此名称)
   * data:  接收到的数据


####    发送消息
    //发送请求
    PM.send("targetName" , "callbackName" ,data)