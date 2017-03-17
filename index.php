<?php
    //该文件负责路径的分发
    $path = "index";
    $filename = "index";
    //判断路劲是否存在
    if(array_key_exists("PATH_INFO",$_SERVER)){
        //PATH_INFO 保存的是当前文件的后面的路径
        $url = $_SERVER['PATH_INFO'];
        //substr  截取从第一个开始的字符串，即去掉路径中的第一个'/'
        //explode  按'/'截取字符串
        $arr = explode('/',substr($url,1));
        if(count($arr)==2){
            $path = $arr[0];
            $filename = $arr[1];
        }
    }else{
        //不存在则进入登录页面
        $filename = 'login';
    }
   //include的作用就是载入一个页面
   include('./view/'.$path.'/'.$filename.'.html');

?>