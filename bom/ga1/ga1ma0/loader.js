var ga1ma0 = (function() {
	
	function init() {
		MAINUI.clearCanvas();
		
		var libs = CACHE.load('bom.module.lib2d');
		
		var readyFn = function() {
			if (MAINUI.isSmallScreen()) {
				AppGa1Ma0Small.init();
			} else {
				AppGa1Ma0.init();
			}			
		}

		LIBRARY.loadRetry(libs, readyFn);		
	}
	
	return {
		init : init
	};

})();
