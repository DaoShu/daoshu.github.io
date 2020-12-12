$(function () {
    resize();

    function resize() {
        if (location.pathname.indexOf('scheme.html') >= 0) {
            if ($(window).width() < 768) {
                $('.col-xs-12.col-sm-4').removeClass('box-hover');
            }
        }
    }

    $('.scheme-tab-list').on('click', 'li', function () {
        var dom = $(this);
        dom.addClass('active').siblings().removeClass('active');
        var body = dom.attr('data-body');
        var box = $('#' + body);
        if (body == 'technology') {
            $('#technology').html('')
            box.append(` <iframe width="100%"  src="./technology.html" frameborder="0"></iframe>`)

            setTimeout(function () {
                setIframeHeight();
            }, 30);
        }
        box.addClass('show').removeClass('hidden').siblings().addClass('hidden').removeClass(
            'show');


    })

    $(window).off('resize.scheme').on('resize.scheme', resize);



})



var pageIndex = 1;

function changePage(page) {
    var pageBox = $('.pagination');
    switch (page) {
        case 0:
            if (pageIndex === 1) return;
            if (pageIndex === 2) changePage(1)
            break;
        case 1:
            pageIndex = 1;
            pageBox.children().eq(1).addClass('active').siblings().removeClass('active');
            pageBox.children().eq(0).addClass('disabled').siblings().removeClass('disabled');
            $('#pageBody1').removeClass('hide').addClass('show')
            $('#pageBody2').removeClass('show').addClass('hide')
            window.scrollTo(0, 0)
            break;
        case 2:
            pageIndex = 2;
            pageBox.children().eq(2).addClass('active').siblings().removeClass('active');
            pageBox.children().eq(3).addClass('disabled').siblings().removeClass('disabled');
            $('#pageBody2').removeClass('hide').addClass('show')
            $('#pageBody1').removeClass('show').addClass('hide')
            window.scrollTo(0, 0)
            break;
        case 3:
            if (pageIndex === 2) return;
            if (pageIndex === 1) changePage(2)
            break;
        default:
    }
}

function setIframeHeight() {
    var ifm = document.querySelector("iframe");

    var subWeb = document.frames ? document.frames["iframeId"].document : ifm.contentDocument;

    if (ifm != null && subWeb != null) {
        ifm.style.height = 'auto';
        ifm.style.height = subWeb.body.offsetHeight + 'px';
    }
}