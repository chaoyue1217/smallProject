/**
 * 课程基本信息
 */
define(["jquery", "template", "util","ckeditor","validate","form"], function ($, template,util,CKEDITOR) {
    util.setMenu("/course/add");
    var cs_id = util.queryString("cs_id");
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
            //子级分类处理
            $("#topCategory").change(function () {
                var cg_id=$(this).val();
                $.ajax({
                    type:"get",
                    url:"/api/category/child",
                    datType:"json",
                    data:{
                        cg_id:cg_id
                    },
                    success:function (data) {
                        var tpl = "{{each list as item}}<option value='{{item.cg_id}}'>{{item.cg_name}}</option>{{/each}}"
                        var render  = template.compile(tpl);
                        var html = render({list:data.result});
                        $("#childCategory").html(html);
                    }
                })
            });
            $("#topCategory").trigger("change");
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
