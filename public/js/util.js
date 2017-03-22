/**
 * 工具模块
 */

define(["jquery"],function ($) {
    return {
        //设置列表选中的状态
        setMenu:function(pathname) {
            $(".navs a[href='"+pathname+"']").addClass("active").closest("ul").show();
        },
        queryString:function (pname) {
            var pathname = location.search;
            var pathname = pathname.slice(1);
            var obj = {};
            if(pathname){
                var arr = pathname.split("&");
                for(var i=0;i<arr.length;i++){
                    var kv = arr[i].split("=");
                    obj[kv[0]]=kv[1];
                }
            }
            return obj[pname];
        }
    }
});
