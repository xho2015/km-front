var ga4ma1 = (function() {
	
	function init() {
		MAINUI.clearCanvas();
		
		var libs = CACHE.load('bom.module.lib2d');
		
		var readyFn = function() {
			AppGa4Ma1.init();
		}

		LIBRARY.loadRetry(libs, readyFn);		
	}
	
	return {
		init : init
	};

})();
