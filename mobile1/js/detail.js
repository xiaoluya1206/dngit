$(function() {
    /* 通过地址栏获取id 调用商品接口 */
    let url = location.href;
    let id = url.slice(url.indexOf('=') + 1);
    console.log(id)
    let data = null;
    // 尺码
    let code = "";
    // 库存
    let margin = 0;
    $.ajax({
        type: "GET",
        url: "/product/queryProductDetail",
        // 异步
        async: false,
        data: {
            id: id
        },
        success: function(result) {
            // 将得到的数据放在变量data中
            data = result;
            console.log(data)
            let html = template('detail', result)
                // console.log(html)
            $("#detailInfo").html(html)
                // 轮播
            let galley = mui('.mui-slider')
            galley.slider({
                interval: 1000
            })
        }
    });

    $('.code').on('tap', '.item', function() {
        // 给当前点击的元素添加class为active 并且删除其他兄弟的active
        $(this).addClass('active').siblings().removeClass('active');
        // 获取码数
        code = $(this).text();
        // console.log(code)
    });
    // 加减联动 拿到具体商品数量
    margin = data.num
    let isNum = $('#num');
    let num = isNum.val()
    $('body').on('click', '#plus', function() {
        num++;
        if (num > margin) {
            num = margin
            mui.toast('没有库存啦')
        }
        isNum.val(num)
    }).on('click', '#minus', function() {
        num--;
        if (num < 1) {
            num = 1;
            mui.toast('数量不可少于一件')
        }
        isNum.val(num)
    });
    /* 加入购物车
    按钮添加点击事件获取用户选择的尺码数量 成功则跳转购物车页面
    */
    $('body').on('click', '.addCart', function() {
        // 判断选中的尺码不为空
        if (!$('.item.active').html()) {
            mui.toast('请选择尺码')
            return false;
        }
        if (!$('#num').val()) {
            mui.toast('请选择数量')
            return false;
        }
        $.ajax({
            type: "POST",
            url: "/cart/addCart",
            data: {
                productId: id,
                num: $('#num').val(),
                size: code
            },
            success: function(result) {
                console.log(result)
                if (result.success) {
                    mui.toast('加入成功')
                } else if (result.message == "未登录！") {
                    mui.toast('未登录，两秒后跳转登录页面');
                    setTimeout(() => {
                        location.href = "login.html"
                    }, 2000)
                } else {
                    mui.toast(result.message)
                }

            }
        });
    })
})