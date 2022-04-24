
$(document).ready(function(){
	//------------ Click effect on Homepage ---------------//
	$(this).on("mousedown", function(e){
		console.log('effect')
		$("#mouse-effect-1").css("animation","mouse-effect-on 1s .15s forwards");
		$("#mouse-effect-2").css("animation","mouse-effect-on-2 1s forwards");
		$("#home-mouse-effect").css({"left":(e.pageX-90), "top":(e.pageY-90)});

		$("#mouse-effect-1, #mouse-effect-2").delay(1000).queue(function(next){
			$(this).css("animation","none");
			next();
		});
	});
	//------------ Click effect on Homepage ---------------//

	//------------ Navigation ---------------//
	var navigation = $("#vertical-navigation nav");
	var timeLiDelay = 100;
	$("#menu-icon").on("click", function(e){
		e.preventDefault();
		if($(navigation).hasClass("collapses")){
			$(navigation).removeClass("collapses");
			$(navigation).addClass("expand");
			var count = 1;
			$("#vertical-navigation li").each(function(){
				$(this).delay(timeLiDelay+(count*200)).queue(function(next){
					$(this).css({"opacity":"1", "transform":"translateY(0px)"});
					next();
				});
				count++;
			});
			count = 1;
			$(".social-bar a").each(function(){
				$(this).delay(timeLiDelay+(count*200)).queue(function(next){
					$(this).css({"opacity":"1", "margin-left":"0px"});
					next();
				});
				count++;
			});
		}else{
			$(navigation).addClass("collapses");
			$(navigation).removeClass("expand");
			$("#vertical-navigation li").css({"opacity":"0", "transform":"translateY(30px)"});
			$(".social-bar a").css({"opacity":"0", "margin-left":"-20px"});
		}
	});
	//------------ Navigation ---------------//






	//------------ Scroll Effect on Blogpage ---------------//
	var animateFinish = false;
	var timeOut;
	if($(window).width() > 768){
		$('#fullpage').fullpage({
			scrollingSpeed:1500,
			onLeave: function(index, nextIndex, direction){
				$("#blog-wrapper .blog-item:nth-child("+index+")").addClass("item-fade-out");
				clearTimeout(timeOut);
				timeOut = setTimeout(function(){
					animateFinish = true;
					$.fn.fullpage.moveTo(nextIndex);
				},1000);
				return animateFinish;
			},
			afterLoad: function(anchorLink, index){
				$("#blog-wrapper :not(.blog-item:nth-child("+(index)+"))").removeClass("item-fade-out");
				animateFinish = false;
			}
		});

		//============= PORTFOLIO PAGE ==============//
		animateFinish = false;
		//======= Count and add Total number of portfolio item =======//
		var totalPortfolioItem = $(".portfolio-item").length;

		$('#portfolio-fullpage').fullpage({
			scrollingSpeed:1500,
			onLeave: function(index, nextIndex, direction){
				$(".portfolio-item").addClass("portfolio-fade-out");
				clearTimeout(timeOut);
				timeOut = setTimeout(function(){
					animateFinish = true;
					$('#portfolio-fullpage').fullpage.moveTo(nextIndex);
				},1200);
				return animateFinish;
			},
			afterLoad: function(anchorLink, index){
				$("#status-bar #current-item").text(addZero(index));//Change the number on status bar
				$("#status-bar #before-bar").css("height", devidePercentage(index,totalPortfolioItem)+"%");
				$("#status-bar #after-bar").css("height", (75 - devidePercentage(index,totalPortfolioItem))+"%");
				$(".portfolio-item").removeClass("portfolio-fade-out");

				if(index === totalPortfolioItem){
					$("#status-bar #total-item").text("");
				}else{
					$("#status-bar #total-item").text(addZero(totalPortfolioItem));
				}
				animateFinish = false;
			}
		});
		//=====User can also navigate the fullpage by status bar =====//
		$("#before-bar").on("click", function(){
			$('#portfolio-fullpage').fullpage.moveSectionUp();
		});
		$("#after-bar").on("click", function(){
			$('#portfolio-fullpage').fullpage.moveSectionDown();
		});

	}//end if;

	//------------ Add 0 before the number if it's < 10 -----------//
	function addZero(number){
		return (number < 10 ? '0' : '') + number;
	}
	//------------ Calculate the percentage of current slider on status bar -----//
	function devidePercentage(n, total){
		return (75/total)*n;
	}



	//------------ Carousel Effects ---------------//
	// var prevImg = document.createElement("img");
	// prevImg.setAttribute("src", $("#carousel-client .slide-img img:last-child").attr("src"))
	// prevImg.setAttribute("class", "prev")
	// $("#carousel-client .slide-img").prepend(prevImg);

	$("#carousel-client .slide-img img:first-child").addClass("active");
	$("#carousel-client .slide-img img:first-child").next().addClass("next");
	$("#carousel-client .slide-img img:last-child").addClass("prev");

	$("#carousel-client").on("slide.bs.carousel", function(e){
		var $next = $(".slide-img .next")
		var $active = $(".slide-img .active");
		var $prev = $(".slide-img .prev");
		if(e.direction == "left"){
			//Add class next to next and active to current
			$next.attr("class", "active");
			if($next.next().length){
				$next.next().addClass("next");
			}else{
				$("#carousel-client .slide-img img:first-child").attr("class", "next");
			}
			//Change active class to prev
			$active.attr("class", "prev");
			//Remove prev class
			$prev.removeClass("prev");
		}else{
			$prev.attr("class", "active");
			if($prev.prev().length){
				$prev.prev().addClass("prev");
			}else{
				$("#carousel-client .slide-img img:last-child").attr("class", "prev");
			}
			//Change active class to next
			$active.attr("class", "next");
			//Remove prev class
			$next.removeClass("next");
		}
	});

	//------------ Carousel Effects ---------------//



	//============= PORTFOLIO DETAIL PAGE ==============//
	var portfolioFlag = false;
	$(".portfolio-item").on("click", function(){
		if(!portfolioFlag){
			$(this).find(".owl-prev .nav-number").text('1');
			$(this).removeClass("portfolio-closed").addClass("portfolio-clicked");
			$("#status-bar").css("opacity","0");
			$("#vertical-navigation").css("z-index","-1");
			$(this).find(".portfolio-detail").css("margin-left","-5.55rem");
			portfolioFlag = true;
		}
	});
	$('.portfolio-item .close-btn').on("click", function(){
		$(".portfolio-item").removeClass("portfolio-clicked").addClass("portfolio-closed");
		$(".portfolio-detail").css("margin-left","115%");
		setTimeout(function(){
			portfolioFlag = false;
			$("#status-bar").css("opacity","1");
			$("#vertical-navigation").css("z-index","100");
		},1500)
	})

	//This loop helps we put the close btn to the right place :
	var portfolios = document.getElementsByClassName("portfolio-item")
	for(var i = 0; i < portfolios.length; i++){
		var imgs = portfolios[i].getElementsByTagName('img');
		for(var j = 0; j < imgs.length; j++){
			var offsetLeft = imgs[j].offsetLeft;
			var clientWidth = imgs[j].clientWidth;
			portfolios[i].getElementsByClassName("close-btn")[j].style = "margin-left:"+(clientWidth + offsetLeft + 10)+"px";
		}
	}

	//Change number when carousel changed :
	$('.portfolio-item').each(function(index){
		$(this).find(".owl-next .nav-number").text($(this).find(".owl-item").length)
	});
	owl.on('changed.owl.carousel', function(event) {
			$(".owl-prev .nav-number").text(event.item.index+1)
	});
	//============= PORTFOLIO DETAIL PAGE ==============//

});
