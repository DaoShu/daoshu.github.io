$(function () {
    // 控制手机版本的时候，导航按钮的样式;
    appNavBtn()

    // 首页的js
    var url = window.location.href;
    if (url.indexOf('index') >= 0 || url.indexOf('html') < 0) {
        /* 产品的滑动 */
        slideSection();

        var bodyWidth = document.body.offsetWidth;
        $('.banner-box li').css('width', bodyWidth + 'px')
        // setTimeout(function () {
        // var img = $('.first-img-xs').length ? $('.first-img-xs') : $('.first-img-sm')
        // img[0].onload = function () {
        //     console.log(img);
        //     // banner 轮播 切换

        // };
        bannerSlider();
        // }
    }

    // 手机版的导航高度撑满屏幕
    appNavHeight()

    // 浏览器尺寸发送改变时
    resize()

    // 选项卡切换
    tabSwitch();

    // 联系方式的悬浮框
    contactBtn()

    // 返回顶部
    backTop();
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
        timer = setTimeout(function () {
            banner(i != $('.banner-box li').length - 1 ? i + 1 : 0);
        }, 10000)
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
            $('#navContainer').css('height', window.screen.height + 'px');
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

/* 联系方式的悬浮框 */
function contactBtn() {
    $('.contact-btn').on('click', function () {
        var box = $(this).closest('.contact');
        var _this = $(this);
        if (box.css('right').indexOf('-') < 0) {
            box.animate({
                'right': '-190px'
            }, 300, function () {
                _this.css('transform', ' rotateY(180deg)');
            })
        } else {
            box.animate({
                'right': '0px'
            }, 300, function () {
                _this.css('transform', ' rotateY(0deg)');
            })
        }
    })
}

/* 返回顶部 */
function backTop() {
    var dom = $('.back-top');
    $(window).on('scroll', function () {
        var scrollTo = $(window).scrollTop(),
            docHeight = $(document).height(),
            windowHeight = $(window).height(),
            scrollPercent = ((scrollTo / (docHeight - windowHeight)) * 100).toFixed(1);
        dom.css('display', scrollPercent > 20 ? 'block' : 'none');
    }).trigger('scroll')

    $('.back-top').on('click', function () {
        $('html,body').stop().animate({
            scrollTop: '0px'
        }, 600);
    });
}
