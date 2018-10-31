$(function () {

    $('.sk-container .col-xs-12 img').on('click', function (ev) {
        var $img = $('<img></img>');
        $img.addClass('img-responsive center-block');
        $img.attr('src', ev.target.src);
        $('#imgModel').append($img);
        $('#imgModel').fadeIn(100);
        $('.img-model-bg').one('click', function (e) {
            $img.remove();
            $('#imgModel').fadeOut(100);
        })
    })


})