/**
* Created with JetBrains WebStorm.
* User: jVan
* Date: 13-7-14
* Time: 上午9:13
* Description: 全局js
*/
//取元素
var G = function(){
	return document.getElementById(arguments[0]);
}
//事件委托 
var EventUitl = {
	getEvent:function(event){
        return event || window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){//阻止默认行为
        if(event.preventDefault){
        	event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){//阻止冒泡
        if(event.stopPropagation){
        	event.stopPropagation();
        }else{
        	event.cancelBubble = true;
        }
    },
	addHandler:function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		}else{
			element["on" + type] = handler;
		}
	},
	removeHandler:function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		}else{
			element["on" + type] = null;
		}
	}
};
//键盘事件
function getKey(e){ 
	e = e || window.event; 
	var keycode = e.which ? e.which : e.keyCode; 
	if(keycode == 37){ //如果按下方向左键 
		if(i>1){
			i=--i;
			cutover(i);
		}
	}
	if(keycode == 39){ //如果按下方向右键 
		if(i<data[idx].fPicLen){
			i=++i;
			cutover(i);
		}
	}
	if(keycode == 27){
		fullCloseBtn.trigger('click');
	}
};
//=================================================
// 菜单
//=================================================
$('.main-menu li').find('span').on('click',function(){
	var $this=$(this);
	var $li=$this.next().find('li');
	if(!$this.hasClass('extend')){
		$this.addClass('extend');
		var random = Math.random()*1000;
		var ceil = Math.ceil(random);
		$.each($li,function(i){
			ceil--;
			$li.eq(i).css({'zIndex': ceil});
		});
		var n = 0;
		var amimate = function($obj){
			$obj.stop().animate({
				marginTop: 4
			},800,function(){
				n++;
				if($obj.next().size()){
					amimate($obj.next());
				}
			})
		}
		amimate($li.eq(0));
	}else{
		$li.stop().animate({marginTop:-30},1000,function(){
			$this.removeClass('extend');
		})
	}
});
//无缝滚动
var Timer1 = null,
	Timer2 = null,
	winHt = document.documentElement.clientHeight,//窗口高度
	marquee = G('marquee'),//滚到层对象
	marqTop = marquee.parentNode.offsetTop,
	marqHt = marquee.offsetHeight,
	original = document.getElementById("original"),
	clone = document.getElementById("clone");
var MarqueeL = function(){
	var flag = false;
	if(flag){return;}
	speed = arguments[0] || 10;
	clone.innerHTML=original.innerHTML;
	var rolling = function(){
	  if(marquee.scrollLeft == clone.offsetLeft){
		marquee.scrollLeft = 0;
	  }else{
		marquee.scrollLeft++;
	  }
	}
	Timer1 = setInterval(rolling,speed);
	flag = true;
};
var MarqueeR = function(){
	var flag = false;
	if(flag){return;}
	speed = arguments[0] || 10;
	clone.innerHTML=original.innerHTML;
	var rolling = function(){
		if(marquee.scrollLeft == 0){
			marquee.scrollLeft = clone.offsetLeft;
		}else{
			marquee.scrollLeft--;
		}
	}
	Timer2 = setInterval(rolling,speed);
	flag = true;
};

