/**
 * 课时管理
 */
define(["jquery", "template", "util", "bootstrap", "validate", "form"], function ($,template,util) {
    var cs_id = util.queryString("cs_id");
    util.setMenu("/course/add");
    $.ajax({
        type:'get',
        url:"/api/course/lesson",
        data:{
            cs_id:cs_id
        },
        dataType:"json",
        success:function (data) {
            if(data.code==200){
                var html = template("lessonTpl",data.result);
                $("#lessonInfo").html(html);
                //添加课时
                $("#addLesson").click(function () {
                    var html=template("lessonModalTpl",{operation:"添加课时"});
                    $("#lessonModalInfo").html(html);
                    $("#chapterModal").modal();
                    courseTime("/api/course/chapter/add")

                });

                //编辑课时
                $(".editLesson").click(function () {
                    var ct_id = $(this).attr("data-ctId");
                    $.ajax({
                        url:"/api/course/chapter/edit",
                        type:"get",
                        dataType:"json",
                        data:{
                            ct_id:ct_id
                        },
                        success:function (data) {
                            data.result.operation = "编辑课时";
                            var html=template("lessonModalTpl",data.result);
                            $("#lessonModalInfo").html(html);
                            //提交编辑
                            courseTime("/api/course/chapter/modify");
                            $("#chapterModal").modal();

                        }
                    });
                });
                function courseTime(url) {
                    $("#lessonForm").validate({
                        sendForm: false,
                        valid: function () {
                            var free = $("#isFree").prop("checked") ? 1 : 0;
                            $(this).ajaxSubmit({
                                url: url,
                                type: "post",
                                data: {
                                    ct_cs_id: cs_id,
                                    ct_is_free: free
                                },
                                dataType: "json",
                                success: function (data) {
                                    location.href="/course/lesson?cs_id="+cs_id;
                                }

                            });
                        }
                    });
                }
            }
        }
    });





});
