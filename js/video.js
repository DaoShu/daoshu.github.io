/* 渲染视频列表 */
function renderVideoList(box, list) {

    $('.video-list').on('click', 'li', function () {
        var src = $(this).data('src');
        var model = $('#imgModel');
        model.fadeIn();
        var video = `
            <video class="video-js vjs-big-play-centered" controls data-setup="{}" width="100%" height="100%" preload="auto">
                <source src="${src}"></source>
            </video>
        `
        model.find('.video-box').append(video)

        model.find('h4').html($(this).attr('title'))
        model.find('.glyphicon-remove').on('click', function () {
            model.fadeOut();
            model.find('.video-box').html('');
        })
    })

    var liList = '';

    videoList.forEach(d => {
        liList += `
                <li class="p-item" data-src="${d.videoSrc}" title="${d.name}">
                    <img src="${d.picSrc}" alt=">${d.name}">
                    <p>${d.name}</p>
                </li>
            `
    })

    $('.video-list').append(liList);
}