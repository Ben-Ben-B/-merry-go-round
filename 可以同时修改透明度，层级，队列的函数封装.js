//兼容
function getStyle(element,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(element,null)[attr];
    }else{
        return element.currentStyle[attr];
    }
}
//封装函数
function animate_4(element,obj,callback){
    //每次开始前都清除上一次的
    clearInterval(element.timer);
    element.timer=setInterval(function(){
        var flag=true;
        //遍历对象的每一个健，键代表的是属性
        for(var attr in obj){
            //先设一个目标值
            var target=obj[attr];
            //有透明度的写法
            if(attr=="opacity"){
                //透明度是有小数点的
                var current=parseFloat(getStyle(element,attr));
                //计算机是没有小数点的采用的是二进制的写法，所以要乘以100，在向下取整再比较
                target=Math.floor(target*100);
                current=Math.floor(current*100);
                // 设置步长
                var step=(target-current)/10;
                // 让步长保证每一次都是以一个单位移动,因为浏览器会自动四舍五入
                step=target>=current?Math.ceil(step):Math.floor(step);
                //重新设置
                current+=step;
                element.style[attr]=current/100;//因为之前加大了100倍，所以要缩小100倍
            }else if(attr=="zIndex"){
                //层级不用动画
                element.style[attr]=target;
               var target=current//设这个是为了下面停止判断的条件，不然永远是flase恒成立
            }else{
                //因为有单位所以要减去
                var current=parseInt(getStyle(element,attr));
                //设置步长
                var step=(target-current)/10;
                //让步长保证每一次都是以一个单位移动,因为浏览器会自动四舍五入
                step=target>=current?Math.ceil(step):Math.floor(step);
                //重新设置
                current+=step;
                element.style[attr]=current+"px";
            }
            //判断停止，假设全部属性都运行完就成立，反之有一个都不成立
            if(target!=current){
                flag=false;//不用加return,让他继续运行，直到运行完
            }
        }
        if(flag){
            clearInterval(element.timer);
            callback&&callback()//短路法则，可以让他返回一个变量或函数
        }
    },20)
}