EventUitl.addHandler(document.documentElement,'mousemove',decision);
function decision(e){
	var e = EventUitl.getEvent(e),
		clientX = e.pageX || e.clientX,
		clientY = e.pageY || e.clientY;
	var winWd = document.body.clientWidth;
	var smallWd = Math.floor(winWd/6);//六等分
	var topBlk = clientY>0 && clientY<marqTop;
	var bomBlk = clientY>marqTop+marqHt && clientY<winHt;
	if(clientY>marqTop && clientY<marqTop+marqHt){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		EventUitl.removeHandler(document.documentElement,'mousemove',decision);
	}else if(clientX>0 && clientX<smallWd && topBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeR(1);
	}else if(clientX>smallWd && clientX<smallWd*2 && topBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeR(5);
	}else if(clientX>smallWd*2 && clientX<smallWd*3 && topBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeR(10);
	}else if(clientX>smallWd*3 && clientX<smallWd*4 && topBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeL(10);
	}else if(clientX>smallWd*4 && clientX<smallWd*5 && topBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeL(5);
	}else if(clientX>smallWd*5 && clientX<smallWd*6 && topBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeL(1);
	}else if(clientX>0 && clientX<smallWd && bomBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeR(1);
	}else if(clientX>smallWd && clientX<smallWd*2 && bomBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeR(5);
	}else if(clientX>smallWd*2 && clientX<smallWd*3 && bomBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeR(10);
	}else if(clientX>smallWd*3 && clientX<smallWd*4 && bomBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeL(10);
	}else if(clientX>smallWd*4 && clientX<smallWd*5 && bomBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeL(5);
	}else if(clientX>smallWd*5 && clientX<smallWd*6 && bomBlk){
		(Timer1 && clearInterval(Timer1)) || (Timer2 && clearInterval(Timer2));
		MarqueeL(1);
	}
};
EventUitl.addHandler(marquee,'mouseout',function(){
	EventUitl.addHandler(document.documentElement,'mousemove',decision);
});

//=================================================
// 秀我
//=================================================
$('#marquee').css({'width':$(window).width()});
//查看产品图
var fullPic = $('#fullScreen .full-pic').find('img'); //大图对象
var i=1; //大图尾号
$('.fullwidth-box').find('a').live('click',function(){ //小样图层
	var $this = $(this);
	idx = $this.index();
	$('.comp-pic').find('img').attr('src',data[idx].comp);
	$('#customer').text(data[idx].customer);
	$('#agency').text(data[idx].agency);
	$('#creativeDirector').text(data[idx].creativeDirector);
	$('#artDirector').text(data[idx].artDirector);
	$('#workTime').text(data[idx].workTime);
	$('#maskBox').show();
	$('#comp').addClass('s-visible');
	$('.brand-box .detail').hide();
});
//关闭小样图层
$('#comp .action').find('span').on('click',function(){
	$('#comp').removeClass('s-visible');
	$('#maskBox').hide();
	$('.brand-box .detail').show();
});
//打开全屏图层
$('#comp .action').find('i').on('click',function(){
	$('#comp').removeClass('s-visible');
	$('#maskBox').hide();
	$('#fullScreen').show();
	fullPic.attr('src',data[idx].full.f1); //调出第一张大图
	if(data[idx].fPicLen == 1){ //判断是否是单张图片
		$('#fullScreen').find('.action').hide();
	}else{
		$('#fullScreen').find('.action').show();
	}
	$('#prev').css('visibility','hidden'); //默认隐藏上翻按钮
	$('#next').css('visibility','visible'); //默认重置下翻按钮
	$('#pageNum').find('i').text('1'); //输出第一页值
	$('#pageNum').find('em').text(data[idx].fPicLen); //显示页面最大值
	$(document).bind('keyup',getKey); //绑定keyup到document
});
//关闭全屏图层
var fullCloseBtn = $('#fullScreen .full-close').find('a');
fullCloseBtn.on('click',function(){
	$('#fullScreen').hide();
	$('.brand-box .detail').show();
	$(document).unbind('keyup',getKey); //去除绑定在document上的keyup
});
var cutover = function(n){ //切换函数
	var swiNm = 'f'+n;
	fullPic.attr({'src':data[idx].full[swiNm]});
	$('#pageNum').find('i').text(n);
	if(n==data[idx].fPicLen){
		$('#next').css('visibility','hidden');
	}else{
		$('#next').css('visibility','visible');
	}
	if(n==1){
		$('#prev').css('visibility','hidden');
	}else{
		$('#prev').css('visibility','visible');
	}
}
//左右切换图片
$('#next').on('click',function(){ //下一张
	i=++i;
	cutover(i);
});
$('#prev').on('click',function(){ //上一张
	i=--i;
	cutover(i);
});