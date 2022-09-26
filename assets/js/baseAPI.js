//在每次$.ajax() \ get() \post()之前 先执行ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log('http://www.liulongbin.top:3007' + options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    //判断是否需要加token  根据文档判断出有/my/的就需要
    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    //给全局配置 挂载 complete 权限访问 
    //complete : fucn 无论成功与否都会执行的一个函数,这里用来判断是否身份验证成功的行为,如果没有验证通过 则跳转到login页面
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 提示没有通过验证 返回登录页面
            location.href = '/login.html';
        }
    }
})