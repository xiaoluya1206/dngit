$(function() {
    //给省市区输入框添加点击事件 三级联通实例化并填充数据 获取用户选中的省市区作为input的value
    // 创建picker选择器 三级联动
    let picker = new mui.PopPicker({ layer: 3 })
        // 添加数据
    picker.setData(cityData)
        // 输入框添加点击事件 调用picker选择器
    $('#aelectCity').on('tap', function() {
        picker.show(function(selectItems) {
            //获取选中区作为input的value 下标0表示省 1=>市 
            $('#aelectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    });
    $("#addAddress").on('tap', function() {
        let username = $.trim($('[name=username]').val());
        // 邮政编码
        let postCode = $.trim($('[name=postCode]').val());
        let city = $.trim($('[name=city]').val());
        let detail = $.trim($('[name=detail]').val());
        if (!username) {
            mui.toast('请输入收货人姓名')
            return;
        }
        if (!postCode) {
            mui.toast('请输入邮政编码')
            return;
        }
        if (!city) {
            mui.toast('请输入省市区')
            return;
        }
        if (!detail) {
            mui.toast('请输入详细地址')
            return;
        }
        $.ajax({
            type: "post",
            url: "/address/addAddress",
            data: {
                recipients: username,
                postcode: postCode,
                address: city,
                addressDetail: detail
            },
            success: function(result) {
                if (result.success) {
                    mui.toast('添加地址成功')
                    setTimeout(function() {
                        location.href = 'address.html'
                    }, 2000)
                }
            }
        });
    })
})