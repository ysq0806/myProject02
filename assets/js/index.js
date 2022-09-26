$(function () {
    var layer = layui.layer;

    // 获取个人信息 更新头像
    initAvatar();
    console.log(localStorage.getItem('token'));

    function initAvatar() {

        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 这一部分很经常要 而且是固定的  所以写进去自己的api里面
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取个人信息失败!');
                }

                // 渲染头像
                renderAvatar(res.data);
            },

            //优化 把下面comolete 挂载到api里面去

            //complete : fucn 无论成功与否都会执行的一个函数,这里用来判断是否身份验证成功的行为,如果没有验证通过 则跳转到login页面
            // complete: function (res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制清空token
            //         localStorage.removeItem('token');
            //         // 提示没有通过验证 返回登录页面
            //         location.href = '/login.html';
            //     }
            // }
        })
    }


    // 判断是否有头像 有的话用头像 没有的话用文字头像
    function renderAvatar(data) {
        //渲染头像信息
        if (data.user_pic !== null) {
            // 显示原本头像
            $('.userinfo img').attr('src', data.user_pic).show();
            // 隐藏掉文字头像
            $('.avatar').hide();
        } else {
            // 相反
            $('.userinfo img').hide();
            var first = data.username[0].toUpperCase();
            $('.avatar').html(first).show();
        }

        // 渲染欢迎您字体
        if (data.nickname !== '') {

            $('.welcome').html('欢迎您' + data.nickname);
        } else {
            $('.welcome').html('欢迎您' + data.username);
        }
    }


    // 退出按钮绑定事件
    $('#btnLoginOut').on('click', function () {
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1 清除本地token
            localStorage.removeItem('token');
            //2 返回到登录的页面
            location.href = '/login.html';
            //3 关掉窗口
            layer.close(index);
        });
    })
})