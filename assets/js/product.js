$(function () {
    var videoList = [
        { name: '视频【半轴校直】', videoSrc: '../assets/videos/半轴校直.mp4', picSrc: '../assets/img/videos/半轴校直.png' },
        { name: '视频【薄壁管校直】', videoSrc: '../assets/videos/薄壁管校直.mp4', picSrc: '../assets/img/videos/薄壁管校直.png' },
        { name: '视频【泵轴校直】', videoSrc: '../assets/videos/泵轴校直.mp4', picSrc: '../assets/img/videos/泵轴校直.png' },
        { name: '视频【齿轮轴校直】', videoSrc: '../assets/videos/齿轮轴校直.mp4', picSrc: '../assets/img/videos/齿轮轴校直.png' },
        { name: '视频【大型管材校直】', videoSrc: '../assets/videos/大型管材校直.mp4', picSrc: '../assets/img/videos/大型管材校直.png' },
        { name: '视频【阀芯校直】', videoSrc: '../assets/videos/阀芯校直.mp4', picSrc: '../assets/img/videos/阀芯校直.png' },
        { name: '视频【精密轴类校直】', videoSrc: '../assets/videos/精密轴类校直.mp4', picSrc: '../assets/img/videos/精密轴类校直.png' },
        { name: '视频【丝杆自动校直】', videoSrc: '../assets/videos/丝杆自动校直.mp4', picSrc: '../assets/img/videos/丝杆自动校直.png' },
        { name: '视频【凸轮轴校直】', videoSrc: '../assets/videos/凸轮轴校直视频.mp4', picSrc: '../assets/img/videos/凸轮轴校直.png' },
        { name: '视频【新能源汽车电机轴校直】', videoSrc: '../assets/videos/新能源汽车电机轴校直.mp4', picSrc: '../assets/img/videos/新能源汽车电机轴校直.png' },
        { name: '视频【转向齿条校直】', videoSrc: '../assets/videos/转向齿条校直视频.mp4', picSrc: '../assets/img/videos/转向齿条校直.png' },
        { name: '视频【装配式凸轮轴校直】', videoSrc: '../assets/videos/装配式凸轮轴校直.mp4', picSrc: '../assets/img/videos/装配式凸轮轴校直.png' },
        { name: '视频【钻头校直】', videoSrc: '../assets/videos/钻头校直.mp4', picSrc: '../assets/img/videos/钻头校直.png' },
    ]

    renderVideoList($('#tabBody4 ul'), videoList, 'col-sm-4')
    renderVideoList($('#xsTabBody4 ul'), videoList, 'col-xs-12')

    $('.tab-list').on('click', 'li', function () {
        var dom = $(this);
        dom.addClass('active').siblings().removeClass('active');
        var body = dom.attr('data-body');
        $('#' + body).addClass('show').removeClass('hide').siblings().addClass('hide').removeClass(
            'show');
    })
    if (window.location.hash) {
        $(window.location.hash).click();
        window.scrollTo(0, 0)
    }

    $('.video-list').on('click', 'li', function () {
        var src = $(this).data('src');
        var model = $('#imgModel');
        model.fadeIn();
        var video = `
            <video class="video-js vjs-big-play-centered" controls data-setup="{}"  width="100%" height="100%"  preload="auto">
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
})

function renderVideoList(box, videoList, className) {
    var liList = '';

    videoList.forEach(d => {
        liList += `
            <li class="p-item ${className || ''}" data-src="${d.videoSrc}" title="${d.name}">
                <img src="${d.picSrc}" alt=">${d.name}">
                <p>${d.name}</p>
            </li>
        `
    })

    box.append(liList);
}