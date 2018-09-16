$(function () {
    // 控制手机版本的时候，导航按钮的样式;
    appNavBtn()

    // 首页的js
    if (window.location.href.indexOf('index') > 0) {
        /* 产品的滑动 */
        slideSection();
        var img = $('.first-img-xs').length ? $('.first-img-xs') : $('.first-img-sm')
        img.on('load', function () {
            // banner 轮播 切换
            setTimeout(() => {
                bannerSlider();
            }, 2000);
        })
    }

    // 手机版的导航高度撑满屏幕
    appNavHeight()

    // 浏览器尺寸发送改变时
    resize()

    // 选项卡切换
    tabSwitch();

})

function appNavBtn() {
    $('#navToggleBtn').click(function () {
        if (!$('#bs-navbar').hasClass('in')) {
            $('.navbar-header').addClass('navbar-show');
            $('#navToggleBtn .icon-bar').css('background', '#f3f3f3');
        } else {
            $('.navbar-header').removeClass('navbar-show');
            $('#navToggleBtn .icon-bar').css('background', '#444');
        }
    })
}

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

/* banner 轮播 */
function bannerSlider() {
    $('.banner-box li').css('width', document.body.offsetWidth + 'px');
    $('.banner-box').css('width', document.body.offsetWidth * $('.banner-box li').length + 'px');

    var timer = null;

    function banner(i) {
        clearInterval(timer)
        var l = i * -document.body.offsetWidth;
        $('.banner-box').css('transform', 'translateX(' + l + 'px)');
        $('.switch-btn span').eq(i).addClass('active').siblings().removeClass('active');
        timer = setTimeout(() => {
            banner(i != $('.banner-box li').length - 1 ? i + 1 : 0);
        }, 5000)
    }
    banner(0);
    $('.switch-btn span').on('click', function () {
        banner($(this).index());
    })
}

// 手机版的导航高度撑满屏幕
function appNavHeight() {
    $('#navToggleBtn').on('click', function () {
        var isShow = $('#navContainer').find('#bs-navbar').hasClass('in');
        if (isShow) {
            $('#navContainer').css('height', 0 + 'px');
        } else {
            $('#navContainer').css('height', document.body.offsetHeight + 'px');
        }
    })
}

// 浏览器尺寸发送改变时
function resize() {
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
}

/* 选项卡切换 */
function tabSwitch() {
    $('.tab-switch-btn').on('click', function () {
        $(this).add('active').siblings().removeClass('active');
    })
}