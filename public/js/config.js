/**
 * Created by YUE on 2017/3/18.
 */
require.config({
    baseUrl:"/public/assets",
    paths:{
        jquery:"jquery/jquery.min",
        cookie:"jquery-cookie/jquery.cookie",
        echarts:"echarts/echarts.min",
        template: "artTemplate/template",
        bootstrap:"bootstrap/js/bootstrap"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
});
