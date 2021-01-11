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
            console.log(html)
            $("#detailInfo").html(html)
        }
    });
})
















// <!-- 轮播下的点 -->
//                                 <div class="mui-slider-indicator">
//                                     <%for(let i = 0;i<pic.length;i++){ %>
//                                         <div class="mui-indicator <%=i==1?'mui-active':''" %>"></div>
//                                         <%}%>
//                                 </div>






{
    /* <div class="mui-slider-group mui-slider-loop">
                    <!--支持循环，需要重复图片节点-->
                    <%if(!pic||pic.length==0){%>
                        pic = [{'picAddr':'/shopping/images/none.png'}]
                        <%}%>
                            <div class="mui-slider-item mui-slider-item-duplicate">
                                <a href="#"><img src="<%=pic.length-1%>" /></a>
                            </div>
                            <%for(let i = 0;i<pic.length;i++){%>
                                <div class="mui-slider-item">
                                    <a href="#"><img src="<%=pic[i].picAddr%>" /></a>
                                </div>
                                <%}%>
                                    <!--支持循环，需要重复图片节点-->
                                    <div class="mui-slider-item mui-slider-item-duplicate">
                                        <a href="#"><img src="<%=pic.length-1 %>" /></a>
                                    </div>


                </div> */
}