var AppGa2Ma0Demo = (function() {
	
	function init() {
        var mvar = 9;
        //var ret = eval("mvar == 0");

        eval("var myvar = "+mvar+";")

        var ret = eval("myvar > 1");
        alert(ret);
    }
    
	
	return {
		init : init
	};

})();