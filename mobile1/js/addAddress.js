$(function() {
        // 判断用户点的编辑还是添加 编辑点击为1:true 添加为0:false
        let isEdit = Number(geturl(location.href, "Edit"))
            // console.log(isEdit)
        if (isEdit) {
            // 编辑
            let item = localStorage.getItem('editAddress')
                // console.log(item)
            if (item) {
                // 转为对象 本地为字符串
                let address = JSON.parse(item)
                console.log(address)
                let html = template('edit', address)
                $('#from').html(html)
            }
        } else {
            // 添加
            let html = template('edit', {})
            $('#from').html(html)
        }


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
            let item = localStorage.getItem('editAddress')

            let address = JSON.parse(item)

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
            let data = {
                recipients: username,
                postcode: postCode,
                address: city,
                addressDetail: detail
            };
            if (isEdit) {
                data.id = address.id
                var url = '/address/updateAddress'
            } else {
                var url = '/address/addAddress'
            }
            $.ajax({
                type: "post",
                url: url,
                data: data,
                success: function(result) {
                    // console.log(result.data)
                    if (result.success) {
                        if (isEdit) {
                            mui.toast('修改地址成功')
                        } else {
                            mui.toast('添加地址成功')
                        }
                        setTimeout(function() {
                            location.href = 'address.html'
                        }, 2000)
                    }
                }
            });
        })
    })
    // 获取地址栏isEdit=0/1
function geturl(url, name) {
    let params = url.substr(url.indexOf('=') + 1)
    return params;
    // console.log(params)
}