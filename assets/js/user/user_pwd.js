$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 验证规则,新密码不能跟原来密码相同/两次输入的密码不一致
    form.verify({
        diff: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能跟原来密码相同！';
            }
        },

        same: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致！';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    //监听form提交发起 ajax发起修改密码请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
            }
        })
    })

})