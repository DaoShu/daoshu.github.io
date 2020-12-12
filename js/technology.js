$(function () {
    var list = [
        {
            name: '校直机的检测工件及关键组成部分',
            desc: '校直机在工作的进程中需要将工件放在自动校直机工作台上的定位支承位置，并且按下自动启动按钮之后，校直机即进入自动校直循环进程：先由气缸履行直线运动动作带动两边反转前进(若工件采用外圆定位则气缸履行直线运动动作带动两边驱动冲突轮下降)，夹紧并定位工件丈量基准',
            date: '2019-09',
            day: '12',
            fileName: 'technology-details-1',
        }, {
            name: '细长轴校直机加工效率得到提升',
            desc: '采用校直平整工艺可以一次完成传统上需要借助横切机组、平整机组才能完成的高强钢精整加工。且6mm以下产品的加工速度可由传统平整工艺的 100-150m/min提高至200-300m/min。',
            date: '2019-06',
            day: '22',
            fileName: 'technology-details-2',
        }, {
            name: '数控液压校直机如何运行',
            desc: '不知道大家对于数控液压校直机有多少了解，本文将主要为大家介绍一下关于该设备的主要系统构成。从其的应用情况来看，我们目前主要是使用该设备来完成铜丝等线材的拉拔和校直。数控液压校直机的电气传动部分主要包括牵伸电机、收线电机以及排线电机等。',
            date: '2019-02',
            day: '25',
            fileName: 'technology-details-3',
        }, {
            name: '如何校直钢管校直机及一些操作补充',
            desc: '【一、管材校直机应用中的问题及齿轮硬度要求】校直机中的管道校直机是一种常见的校直机。 因此，这种校直机的研究将在下面继续，因为这也是它的基本要求。 因此，充分理解这一目的是必要和不可避免的。',
            date: '2018-11',
            day: '03',
            fileName: 'technology-details-4',
        }, {
            name: '精密校直机进行调整要注意什么',
            desc: '在使用校直机时，应该注意许多相关的问题，其中辊子的位置相对于校直机的运动方向成一至角度，两个或三个辊是主动产生压力，由马达带在相同的方向上旋转，并且在另一侧上的几个小辊被驱动的辊子压力，校直机通过旋转的圆棒或管道的摩擦力旋转，实现辊对制品的所需压缩校直，并且可以分别向前或向后调节小辊。',
            date: '2018-07',
            day: '15',
            fileName: 'technology-details-5',
        }, {
            name: '校直机用于校直钢校直可以怎么做',
            desc: '在许多材料的加工中，都会使用到校直机这类设备，通过弯曲、扭转、波形、校直等完成校直钢校直过程中校直机最常见的缺陷，在实际生产中，主要采取以下相应措施来解决，波浪曲线分为两种类型，钢型材的腰部波浪和腿部波浪，主要的原因是工作轧辊的直径相邻校直过于不同。',
            date: '2018-03',
            day: '18',
            fileName: 'technology-details-6',
        },
    ]

    var listDom = '';
    list.forEach(function (d) {
        listDom += `
            <div class="clearfix col-xs-12 col-sm-6">
                <a href="./technology-details/${d.fileName}.html">
                    <div class="col-xs-3 text-center">
                        <p>${d.day}</p>
                        <p>${d.date}</p>
                    </div>
                    <div class="col-xs-9 pull-right text-content">
                        <p>${d.name}</p>
                        <p class="text-indent">
                        ${d.desc}
                        </p>
                    </div>
                </a>
            </div>
        `
    })
    console.log(listDom)
    $('#list-container').append($(listDom))
    parent.window.setIframeHeight();
})