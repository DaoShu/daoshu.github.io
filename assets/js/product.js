$(function () {
    var videoList = [
        { name: '视频【半轴校直】', videoSrc: '../assets/videos/banzhoujiaozhi.mp4', picSrc: '../assets/img/videos/banzhoujiaozhi.png' },
        { name: '视频【薄壁管校直】', videoSrc: '../assets/videos/baobiguanjiaozhi.mp4', picSrc: '../assets/img/videos/baobiguanjiaozhi.png' },
        { name: '视频【泵轴校直】', videoSrc: '../assets/videos/bengzhoujiaozhi.mp4', picSrc: '../assets/img/videos/bengzhoujiaozhi.png' },
        { name: '视频【齿轮轴校直】', videoSrc: '../assets/videos/chilunzhoujiaozhi.mp4', picSrc: '../assets/img/videos/chilunzhoujiaozhi.png' },
        { name: '视频【大型管材校直】', videoSrc: '../assets/videos/daxingguancaijiaozhi.mp4', picSrc: '../assets/img/videos/daxingguancaijiaozhi.png' },
        { name: '视频【阀芯校直】', videoSrc: '../assets/videos/faxinjiaozhi.mp4', picSrc: '../assets/img/videos/faxinjiaozhi.png' },
        { name: '视频【精密轴类校直】', videoSrc: '../assets/videos/jingmizhouleijiaozhi.mp4', picSrc: '../assets/img/videos/jingmizhouleijiaozhi.png' },
        { name: '视频【丝杆自动校直】', videoSrc: '../assets/videos/siganzidongjiaozhi.mp4', picSrc: '../assets/img/videos/siganzidongjiaozhi.png' },
        { name: '视频【凸轮轴校直】', videoSrc: '../assets/videos/tulunzhoujiaozhi.mp4', picSrc: '../assets/img/videos/tulunzhoujiaozhi.png' },
        { name: '视频【新能源汽车电机轴校直】', videoSrc: '../assets/videos/qichedianjijiaozhi.mp4', picSrc: '../assets/img/videos/qichedianjijiaozhi.png' },
        { name: '视频【转向齿条校直】', videoSrc: '../assets/videos/zhuanxiangchilunjiaozhi.mp4', picSrc: '../assets/img/videos/zhuanxiangchilunjiaozhi.png' },
        { name: '视频【装配式凸轮轴校直】', videoSrc: '../assets/videos/zhuangpeishichilunzhoujiaozhi.mp4', picSrc: '../assets/img/videos/zhuangpeishichilunzhoujiaozhi.png' },
        { name: '视频【钻头校直】', videoSrc: '../assets/videos/zuantoujiaozhi.mp4', picSrc: '../assets/img/videos/zuantoujiaozhi.png' },
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
                <img src="${d.picSrc}" alt="${d.name}">
                <p>${d.name}</p>
            </li>
        `
    })

    box.append(liList);
}