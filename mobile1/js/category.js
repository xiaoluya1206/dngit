$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 请求数据
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            // console.log(res)
            // 模板引擎 artTemplate 作用：html拼接后端数据
            // 步骤：拼接 参数1：html模板的id 参数2：数据
            let html = template(`category-first`, { result: res.rows })
                // 获取页面id为links的html为从后台请求到的内容
            $("#links").html(html);
            // 如果一级分类有数据
            if (res.rows.length) {
                //第一个a标签 添加class名
                $("#links").find("a").eq(0).addClass("active")
                    // 获取一级分类id
                let id = res.rows[0].id;
                // 根据id获取对应分类数据
                $.ajax({
                    url: '/category/querySecondCategory',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: function(res) {
                        // console.log(res)
                        let li = template(`category-second`, { result: res.rows });
                        $("#brand-list").html(li)
                    }
                })
            }
        }
    })


    // 点击一级分类获取对应二级分类数据 tap:移动端轻敲事件 同click
    $("#links").on('tap', 'a', function() {
        // console.log(11)
        // 获取当前一级分类自定义id
        let id = $(this).attr("data-id");
        // console.log(id)
        // 点击当前 添加选中效果 其他兄弟删除class
        $(this).addClass('active').siblings().removeClass("active")
            // 根据当前点击的馆 显示对应二级数据
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'GET',
            dataType: 'json',
            data: {
                id: id
            },
            success: function(res) {
                // console.log(res)
                let li = template(`category-second`, { result: res.rows });
                $("#brand-list").html(li)
            }
        })
    })
})