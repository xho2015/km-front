var AppGa4Ma0 = (function() {
	
	function init() {
        ART.init();
        ART.code("rect","'r1', 40, '#ffffff'");
        ART.code("move","'r1', 0.1, 120, 150");
        ART.code("sleep","1000");
        ART.code("move","'r1', 1, 420, 150");
        ART.code("sleep","1000");
        ART.code("shine", "1500, 'red', 'r1'");
        ART.code("sleep", "1500"); 
        ART.code("move","'r1', 1, 420, 450");
        ART.code("sleep","1000");
        ART.code("move","'r1', 1, 120, 450");
        ART.code("sleep","1000");
        ART.code("move","'r1', 1, 120, 150");
        ART.code("sleep","2000");
        

        ART.code("text", "'t11', '0'");
        ART.code("text", "'t12', '.'");
        ART.code("text", "'t13', '9'");
        ART.code("text", "'t14', '9'");  
        ART.code("align", "200, 200, 't11','t12','t13','t14'");
        ART.code("sleep", "1000");

        ART.code("va", "'shineCnt1', 6");
        ART.label("LS1");
        ART.code("shine", "500, 'red', 't11', 't14'");
        ART.code("sleep", "500");   
        ART.code("vdec", "'shineCnt1', 1");
        ART.code("dump", "'shineCnt1'");
        //ART.code("nzjp", "'shineCnt1', 'LS1'")
        ART.code("ifgo", "'shineCnt1', 'shineCnt1 > 0', 'LS1'")

        ART.code("log", "'done'")
        ART.run();
    }
    
	
	return {
		init : init
	};

})();