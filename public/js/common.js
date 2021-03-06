//公共js
define(["jquery","template","cookie"],function ($,template) {
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
    var pathName = location.pathname;
    //没有登录的时候跳转到登录页
    var flag = $.cookie("PHPSESSID");
    if(!flag && pathName.indexOf("login") == -1){
        //没有登录
        location.href = '/login';
    }
    /*
        实现登录功能
     */
    $("#loginForm").submit(function () {
        var formData = $(this).serialize();
        $.ajax({
            url:"/api/login",
            type:"post",
            data:formData,
            dataType:"json",
            success:function (data) {
                if(data.code==200){
                    var logInfo = JSON.stringify(data.result);
                    //实现cookie数据的跨页面共享
                    $.cookie("logInfo",logInfo,{path:"/"});
                    location.href = "index/index";
                }
            },
            error:function (data) {
                //错误提示
            }
        });
        return false; //阻止表单的默认提交行为
    });


    /*
        退出功能
     */
    $("#logoutId").click(function () {
        $.ajax({
            type:"post",
            url:"/api/logout",
            dataType:"json",
            success:function (data) {
               if(data.code==200){
                   location.href = "/login";
               }
            }
        })
    });

    /**
     *模板渲染个人信息
     */
    var obj = JSON.parse($.cookie("logInfo"));
    var tpl = '<div class="avatar img-circle"> ' +
        '<img src="{{tc_avatar}}"> ' +
        '</div> ' +
        '<h4>{{tc_name}}</h4>';
    var render = template.compile(tpl);
    var html = render(obj);
    $(".aside .profile").html(html);
});
