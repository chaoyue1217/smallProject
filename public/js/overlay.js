//加载数据时遮罩
define(["jquery","nprogress"],function ($,nprogress) {
    /**
     * 控制全局遮罩
     */
    $(document).ajaxStart(function () {
        $(".overlay").show();
    });
    //如果同时发送多次ajax请求，那么stop会以最后响应完成的时间为准   
    $(document).ajaxStop(function () {
            $(".overlay").hide();
    });
    //进度条功能
    nprogress.start();
    nprogress.done();
});
