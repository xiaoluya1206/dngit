$(function() {
    /* 通过地址栏获取id 调用商品接口 */
    let url = location.href;
    let id = url.slice(url.indexOf('=') + 1);
    console.log(id)
    let data = null;
    // 数量
    let code = ""
        // 库存
    let margin = 0
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
})