$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2. 更换裁剪的图片
    $('#file').on('change', function (e) {
        console.log(e);
        var fileList = e.target.files;
        // console.log(fileList.length);
        if (fileList.length === 0) {
            layer.msg('请选择图片！')
        }
    })

    //给上传按钮绑定事件
    $('#btnUpload').on('click', function () {
        $('#file').click();
    })

    // 给确定按钮绑定事件  ajax请求更换头像
})