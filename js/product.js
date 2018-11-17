$(function () {
    $('.product-list li').on('click', function (ev) {
        var dom = $(this);
        if (ev.target.nodeName == 'A') dom = $(ev.target).parent('li');
        dom.addClass('active').siblings().removeClass('active');
        var index = dom.attr('data-index');
        $('#tabBody' + index).addClass('show').removeClass('hide').siblings().addClass('hide').removeClass(
            'show');
    })

    $('#tabBody4').on('click', 'li', function (ev) {
        var src = $(this).data('src');
        var model = $('#imgModel');

        model.fadeIn();
        var iframe = $('<iframe src="" frameborder="0" width="100%" height="100%"></iframe>');
        model.find('.video-box').append(iframe)
        iframe.attr('src', src)

        model.find('h4').html($(this).attr('title'))
        model.find('.glyphicon-remove').on('click', function () {
            model.fadeOut();
            iframe.remove();
        })
    })
})