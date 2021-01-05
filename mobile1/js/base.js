//组件mui组件禁止使用a标签跳转 所以需要激活
$(function() {
    mui('body').on('tap', 'a', function() {
        document.location.href = this.href;
    });
})