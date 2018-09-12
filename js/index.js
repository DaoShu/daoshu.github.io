$(function () {
    $('#navToggleBtn').click(function () {
        if (!$('#bs-navbar').hasClass('in')) {
            $('.navbar-header').addClass('navbar-show');
            $('#navToggleBtn .icon-bar').css('background', '#f3f3f3');
        } else {
            $('.navbar-header').removeClass('navbar-show');
            $('#navToggleBtn .icon-bar').css('background', '#444');
        }
    })

    $('.switch-tab').on('click', '.tab-item', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

    /* 产品的滑动 */
    slideSection();



    $(window).on('resize', function () {
        var box = $('.product-slider-box');
        if (document.body.offsetWidth < 768) {
            box.css('width', 'auto');
            return
        };
        var container = $('#productBox');
        var item = box.find('.product-box-item');
        var productWidht = +((container.width() / 3).toFixed(2));
        box.css('width', productWidht * item.length + 'px');
        item.css('width', productWidht);
    })


    // 手机版的导航高度撑满屏幕
    $('#navToggleBtn').on('click', function () {
        var isShow = $('#navContainer').find('#bs-navbar').hasClass('in');
        console.log($('#navContainer').find('#bs-navbar'));
        console.log(isShow);
        if (isShow) {
            $('#navContainer').css('height', 0 + 'px');
        } else {
            $('#navContainer').css('height', document.body.offsetHeight + 'px');
        }
    })

    $('.banner-box li').css('width', document.body.offsetWidth + 'px');
    $('.banner-box').css('width', document.body.offsetWidth * 2 + 'px');

    var timer = null;

    function banner(i) {
        clearInterval(timer)
        var l = i ? -document.body.offsetWidth : 0;
        $('.banner-box').css('transform', 'translateX(' + l + 'px)');
        $('.switch-btn span').eq(i).addClass('active').siblings().removeClass('active');
        timer = setTimeout(() => {
            banner(!i ? 1 : 0);
        }, 5000)
    }
    banner(0);
    $('.switch-btn span').on('click', function () {
        banner($(this).index());
        // $(this).index
        // console.log($(this).index())
        // $(this).addClass('active').siblings().removeClass('active');
    })
})

/* 产品的滑动 */
function slideSection() {
    var box = $('.product-slider-box');
    if (document.body.offsetWidth < 768) {
        box.css('width', 'auto');
        return
    };
    var container = $('#productBox');
    var item = box.find('.product-box-item');
    var productWidht = +((container.width() / 3).toFixed(2));
    box.css('width', productWidht * item.length + 'px');
    item.css('width', productWidht);

    var time = +new Date();
    $('#arrowsLeft').on('click', function () {
        if ($(this).hasClass('disabled')) return;
        var t = +new Date();
        if (t - time < 400) return;
        slider('left', productWidht);
        time = t;
    })

    $('#arrowsRight').on('click', function () {
        if ($(this).hasClass('disabled')) return;
        var t = +new Date();
        if (t - time < 400) return;
        slider('right', productWidht)
        time = t;
    })

    function slider(type, width) {
        var box = $('.product-slider-box');
        var left = parseFloat(box.css('left'));
        var l;

        if (type == 'left') {
            l = parseFloat((left + width).toFixed(2));
        } else {
            l = parseFloat((left - width).toFixed(2));
        }

        if (l == 0) {
            $('#arrowsLeft').addClass('disabled');
        } else {
            $('#arrowsLeft').removeClass('disabled');
        }

        if (l <= -productWidht * (item.length - 3)) {
            $('#arrowsRight').addClass('disabled');
        } else {
            $('#arrowsRight').removeClass('disabled');
        }
        $('.product-slider-box').css('left', l + 'px')
    }
}