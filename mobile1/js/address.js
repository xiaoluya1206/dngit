$(function() {
    // 获取收货地址 传输到模板引擎
    // 储存收货地址
    let address = null;
    $.ajax({
        type: "GET", //默认get
        url: "/address/queryAddress",
        beforeSend: function() {}, //请求发送前回调,常用验证
        success: function(result) { //请求成功回调
            // console.log(result)
            address = result
            let html = template('address', { result: address })
            $('#address-box').html(html)
        },
    })

    // 删除收货地址
    // 获取按钮 添加点击事件
    // 点击确认 则删除 并且左滑关掉
    // 调用删除收货地址接口 并刷新页面重新请求
    $('#address-box').on('tap', '.delete-btn', function() {
            // 获取删除按钮的id 作为参数传递 删除对应收货地址
            let id = $(this).attr('data-id')
            let li = this.parentNode.parentNode;
            // console.log(id)
            // 弹出确认框判断是否删除 mui封装的 确认返回index:1 取消返回index:0
            mui.confirm('确定要删除吗', function(message) {
                if (message.index == 1) {
                    // 删除地址
                    $.ajax({
                        type: "post", //默认get
                        url: "/address/deleteAddress",
                        data: {
                            id: id
                        },
                        success: function(result) {
                            // console.log(result)
                            if (result.success) {
                                // 重新加载本页面
                                location.reload()
                            }
                        },
                    })
                } else {
                    // 滑块回到原位
                    mui.swipeoutClose(li)
                }
            });
        })
        // 编辑地址
        // 编辑按钮添加点击事件
        // 跳转收货地址管理页面并获取要编辑的地址显示在输入框
        // 给确认按钮添加点击事件 发送请求 跳转至收货地址列表页
    $('#address-box').on('tap', '.edit-btn', function() {
        let id = $(this).attr('data-id')
        for (let i = 0; i < address.length; i++) {
            if (address[i].id == id) {
                // 对象转为json字符串 [i]一条
                localStorage.setItem('editAddress', JSON.stringify(address[i]))
                break;
            }
        }
        // 跳转页面
        location.href = 'addAddress.html?Edit=1'
            // location.href = 'addAddress.html'
    })
})