/**
* Created with JetBrains WebStorm.
* User: jVan
* Date: 13-7-14
* Time: 上午9:13
* Description: 全局js
*/
;(function(){
var $bd = $('body'),
	$doc = $(document),
	winWd = $doc.width(),
	winHt = $doc.height(),
	scrollTimer = null,//滚屏定时器
	cutoverTimer = null,//全屏大图切换定时器
	isScroll = true,//滚屏默认开启
	fullIndex = 0;//全屏大图索引

//=================================================
// home菜单
//=================================================
$doc.on('click','.main-menu li span',function(){
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
//=================================================
// show case
//=================================================
//无缝滚动
var marquee = $('#marquee'),//滚到层对象
	marqTop = marquee.parent().offset().top,
	marqHt = marquee.height(),
	original = $("#original"),//原始图对象
	clone = $("#clone");//复制对象
marquee.css('width',winWd +'px');

//如果原始图的总宽度小于窗体宽度，不滚屏
if(original.find('img').length*264 < winWd){
	isScroll = false;
}
//绑定滚屏
function bindScroll(isScroll){
	if(isScroll){
		$doc.on('mousemove','html',decision);
		$doc.on('mouseenter','#marquee',function(){
			scrollTimer && clearInterval(scrollTimer);
			$doc.off('mousemove','html',decision);
		});
		$doc.on('mouseleave','#marquee',function(){
			$doc.on('mousemove','html',decision);
		});
	}
}
bindScroll(isScroll);
$doc.on('resize',function(){
	//重写参数值
	marqTop = marquee[0].parentNode.offsetTop;
	winWd = document.documentElement.clientWidth;
	winHt = document.documentElement.clientHeight;
	marquee[0].style.width = winWd +'px';
});
//查看产品图
$doc.on('click','.fullwidth-box a',function(){ //小样图层
	var $this = $(this);
	idx = $this.index();
	if($('#maskBox').length<=0){
		$bd.append('<div class="maskbox" id="maskBox"></div>');
	}
	if($('#comp').length<=0){
		$bd.append($.tmpl.render($('#compTmpl').html(),data[idx]));
	}
	$('#comp').addClass('s-visible');
	$('.brand-box .detail').hide();
	$doc.off('mouseenter','#marquee');
	$doc.off('mouseleave','#marquee');
});
//关闭小样图层
$doc.on('click','#comp>.action>span',function(){
	$('#comp').remove();
	$('#maskBox').remove();
	$('.brand-box .detail').show();
	bindScroll(isScroll);
});
//打开全屏图层
$doc.on('click','#comp>.action>i',function(){
	$('#comp>.action>span').trigger('click');
	if($('#fullScreen').length<=0){
		$('body').append($.tmpl.render($('#fullTmpl').html(),data[idx]));
	}
	$doc.on('keyup',getKey); //绑定keyup到document
});
//关闭全屏图层
$doc.on('click','#fullScreen>.full-close>a',function(){
	$('#fullScreen').remove();
	$('.brand-box .detail').show();
	$doc.off('keyup',getKey); //去除绑定在document上的keyup
	cutoverTimer && clearTimeout(cutoverTimer);
});
//左右切换图片
$doc.on('click','#next',function(){ //下一张
	cutoverTimer && clearTimeout(cutoverTimer);
	cutoverTimer = setTimeout(function(){
		fullIndex++;
		cutover(fullIndex);	
	},1000);
});
$doc.on('click','#prev',function(){ //上一张
	cutoverTimer && clearTimeout(cutoverTimer);
	cutoverTimer = setTimeout(function(){
		fullIndex--;
		cutover(fullIndex);
	},1000);
});
//向左滚
function MarqueeL(speed){
	speed = speed || 10;
	clone[0].innerHTML=original[0].innerHTML;
	var rolling = function(){
	  if(marquee[0].scrollLeft == clone[0].offsetLeft){
		marquee[0].scrollLeft = 0;
	  }else{
		marquee[0].scrollLeft++;
	  }
	}
	scrollTimer && clearInterval(scrollTimer);
	scrollTimer = setInterval(rolling,speed);
};
//向右滚
function MarqueeR(speed){
	speed = speed || 10;
	clone[0].innerHTML=original[0].innerHTML;
	var rolling = function(){
		if(marquee[0].scrollLeft == 0){
			marquee[0].scrollLeft = clone[0].offsetLeft;
		}else{
			marquee[0].scrollLeft--;
		}
	}
	scrollTimer && clearInterval(scrollTimer);
	scrollTimer = setInterval(rolling,speed);
};
//滚屏handler
function decision(e){
	var clientX = e.pageX || e.clientX,
		clientY = e.pageY || e.clientY,
		smallWd = Math.floor(winWd/6),//六等分
		topBlk = clientY>0 && clientY<marqTop,
		bomBlk = clientY>marqTop+marqHt && clientY<winHt;
	if(clientX>0 && clientX<smallWd && topBlk){
		MarqueeR(1);
	}else if(clientX>smallWd && clientX<smallWd*2 && topBlk){
		MarqueeR(5);
	}else if(clientX>smallWd*2 && clientX<smallWd*3 && topBlk){
		MarqueeR(10);
	}else if(clientX>smallWd*3 && clientX<smallWd*4 && topBlk){
		MarqueeL(10);
	}else if(clientX>smallWd*4 && clientX<smallWd*5 && topBlk){
		MarqueeL(5);
	}else if(clientX>smallWd*5 && clientX<smallWd*6 && topBlk){
		MarqueeL(1);
	}else if(clientX>0 && clientX<smallWd && bomBlk){
		MarqueeR(1);
	}else if(clientX>smallWd && clientX<smallWd*2 && bomBlk){
		MarqueeR(5);
	}else if(clientX>smallWd*2 && clientX<smallWd*3 && bomBlk){
		MarqueeR(10);
	}else if(clientX>smallWd*3 && clientX<smallWd*4 && bomBlk){
		MarqueeL(10);
	}else if(clientX>smallWd*4 && clientX<smallWd*5 && bomBlk){
		MarqueeL(5);
	}else if(clientX>smallWd*5 && clientX<smallWd*6 && bomBlk){
		MarqueeL(1);
	}
};
//键盘事件
function getKey(e){ 
	e = e || window.event; 
	var keycode = e.which || e.keyCode; 
	if(keycode === 37){ //如果按下方向左键
		cutoverTimer && clearTimeout(cutoverTimer);
		cutoverTimer = setTimeout(function(){
			if(fullIndex>0){
				fullIndex--;
				cutover(fullIndex);
			}
		},1000);
		
	}
	if(keycode === 39){ //如果按下方向右键
		cutoverTimer && clearTimeout(cutoverTimer);
		cutoverTimer = setTimeout(function(){
			if(fullIndex<data[idx].full.length-1){
				fullIndex++;
				cutover(fullIndex);
			}
		},1000);
	}
	if(keycode === 27){//按ESC时关闭全屏图
		$('.full-close>a').trigger('click');
	}
};
//全屏大图切换函数
function cutover(n){
	$('.full-pic img').attr({'src':data[idx].full[n]});
	$('#pageNum').find('i').text(n+1);
	if(n === data[idx].full.length-1){
		$('#next').css('visibility','hidden');
	}else{
		$('#next').css('visibility','visible');
	}
	if(n === 0){
		$('#prev').css('visibility','hidden');
	}else{
		$('#prev').css('visibility','visible');
	}
};
})();
