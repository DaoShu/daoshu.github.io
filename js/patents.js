$(function () {
    var list = [
        './img/patents/1.jpg',
        './img/patents/2.jpg',
        './img/patents/3.jpg',
        './img/patents/4.jpg',
        './img/patents/5.jpg',
        './img/patents/6.jpg',
        './img/patents/7.jpg',
        './img/patents/9.jpg',
        './img/patents/8.jpg',
        './img/patents/10.jpg',
        './img/patents/11.jpg',
    ]
    var listDom = '';
    list.forEach(function (d) {
        listDom += `
            <div class="col-xs-12 col-sm-6 col-md-3">
                <img class="img-responsive center-block" src="${d}" alt="">
            </div>
        `
    })
    $('#picBox').append($(listDom))

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