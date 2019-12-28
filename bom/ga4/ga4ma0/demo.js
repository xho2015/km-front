var AppGa4Ma0 = (function() {
	
	function init() {

/*
        ART.push("sleep","1000");
        ART.push("alertMsg","1");
        ART.push("sleep","2000");
        ART.push("alertMsg","2");
        ART.push("sleep","4000");
        ART.push("alertMsg","4");
        //ART.CODE.push({'f':alertMsg,'p': "2"});
 */       
        ART.push("nr","'r1', 40, 'green'");
        ART.push("mv","'r1', 0.1, 120, 150");
        ART.push("sleep","1000");
        ART.push("mv","'r1', 2, 420, 150");
        ART.push("sleep","1000");
        ART.push("mv","'r1', 2, 420, 450");
        ART.push("sleep","1000");
        ART.push("mv","'r1', 2, 120, 450");
        ART.push("sleep","1000");
        ART.push("mv","'r1', 2, 120, 150");
        ART.loop();
    }
    
	
	return {
		init : init
	};

})();