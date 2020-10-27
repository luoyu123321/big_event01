$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwds = $('.reg-box input[name=password]').val()
            if (value !== pwds) {
                return '两次密码输入不一致'
            }
        }
    })
    var layer = layui.layer

    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    // alert(res.message)
                    layer.msg(res.message)
                }
                // alert(res.message)
                layer.msg('注册成功,请登录!!')
                $('#link_login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功!')
                    // 保存token值到本地
                localStorage.setItem('token', res.token)
                    // 跳转
                location.href = "/index.html"
            }
        })
    })



})