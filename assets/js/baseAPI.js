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

    // 对需要权限的接口配置头信息
    // 必须以my开头才行
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空本地token
            localStorage.removeItem('token')
                //跳转登录页
            location.href = '/login.html'

        }
    }
});