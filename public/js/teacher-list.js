/**
 * 讲师管理
 */
//实现教师数据列表加载
define(["jquery","template","bootstrap"],function ($,template) {
     $.ajax({
        type:"get",
         url:"/api/teacher",
         dataType:"json",
         success:function (data) {
             //解析数据，渲染页面（前端渲染）
             //模板引擎作用：模板+数据=静态标签
             var html = template("teacherTpl",{list:data.result});
             $("#teacherList").html(html);
             $(".teacherBtns").find("a:eq(0)").click(function () {
                 //处理弹窗
                 //
                 //closet  查找最近的父元素
                 var tc_id=$(this).closest("td").attr("data-id");
                 $.ajax({
                     type:"get",
                     url:"/api/teacher/view",
                     data:{tc_id:tc_id},
                     dataType:"json",
                     success:function (data) {
                         console.log(data.result);
                         if(data.code==200){
                             data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g," ");
                             var html = template("teacherInfoModal",data.result);
                             $("#teacherInfo").html(html);
                             $("#teacherModal").modal();
                         }
                     }
                 })

             });
         //   启用和注销讲师
             $(".teacherBtns").find("a:eq(2)").click(function () {
                 var tc_status = $(this).parent("td").attr("data-status");
                 var tc_id=$(this).closest("td").attr("data-id");
                 var td = $(this).parent("td");
                 var that = this;
                    $.ajax({
                        type:'get',
                        url:"/api/teacher/handle",
                        data:{tc_id:tc_id,tc_status:tc_status},
                        dataType:"json",
                        success:function (data) {
                            td.attr("data-status",data.result.tc_status);
                            if(data.result.tc_status==0){
                                $(that).text("启 用");
                            }else{
                                $(that).text("注 销");
                            }
                        }
                    })
             });
         }
     });
    //查看讲师功能


});
