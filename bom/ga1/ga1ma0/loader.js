var ga1ma0 = (function() {
	
	function init() {
		$("#panel_canvas").empty();
		
		var libs = CACHE.load('bom.module.lib2d');
		
		var readyFn = function() {
			AppGa1Ma0Demo.init();
		}

		LIBRARY.loadRetry(libs, readyFn);		
	}
	
	return {
		init : init
	};

})();
