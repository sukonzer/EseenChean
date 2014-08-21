/**
 * Created with JetBrains WebStorm.
 * User: jVan
 * Date: 13-7-14
 * Time: 上午9:13
 * Description: 全局js
 */
$(function(){
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
	} 

	// 原生绑定方法:把keyup事件绑定到document中 
	/*function listenKey(){ 
		if(document.addEventListener){ 
			document.addEventListener("keyup",getKey,false); 
		}else if(document.attachEvent) { 
			document.attachEvent("onkeyup",getKey); 
		}else{ 
			document.onkeyup = getKey; 
		} 
	};*/
	//无缝滚动
	var MarqueeL=function(id){
		var container = document.getElementById(id),
		original = document.getElementById("original"),
		clone = document.getElementById("clone"),
		speed = arguments[1] || 10;
		clone.innerHTML=original.innerHTML;
		console.log(clone.offsetLeft)
		var rolling = function(){
		  if(container.scrollLeft == clone.offsetLeft){
			container.scrollLeft = 0;
		  }else{
			container.scrollLeft++;
		  }
		}
		timer1 = setInterval(rolling,speed);
		container.onmouseover = function(){clearInterval(timer1)};
	}
	var MarqueeR=function(id){
		var container = document.getElementById(id),
		original = document.getElementById("original"),
		clone = document.getElementById("clone"),
		speed = arguments[1] || 10;
		clone.innerHTML=original.innerHTML;
		var rolling = function(){
			if(container.scrollLeft == 0){
				console.log(clone.offsetLeft)
				container.scrollLeft = clone.offsetLeft;
			}else{
					container.scrollLeft--;
			}
		}
		timer2 = setInterval(rolling,speed);
		container.onmouseover = function(){clearInterval(timer2)};
	}
	var wh=$(window).height(),
		wd=$(window).width();
	
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
	})
	//=================================================
    // 秀我
    //=================================================
	$('#marquee').css({'width':$(window).width()});
	$('.mouse-event-box').css({'width':wd/6});
	$('.top-event,.bm-event').css({'height':(wh-$('#marquee').find('img').height())/2});
	$('#t-l-1,#b-l-1').on({
		'mouseover':function(){
			MarqueeR('marquee',1);
		},'mouseout':function(){
			clearInterval(timer2);
		}
	});
	$('#t-l-2,#b-l-2').on({
		'mouseover':function(){
			MarqueeR('marquee',5);
		},'mouseout':function(){
			clearInterval(timer2);
		}
	});
	$('#t-l-3,#b-l-3').on({
		'mouseover':function(){
			MarqueeR('marquee',10);
		},'mouseout':function(){
			clearInterval(timer2);
		}
	});
	$('#t-r-1,#b-r-1').on({
		'mouseover':function(){
			MarqueeL('marquee',1);
		},'mouseout':function(){
			clearInterval(timer1);
		}
	});
	$('#t-r-2,#b-r-2').on({
		'mouseover':function(){
			MarqueeL('marquee',5);
		},'mouseout':function(){
			clearInterval(timer1);
		}
	});
	$('#t-r-3,#b-r-3').on({
		'mouseover':function(){
			MarqueeL('marquee',10);
		},'mouseout':function(){
			clearInterval(timer1);
		}
	});
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
})