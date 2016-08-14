/**
 * Created by zeng on 2016-07-23.
 */
'use strict';

window.onload = function (){
    var oColor1 = document.querySelector('#color1');
    var oColor2 = document.querySelector('#color2');
    var oS1 = document.querySelector('#option1 p strong');
    var oS2 = document.querySelector('#option2 p strong');
    var oSpan = document.querySelector('#num');
    var oSmall = document.querySelector('#smallBox');
    var oPro = document.querySelector('#progress_bar');
    var oPro2 = document.querySelector('#progress_bar2');
    var oRange = document.querySelector('#range');
    var n = 0;

    oS1.style.color = oColor1.value;
    oS2.style.color = oColor2.value;

    //自动滚动
    var count = 0;
    setInterval(function (){
        count += 3;
        oPro2.style.left = -count % 164 + 'px';
        oPro.style.left = -count % 164 + 'px';
    },30);

    //拖动滚动
    oColor1.onchange = function (){
        oS1.innerHTML = oColor1.value.toUpperCase();
        oS1.style.color = oColor1.value;
        oPro.style.background = 'repeating-linear-gradient(-45deg,' + oColor1.value + ' 0%,' + oColor1.value + ' 4%,' + oColor2.value + ' 4%,' + oColor2.value + ' 8%)';
        oPro2.style.background = 'repeating-linear-gradient(-45deg,' + oColor1.value + ' 0%,' + oColor1.value + ' 4%,' + oColor2.value + ' 4%,' + oColor2.value + ' 8%)';
    };
    oColor2.onchange = function (){
        oS2.innerHTML = oColor2.value.toUpperCase();
        oS2.style.color = oColor2.value;
        oPro.style.background = 'repeating-linear-gradient(-45deg,' + oColor1.value + ' 0%,' + oColor1.value + ' 4%,' + oColor2.value + ' 4%,' + oColor2.value + ' 8%)';
        oPro2.style.background = 'repeating-linear-gradient(-45deg,' + oColor1.value + ' 0%,' + oColor1.value + ' 4%,' + oColor2.value + ' 4%,' + oColor2.value + ' 8%)';
    };
    oSmall.style.left = -oSmall.offsetWidth + 'px';
    oRange.onmousedown = function (){
        document.onmousemove = function (){
            n = oRange.value;
            if(n == 100){
                oSmall.style.left = 0;
            }else{
                oSmall.style.left = -oSmall.offsetWidth + oSmall.offsetWidth * n / 100 + 'px';
            }
            oSpan.innerHTML = n + '%';
        };
        document.onmouseup = function (){
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
};