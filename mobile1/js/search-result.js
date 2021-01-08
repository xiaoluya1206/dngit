let page = 1;
let pageSize = 3;
let all = "";
// 获取url关键字
let keyword = geturl(location.href, 'keyword');

$(function() {
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    // 根据url的关键字发送请求获取搜索结果 通过模板引擎渲染
    function getData() {
        let $this = this
        $.ajax({
            type: "GET",
            url: "/product/queryProduct",
            data: {
                proName: keyword,
                page: page++,
                // price:1升序 2降序(价格)
                // num:1升序 2降序 (库存)
                pageSize: pageSize
            },
            success: function(result) {
                // console.log(result)
                // if (result.data.length > 0) {
                //     let html = template('search-list', result);
                //     $('#search-box').html(html);
                // }
                if (result.data.length > 0) {
                    // 有数据就++
                    all += template('search-list', result)
                        // console.log(all)
                    $('#search-box').html(all)
                    $this.endPullupToRefresh(false)
                } else {
                    $this.endPullupToRefresh(true)
                }
            }
        });
    }
})


// 获取关键字函数
function geturl(url, name) {
    let params = url.substr(url.indexOf('=') + 1)
    return params;
    // console.log(params)
}