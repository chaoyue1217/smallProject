/**
 * 课程基本信息
 */
define(["jquery", "template", "util","ckeditor","validate","form"], function ($, template,util,CKEDITOR) {
    util.setMenu("/course/add");
    // var id = location.search;
    var cs_id = util.queryString("cs_id");
    // var cs_id = id.slice(id.indexOf("=")+1);
    // console.log(cs_id);
    //获取课程的基本信息
    $.ajax({
        type:"get",
        url:"/api/course/basic",
        dataType:"json",
        data:{
            cs_id:cs_id
        },
        success:function (data) {
            //渲染模板
            var html = template("basicTpl",data.result);
            $("#basicInfo").html(html);
            //富文本处理
            CKEDITOR.replace("courseEditor");
            //提交表单
            $("#basicForm").validate({
                 sendForm:false,
                valid:function () {
                    //同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type:"post",
                        url:"/api/course/update/basic",
                        dataType:"json",
                        success:function (data) {
                            if(data.code==200){
                                location.href="/course/picture?cs_id="+data.result.cs_id;
                            }
                        }
                    });
                }
            });
        }
    });
});
