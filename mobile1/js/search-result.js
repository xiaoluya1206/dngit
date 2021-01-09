let page = 1;
let pageSize = 4;
let all = "";
let price = 1
    // 获取url关键字
let keyword = geturl(location.href, 'keyword');

$(function() {
    // 价格排序 获取价格按钮 添加事件 
    //三目动态控制升降序 调用商品接口+排序参数 刷新页面
    $('#priceSort').on('tap', function() {
        price = price === 1 ? 2 : 1
        all = "" //存储排序好的商品模板引擎
            // console.log(1)
        page = 1;
        // 刷新页面 重新渲染
        mui('#refreshContainer').pullRefresh().refresh(true)
        getData();

    })



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
            up: {
                height: 50,
                auto: true,
                contentrefresh: "正在刷新...",
                contentdown: "下拉可以刷新",
                contentnomore: '没有更多数据了',
                callback: getData
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
    // 根据url的关键字发送请求获取搜索结果 通过模板引擎渲染
    function getData() {
        let $this = this
        $.ajax({
            type: "GET",
            url: "/product/queryProduct",
            data: {
                proName: keyword,
                page: page++,
                price: price, //1升序 2降序(价格)
                //  num: //1升序 2降序 (库存)
                pageSize: pageSize
            },
            success: function(result) {
                if (result.data.length > 0) {
                    // 有数据就++
                    all += template('search-list', result)
                        // console.log(all)
                    $('#search-box').html(all)
                    $this.endPullupToRefresh(false);
                } else {
                    $this.endPullupToRefresh(true);
                }
            }
        });
    }
});


// 获取关键字函数
function geturl(url, name) {
    let params = url.substr(url.indexOf('=') + 1)
    return params;
    // console.log(params)
}