
	NProgress.start();

	NProgress.done();

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