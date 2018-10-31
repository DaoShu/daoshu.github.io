console.log(BMap)
var map = new BMap.Map("map");    // 创建Map实例

var point = new BMap.Point(125.245034, 43.83664);
map.centerAndZoom(point, 20);  // 初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
// map.addControl(new BMap.MapTypeControl({
//     mapTypes: [
//         BMAP_NORMAL_MAP,
//         BMAP_HYBRID_MAP
//     ]
// }));
map.setCurrentCity("长春");          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

var marker = new BMap.Marker(point);  // 创建标注
map.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

    // var sContent = ''
    // var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
	// map.openInfoWindow(infoWindow,point); //开启信息窗口