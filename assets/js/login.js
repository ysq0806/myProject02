$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 分别给注册和登录盒子绑定事件
    $('#register').on('click', function () {
        $('#box-register').hide();
        $('#box-login').show();
    })

    $('#login').on('click', function () {
        $('#box-login').hide();
        $('#box-register').show();
    })


    // 表单验证 自定义密码
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    // 给表单提交绑定事件
    $('#form-register').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败');
                }
                layer.msg('注册成功');
                console.log(res);
                // 自动跳转到登录页面
                $('#register').click();
            }
        })
    })
    // 给表单提交绑定事件
    $('#form-login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                console.log(res);
                // token 要存储在本地 后面的页面请求都需要用到他
                localStorage.setItem('token', res.token)

                // 登录成功后自动跳转到index页面
                location.href = '/index.html'
            }
        })
    })
})