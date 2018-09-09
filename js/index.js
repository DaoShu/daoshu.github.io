$(function () {
    $('#navToggleBtn').click(function () {
        if (!$('#bs-navbar').hasClass('in')) {
            $('.navbar-header').addClass('navbar-show');
            $('#navToggleBtn .icon-bar').css('background', '#f3f3f3');
        } else {
            setTimeout(() => {
                $('.navbar-header').removeClass('navbar-show');
                $('#navToggleBtn .icon-bar').css('background', '#444');
            }, 400);
        }
    })

    $('.switch-tab').on('click', '.tab-item', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})