/**
 * NGO main panel user interface. ver6 houxuyong@hotmail.com
 */
var PANEL = (function(my) {
	my.name = 'NGO Panel GUI ver-1.0';

	var resizeEvents = [];
	
	//background
	my.bgcontainer = $('#background_screen');
	my.bgcanvas = $('<canvas>')
		.css({position : 'absolute',left : 0,top : 0,width : '100%',	height : '100%'})
		.attr({	id : 'backgound_canvas', width : my.bgcontainer.width(), height : my.bgcontainer.height()})
		.prependTo(my.bgcontainer);

	//background effects
	my.bgeffects = function() {
		// enable star field effect
		if (AppSettings.bganimate) {
			$(my.bgcontainer).starfield({framerate:AppSettings.framerate, speedX:2, starDensity:0.10,	mouseScale:0.01, background:'#000007',	seedMovement:true
			}, "backgound_canvas");
		};
	};

	//screen status
    my.screenStatus = {	isFull : false,	orientation : 0	};
    
    //full screen checker
    my.isFullscreen = function () {
		return document.fullscreenElement || document.msFullscreenElement
				|| document.mozFullScreenElement
				|| document.webkitFullscreenElement || false;
	};
	
	my.fullScreen = function () {
		var docElm = document.documentElement;
		if (docElm.requestFullscreen) {	docElm.requestFullscreen();
		} else if (docElm.msRequestFullscreen) {docElm = document.body; docElm.msRequestFullscreen();
		} else if (docElm.mozRequestFullScreen) {docElm.mozRequestFullScreen();
		} else if (docElm.webkitRequestFullScreen) {docElm.webkitRequestFullScreen();
		} else if (docElm.webkitEnterFullscreen) {docElm.webkitEnterFullscreen();}
	};

	my.exitFullScreen = function () {
		if (document.exitFullscreen) {document.exitFullscreen();
		} else if (document.msExitFullscreen) {document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {document.webkitCancelFullScreen();
		} else if (document.webkitExitFullScreen) {document.webkitExitFullScreen();	}
	};
    
    my.resize = function() { 
    	//check screen full status
		if (!my.isFullscreen()) {my.screenStatus.isFull = false;
		} else {my.screenStatus.isFull = true;}
			
		// match resolution matrix by current window dimension
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		backgroundResize(winWidth, winHeight);   	
	};
    
    function backgroundResize(winWidth, winHeight) {
		$('#background_screen').width(winWidth); 
		$('#background_screen').height(winHeight);
		$('#backgound_canvas').width(winWidth); 
		$('#backgound_canvas').height(winHeight);
		my.bgeffects();
	}

	function registeResize(resize) {
		resizeEvents.push(resize);
		console.log("resize Events registed");
	}

	/*the only sensor of window resize event*/	 
	function onWindowResize() {
		for (var i = 0; i < resizeEvents.length; i++) {
			var resize = resizeEvents[i];
			resize();
		}
	}
	
	/* the only sensor of browser orientation change*/	 
	function onOrientationChange() {
		if (window.orientation === 180 || window.orientation === 0) {
			PANEL.screenStatus.orientation = 1;
			alert('当前为竖屏，请切换为横屏以获得更好的显示效果！');
		}
		if (window.orientation === 90 || window.orientation === -90) {
			//try trigger fullscreen won't work for security reason
			//https://stackoverflow.com/questions/24878297/javascript-trigger-fullscreen
			PANEL.screenStatus.orientation = 0;
		}
	}

	/* will be invoked when this module loaded*/	 
	my.init = function() {
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", onOrientationChange, false);
		registeResize(my.resize);
		onWindowResize();
	}

	return my;

}(PANEL || {}));


/**
 * panel header sub-module
 */
PANEL.header = (function() {

}());


/**
 * panel property sub-module
 */
PANEL.property = (function() {
	var my = {};
	
	return my;
}());


/**
 * panel screen sub-module
 */
PANEL.screen = (function() {
	var my = {};
	
	return my;
}());


/**
 * This module holds main UI facilities
 */
var MAINUI = (function() {

	var menuItem = new AppCommon.Map();
	var courseItem = new AppCommon.Map();
	
	/*will be invoked when this module loaded*/	 
	function init() {
		$(".dropdown").click(
			function(){MAINUI.clearCanvas();});

		PANEL.init();
	}

	/*choice menu item from main UI */
	function choiceMenu(menuGradeId) {
		menuItem = CACHE.load('module.grade.'+menuGradeId);
		console.log(menuItem);
		$('#module_list').empty();
		$.each(menuItem, function(i, val){     
			$('#module_list').append('<li id=\'li_'+val.mid+'\'><a href="#" onclick="MAINUI.selectCourse(\''+val.mid+'\')">'+val.name+'</a></li>');
			console.log(val);
		});   
	}

	/*selected course by mid */
	function selectCourse(mid) {
		courseItem = CACHE.load('bom.module.'+mid);
		console.log(courseItem);
		var readyFn = function() {
			effectOfRun(mid);
			eval(mid+".init();");
		}
		LIBRARY.loadRetry(courseItem, readyFn);	
	}

	/**exhibate effect when chose a class */
	function effectOfRun(mid) {
	
	}

	/** clear main panel DIV and all its sub nodes. */
	function clearCanvas(){
		$("#panel_canvas").empty();
	}

	return {
		init : init,
		choiceMenu:choiceMenu,
		selectCourse:selectCourse,
		clearCanvas:clearCanvas
	};
})();


