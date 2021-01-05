$(function() {
    // 获取短信随机验证码
    $('#vCode').on('tap', function() {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function(result) {
                alert(result.vCode)
            }
        })
    })
    $('#register-but').on('tap', function() {
        let username = $.trim($('[name = username]').val())
        let password = $.trim($('[name = password]').val())
        let againpassword = $.trim($('[name = againpassword]').val())
        let vCode = $.trim($('[name = vCode]').val())
            // 判断复选框是否选中
        let checkbox = $('[type = checkbox]').is(':checked')
    })
})