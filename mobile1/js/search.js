$(function() {
    /* 历史关键字 展示并存储
    创建存储关键字的数组 按下按钮追加在数组 将数组存储到localStorage里面
    判断本地存储是否有历史关键字 有就显示
    利用模板引擎拼接html 展示关键字
    */
    //  存储历史关键字
    let keyArr = []
    $('#search-btn').on('tap', function() {
        // 获取输入框的值 当前点击按钮的兄弟input的值
        let keyword = $(this).siblings('input').val();
        if (keyword) {
            keyArr.push(keyword)
            localStorage.setItem('keyArr', JSON.stringify(keyArr))
                /* 点击按钮跳转 获取关键字 有内容就跳转并携带关键字 */
            location.href = `search-result.html?keyword=${keyword}`
        } else {
            mui.toast('请您输入商品名称')
        }
    })
    if (localStorage.getItem("keyArr")) {
        // 字符串转数组
        keyArr = JSON.parse(localStorage.getItem("keyArr"))
            // console.log(keyArr)
        let html = template('history', { result: keyArr })
        $('#historyTop').html(html)
    }

    /* 删除单个历史记录
    判断自定义属性值是否与localStorage匹配 如果匹配则删除
    重新获取数组keyArr 重写模板引擎
    */
    $('body').on('tap', '.mui-icon-closeempty', function() {
        removeSearch($(this).parent().attr("data-key"))
            // removeSearch($(this).siblings('a').attr("data-key"))
    })

    // 清空
    $('.clear').on('tap', function() {
        localStorage.removeItem('keyArr');
        $('#historyTop').empty()
    })
})

let removeSearch = function(key) {
    let list = JSON.parse(localStorage.getItem('keyArr'));
    $.each(list, function(i, item) {
        // 当点击的×的值等于keyArr数组保存的值时  则删除list
        // console.log(item, i, key)
        if (key == item) {
            list.splice(i, 1)
            console.log(list)
                // console.log(i)
                // console.log(key)
                // console.log(item)
        }
    });
    // 获取到keyArr  重新把list赋值到里面
    localStorage.setItem('keyArr', JSON.stringify(list));
    // console.log(localStorage.getItem('list', JSON.stringify(list)))
    // 转为对象
    let keyArr = JSON.parse(localStorage.getItem('keyArr'));
    let html = template('history', { result: keyArr })
    $('#historyTop').html(html)
}