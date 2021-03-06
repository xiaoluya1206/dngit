//保存用户信息
let userInfo = null;
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    // async：异步 false为同步
    async: false,
    success: function(result) {
        // 登陆拦截 判断如果返回的用户信息为error  并且不是为登录状态便跳转到登录页面
        if (result.error || result == 400) {
            location.href = 'login.html'
        }
        userInfo = result
            // console.log(userInfo)
    }
});

$(function() {
    // 退出登录
    // 添加点击事件
    // 接口实现退出登录
    // 退出 跳转登录页面
    $('#logout').on('tap', function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(result) {
                // console.log(result)
                if (result.success) {
                    mui.toast('退出成功')
                    setTimeout(() => {
                        location.href = 'login.html'
                    }, 2000)
                }
            }
        });
    });
    // 模板id 请求到的数据
    let html = template(`userTpl`, userInfo)
    $('#userInfor').html(html)
})