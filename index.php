<?php
    //该文件负责路径的分发
    $path = "index";
    $filename = "index";
    //判断路径是否存在
//    var_dump($_SERVER);
    if(array_key_exists("PATH_INFO",$_SERVER)){
        //PATH_INFO 保存的是当前文件的后面的路径
        $url = $_SERVER['PATH_INFO'];
        //substr  截取从第一个开始的字符串，即去掉路径中的第一个'/'
        //explode  按'/'截取字符串
        $arr = explode('/',substr($url,1));

        if(count($arr)==2){
            $path = $arr[0];
            $filename = $arr[1];
        }else{
            $filename = "login";
        }
    }else{
        //不存在则进入登录页面
        $filename = 'login';
    }
   //include的作用就是载入一个页面
   include('./view/'.$path.'/'.$filename.'.html');
   //---------------------------
    //整体代码分析
    /*
    1、$_SERVER['PATH_INFO']是为了获取当前文件，即index.php后面输入的路径，然后根据输入的路径进行页面的跳转
        1.1、如果当前文件后面没有路径，则进入登录页面
    2、将路径进行字符串的截取，例如把/index/login 截取成 数组["index","login"]
    3、将截取出来的字符串进行拼接，拼接成 .view/index/login.html，即输入地址后要跳转到的页面的路径
    */
?>