$(function() {
    // 获取短信随机验证码
    $('#vCode').on('tap', function() {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function(result) {
                // alert(result.vCode)
                console.log(result.vCode)
            }
        })
    })
    $('#register-but').on('tap', function() {
        let mobile = $.trim($('[name = mobile]').val())
        let username = $.trim($('[name = username]').val())
        let password = $.trim($('[name = password]').val())
        let againpassword = $.trim($('[name = againpassword]').val())
        let code = $.trim($('[name = code]').val())
            // 判断复选框是否选中
        let checkbox = $('[type = checkbox]')
        if (!username) {
            mui.toast('请输入用户名')
            return
        }
        if (!/^1\d{10}$/.test(mobile)) {
            mui.toast('请输入正确手机号')
            return
        }
        if (password != againpassword) {
            mui.toast('两次密码不一样')
            return
        }
        if (!/^\d{6}$/.test(code)) {
            mui.toast('请输入正确验证码')
            return
        }
        if (!checkbox.is(':checked')) {
            mui.toast('请同意会员协议')
            return
        }

        // 发送请求
        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: code
            },
            beforeSend: function() {
                $("#login-but").html('正在操作...')
            },
            success: function(result) {
                console.log(result)
                    // console.log(code)
                if (result.success) {
                    mui.toast('注册成功');
                    $("#login-but").html('注册')
                    setTimeout(function() {
                        // 跳转页面
                        location.href = "login.html"
                    }, 2000)
                } else {
                    mui.toast(result.message);
                    console.log(result.message)
                }
            }
        });
    })
})