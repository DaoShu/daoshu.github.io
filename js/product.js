$(function () {
    $('.product-list li').on('click', function (ev) {
        var dom = $(this);
        if (ev.target.nodeName == 'A') dom = $(ev.target).parent('li');
        dom.addClass('active').siblings().removeClass('active');
        var index = dom.attr('data-index');
        $(`#tabBody${index}`).addClass('show').removeClass('hide').siblings().addClass('hide').removeClass(
            'show');
    })
})