// 不同时期,用谁解谁
// 开发环境服务器地址
var baseUrl = 'http://ajax.frontend.itheima.net'
    // 测试环境服务器地址
    // var baseUrl ='http://ajax.frontend.itheima.net'
    // 生产环境服务器地址
    // var baseUrl ='http://ajax.frontend.itheima.net'

// $.ajaxPrefilter()要绑在所有ajax之前
// 这个方法会在ajax请求执行后再触发
// 只有这个方法执行完毕,ajax才会真正发送

$.ajaxPrefilter(function(options) {
    options.url = baseUrl + options.url
});