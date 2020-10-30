$(function() {

    initArtcateList()

    function initArtcateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                var str = template('tpl-artcate', res)
                $('tbody').html(str)
            }
        })
    }


    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })

    var indexAdd = null
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtcateList()
                layui.layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function(res) {
                layui.form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtcateList()
                layui.layer.close(indexEdit)
            }
        })
    })

    $('tbody').on('click', '#btn-delete', function() {
        var id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    initArtcateList()
                    layer.close(index);
                }

            })

        });
    })

})