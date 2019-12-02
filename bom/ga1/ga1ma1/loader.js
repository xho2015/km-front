var ga1ma1 = (function() {
	
	function init() {
		$("#panel_canvas").empty();
		
		var libs = CACHE.load('bom.module.lib3d');
		
		var readyFn = function() {
			AppG1M1Demo.init();
		}

		LIBRARY.loadRetry(libs, readyFn);
		
	}
	
	return {
		init : init
	};

})();
