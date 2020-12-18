$(function () {
    var list = [
        '../assets/img/patents/1.jpg',
        '../assets/img/patents/2.jpg',
        '../assets/img/patents/3.jpg',
        '../assets/img/patents/4.jpg',
        '../assets/img/patents/5.jpg',
        '../assets/img/patents/6.jpg',
        '../assets/img/patents/7.jpg',
        '../assets/img/patents/9.jpg',
        '../assets/img/patents/8.jpg',
        '../assets/img/patents/10.jpg',
        '../assets/img/patents/11.jpg',
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