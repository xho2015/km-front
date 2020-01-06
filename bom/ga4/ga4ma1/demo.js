var AppGa4Ma1 = (function() {
	
	function init() {
        ART.init();
        
        ART.code("text", "'t11', '0.6'");
        ART.code("align", "200, 120, 't11'");
        ART.code("sleep", "1000");

        ART.code("text", "'t12', '+'");
        ART.code("align", "300, 120, 't12'");
        ART.code("sleep", "1000");

        ART.code("text", "'t13', '9.6'"); 
        ART.code("align", "380, 120, 't13'");
        ART.code("sleep", "1000");

        ART.code("text", "'t14', '+'");
        ART.code("align", "500, 120, 't14'");
        ART.code("sleep", "1000");

        ART.code("text", "'t15', '99.6'");
        ART.code("align", "570, 120, 't15'");
        ART.code("sleep", "1000");

        ART.code("text", "'t20', '='");
        ART.code("align", "150, 200, 't20'");
        ART.code("sleep", "1000"); 
        
        ART.code("text", "'t210', '('");
        ART.code("text", "'t211', '1'");
        ART.code("text", "'t212', ' - '");
        ART.code("text", "'t213', '0.4'");
        ART.code("text", "'t214', ')'");
        ART.code("align", "200, 200, 't210','t211','t212','t213','t214'");
        ART.code("sleep", "1000");
        ART.code("shine", "500, 'red', 't11','t211','t212','t213'");
        ART.code("sleep", "200"); 

        ART.code("text", "'t22', '+'");
        ART.code("align", "440, 200, 't22'");
        ART.code("sleep", "1000");

        ART.code("text", "'t250', '('");
        ART.code("text", "'t251', '10'");
        ART.code("text", "'t252', ' - '");
        ART.code("text", "'t253', '0.4'");
        ART.code("text", "'t254', ')'");
        ART.code("align", "480, 200, 't250','t251','t252','t253','t254'");
        ART.code("sleep", "1000");
        ART.code("shine", "500, 'red','t13', 't251','t252','t253'");
        ART.code("sleep", "200"); 

        ART.code("text", "'t26', '+'");
        ART.code("align", "760, 200, 't26'");
        ART.code("sleep", "1000");
        
        ART.code("text", "'t270', '('");
        ART.code("text", "'t271', '100'");
        ART.code("text", "'t272', ' - '");
        ART.code("text", "'t273', '0.4'");
        ART.code("text", "'t274', ')'");
        ART.code("align", "800, 200, 't270', 't271', 't272', 't273', 't274'");
        ART.code("sleep", "1000");
        ART.code("shine", "500, 'red', 't271', 't272', 't273','t15'");
        ART.code("sleep", "200");

        ART.code("text", "'t30', '='");
        ART.code("align", "150, 280, 't30'");
        ART.code("sleep", "1000"); 

        ART.code("clone", "'t211', 't211c'"); 
        ART.code("shine", "800, 'red', 't211c'");
        ART.code("sleep", "500"); 
        ART.code("to", "'t211c', 1, 200, 280");

        ART.code("clone", "'t251', 't251c'"); 
        ART.code("shine", "800, 'red', 't251c'");
        ART.code("sleep", "500"); 
        ART.code("to", "'t251c', 1, 200, 280");
        ART.code("changeText", "'t251c', '11'");
        ART.code("destroy", "'t211c'"); 
        
        ART.code("clone", "'t271', 't271c'"); 
        ART.code("shine", "800, 'red', 't271c'");
        ART.code("sleep", "500"); 
        ART.code("to", "'t271c', 1, 200, 280");
        ART.code("changeText", "'t271c', '111'");
        ART.code("destroy", "'t251c'"); 

        ART.code("sleep", "1000"); 
        ART.code("text", "'t31', ' - '");
        ART.code("align", "290, 280, 't31'");
        ART.code("sleep", "1000"); 

        ART.code("clone", "'t213', 't213c'"); 
        ART.code("shine", "800, 'red', 't213c'");
        ART.code("sleep", "500"); 
        ART.code("to", "'t213c', '0.4', 350, 280");

        ART.code("clone", "'t253', 't253c'"); 
        ART.code("shine", "800, 'red', 't253c'");
        ART.code("sleep", "500"); 
        ART.code("to", "'t253c', 1, 350, 280");
        ART.code("changeText", "'t253c', '0.4 x 2'");
        ART.code("destroy", "'t213c'"); 

        ART.code("clone", "'t273', 't273c'"); 
        ART.code("shine", "800, 'red', 't273c'");
        ART.code("sleep", "500"); 
        ART.code("to", "'t273c', 1, 350, 280");
        ART.code("changeText", "'t273c', '0.4 x 3'");
        ART.code("destroy", "'t253c'"); 

        ART.code("text", "'t40', '='");
        ART.code("align", "150, 360, 't40'");
        ART.code("sleep", "1000"); 

        ART.code("text", "'t41', '111 - 1.2'");
        ART.code("align", "200, 360, 't41'");
        ART.code("sleep", "1000"); 

        ART.code("text", "'t50', '='");
        ART.code("align", "150, 440, 't50'");
        ART.code("sleep", "1000");
        ART.code("text", "'t51', '109.8'");
        ART.code("align", "200, 440, 't51'");
        ART.code("sleep", "1000"); 

        ART.code("log", "'done'")
        ART.run();
    }
    
	
	return {
		init : init
	};

})();