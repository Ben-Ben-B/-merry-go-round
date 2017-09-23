//水平缓慢函数的封装，案例筋斗云
function animate_1(element,target){
    clearInterval(element.timer);
    element.timer=setInterval(function(){
        var current=element.offsetLeft;
        var step=(target-current)/10;
        step=target>=current?Math.ceil(step):Math.floor(step);
        current+=step;
        element.style.left=current+"px";
        if(target==current){
            clearInterval(element.timer);
            element.style.left=target+"px";
        }
    },20)
}//window.getComputedStyle的兼容
function getStyle(element,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(element,null)[attr];
    }else{
        return element.currentStyle[attr];
    }
}
//可以获取任何属性的函数的封装，案例手风琴
function animate_2(element,target,attr){
    clearInterval(element.timer);
    element.timer=setInterval(function(){
        var current=parseInt(getStyle(element,attr));
        var step=(target-current)/10;
        step=target>=current?Math.ceil(step):Math.floor(step);
        current+=step;
        element.style[attr]=current+"px";
        if(target==current){
            clearInterval(element.timer);
        }
    },20)
}
//可以同时修改多个函数的封装，
function animate_3(element,obj){
    clearInterval(element.timer);
    element.timer=setInterval(function(){
        var flag=true;
        for(var attr in obj){
            var target=obj[attr];
            var current=parseInt(getStyle(element,attr));
            var step=(target-current)/10;
            step=target>=current?Math.ceil(step):Math.floor(step);
            current+=step;
            element.style[attr]=current+"px";
            if(target!=current){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timer);
        }
    },20)
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
                target=Math.floor(target*=100);
                current=Math.floor(current*=100);
                // 设置步长
                var step=(target-current)/10;
                // 让步长保证每一次都是以一个单位移动,因为浏览器会自动四舍五入
                step=target>=current?Math.ceil(step):Math.floor(step);
                //重新设置
                current+=step;
                element.style[attr]=current/100+"px";//因为之前加大了100倍，所以要缩小100倍
            }else if(attr=="zIndex"){
                //层级不用动画
                element.style[attr]=obj[attr];
                target==current//设这个是为了下面停止判断的条件，不然永远是flase恒成立
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
            callback&&callback()//短路运算，可以让他返回一个变量或函数
        }
    },20)

//function animate(element,obj,callback){
//    //每次开始前清除上一次的计时器
//    clearInterval(element.timer)
//    element.timer=setInterval(function(){
//        var flag=false;
//        //遍历对象，取得里面所有的属性和值
//        for(var attr in obj){
//            //先设置一个目标值
//            var target=obj[attr];
//            if(attr=="opacity"){
//                //设置当前值
//                var current=parseInt(getStyle(element.attr));
//                //因为计算机是没有小数点的运算，所以先加大100倍向下取整再运算
//                target=Math.floor(target*100);
//                current=Math.floor(current*100);
//                //设置步长
//                var step=(target-current)/10;
//                //确保步长每次都是以一个单位运算
//                step=target>=current?Math.ceil(step):Math.floor(step);
//                current+=step;
//                element.style[attr]=current/100+"px";
//            }else if(attr=="zIndex"){
//                element.style[attr]=abi[attr];
//                var target=current//设这个是方便下面的判断
//            }else{
//                var current=parseInt(getStyle(element,attr));
//                var step=(target-current)/10;
//                step=target>=current?Math.ceil(step):Math.floor(step);
//                current+=step;
//                element.style[attr]=current+"px";
//            }
//            if(target!=current){
//                flag=false;
//            }
//        }
//        if(flag){
//            clearInterval(element.timer);
//            callback&&callback();
//        }
//    },20)
}