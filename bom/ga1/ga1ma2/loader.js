var ga1ma2 = (function() {
	
	function init() {
		MAINUI.clearCanvas();
		
		var libs = CACHE.load('bom.module.lib2d');
		
		var readyFn = function() {
			AppGa1Ma2.init();
		}

		LIBRARY.loadRetry(libs, readyFn);
	}
	
	return {
		init : init
	};

})();