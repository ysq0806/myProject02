$(function () {
    var layer = layui.layer;
    var form = layui.form;
    //初始化个人信息
    initUserInfo();

    form.verify({
        nick: function (value, item) { //value：表单的值、item：表单的DOM对象

            if (value.length > 6) {
                return '用户名长度不能超过6位';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

    });

    // 给重置按钮绑定事件
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('.layui-form input')
            .not('hidden,[name=username]')//这2个不要清空 ,其实也无所谓 因为后面有重新初始化
            .val('');

        initUserInfo();
    })
    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msgg('提交修改失败！')
                }
                layer.msg('提交修改成功！');
                // $('#reset').click();
                initUserInfo();
            }
        })
    })

    function initUserInfo() {
        // 先获取服务的信息，有的信息给填到表单上面
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化个人信息失败！');
                }
                // 将获取到的信息填到表单中，利用layui方法
                form.val('formuserInfo', res.data);
            }
        })
    }
})