var ga4ma0 = (function() {
	
	function init() {
		MAINUI.clearCanvas();
		
		var libs = CACHE.load('bom.module.lib2d');
		
		var readyFn = function() {
			AppGa4Ma0.init();
		}

		LIBRARY.loadRetry(libs, readyFn);		
	}
	
	return {
		init : init
	};

})();
