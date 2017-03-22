/**
 * 上传图片与裁切图片
 */
define(["jquery","template","util","uploadify"],function ($,template,util) {
    //设置导航选中
    util.setMenu("/course/add");
    //获取课程id
    var cs_id = util.queryString("cs_id");
    $.ajax({
        type:"get",
        url:"/api/course/picture",
        dataType:"json",
        data:{
            cs_id:cs_id
        },
        success:function (data) {
            //渲染模板
            var html = template("pictureTpl",data.result);
            $("#pictureInfo").html(html);
            console.log(data);
            //上传图片
            //处理文件上传
            $("#upfile").uploadify({
                width:80,
                height:"auto",
                buttonText:"选择图片",
                buttonClass:"btn btn-success btn-sm",
                formData:{
                  cs_id:cs_id
                },
                itemTemplate:"<span></span>",
                fileObjName: "cs_cover_original",
                swf: "/public/assets/uploadify/uploadify.swf",
                uploader: "/api/uploader/cover",
                onUploadSuccess: function (file, data) {
                    data = JSON.parse(data);
                    $(".preview img").attr("src", data.result.path);
                }
            });

        }
    })
})
