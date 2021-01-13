$(function() {

    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                height: 50,
                auto: false,
                contentdown: "下拉可以刷新",
                contentover: "释放立即刷新",
                contentrefresh: "正在刷新...",
                callback: pulldownRefresh
            },
        }
    });
    // 下拉刷新
    function pulldownRefresh() {
        setTimeout(function() {
            location.reload();
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }, 1000)
    }


    $.ajax({
        type: "get",
        url: "/cart/queryCart",
        success: function(result) {
            console.log(result);
            // 登陆拦截
            if (result.message == "未登录！") {
                location.href = "login.html"
            } else {
                let html = template('carttp', { result: result })
                $('#cart_box').html(html)
            }
        }
    });

    // 删除
    $('body').on('tap', '.delete-btn', function() {
            // 获取删除按钮的id 作为参数传递 删除对应收货地址
            let id = $(this).attr('data-id')
            let li = this.parentNode.parentNode;
            // console.log(id)
            // 弹出确认框判断是否删除 mui封装的 确认返回index:1 取消返回index:0
            mui.confirm('确定要删除吗', function(message) {
                if (message.index == 1) {
                    // 删除购物车
                    $.ajax({
                        type: "GET", //默认get
                        url: "/cart/deleteCart",
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
        // 修改
    $('body').on('tap', '.edit-btn', function() {
        let address = null;
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