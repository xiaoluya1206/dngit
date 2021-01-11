$(function() {
    $('body').on('tap', '#editpwd', function() {

        let oldpwd = $.trim($("[name='oldPassword']").val())
        let newpwd = $.trim($("[name='newPassword']").val())
        let agpwd = $.trim($("[name='againPassword']").val())
        let code = $.trim($("[name='code']").val())
        if (!oldpwd) {
            mui.toast('原密码不可为空');
            return;
        }
        if (!/^[\w_-]{6,16}$/.test(newpwd)) {
            mui.toast('请输入6-16位密码');
            return;
        }
        if (newpwd != agpwd) {
            mui.toast('两次密码不一致');
            return;
        }
        if (!/^\d{6}$/.test(code)) {
            mui.toast('验证码错误');
            return;
        }
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: oldpwd,
                newPassword: newpwd,
                vCode: code
            },
            success: function(result) {
                if (result.success) {
                    mui.toast('密码修改成功')
                    setTimeout(() => {
                        location.href = 'login.html'
                    }, 2000)
                } else {
                    mui.toast(result.message)
                }
            }
        })

    }).on('tap', '#vCode', function() {
        $.ajax({
            type: "GET",
            url: "/user/vCodeForUpdatePassword",
            success: function(result) {
                console.log(result.vCode)
            }
        });
    })
})