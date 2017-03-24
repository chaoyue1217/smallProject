/**
 * Created by YUE on 2017/3/23.
 */
define(["jquery","template","util"],function ($,template,util) {
    util.setMenu("/course/list");
    //查询课程列表数据
    $.ajax({
        url:"/api/course",
        type:"get",
        dataType:"json",
        success:function (data) {
            var html = template("listTpl",{list:data.result});
            $("#listInfo").html(html);
        }
        
    })
    
})