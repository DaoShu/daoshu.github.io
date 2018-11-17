$(function () {
    $('.tab-list').on('click','li', function () {
        var dom = $(this);
        dom.addClass('active').siblings().removeClass('active');
        var body = dom.attr('data-body');
        $('#' + body).addClass('show').removeClass('hide').siblings().addClass('hide').removeClass(
            'show');
    })

    $('.video-list').on('click', 'li', function () {
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