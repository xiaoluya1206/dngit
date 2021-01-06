$(function() {
    /*
    获取登录按钮 添加点击事件
    获取用户输入的账号和密码 进行简单验证
    调用登录接口 实现功能
    登录成功提示用户跳转会员中心
    */
    $("#login-but").on('tap', function() {
        // 获取属性name的输入框的值
        let username = $.trim($('[name = username]').val())
        let password = $.trim($('[name = password]').val())
        console.log(username)
        console.log(password)
        if (!username) {
            mui.toast('请输入用户名');
            return;
        }
        if (!password) {
            // mui的提示组件
            mui.toast('请输入密码');
            return;
        }
        // 发送请求
        $.ajax({
            type: "post",
            url: "/user/login",
            async: false,
            data: {
                username: username,
                password: password
            },
            // ajax请求回来之前出现正在加载的字样
            beforeSend: function() {
                $("#login-but").html('正在登录...')
            },
            success: function(result) {
                console.log(result)
                if (result.success) {
                    mui.toast('登录成功');
                    setTimeout(function() {
                        // 跳转页面
                        location.href = "user.html"
                    }, 2000)
                } else {
                    mui.toast(result.message);
                    // console.log(result.message);
                }
                setTimeout(function() {
                    $("#login-but").html('登录')
                }, 2000)
            }
        });
    })
})