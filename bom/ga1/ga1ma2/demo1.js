var AppG1M2Demo = (function() {
	
	function init() {
    /*
        var stage = new Kinetic.Stage({
            container: 'panel_canvas',
            width: 578,
            height: 400
          });
     
          var layer = new Kinetic.Layer();
     
          var redLine = new Kinetic.Line({
            points: [73, 70, 340, 23, 450, 60, 500, 20],
            stroke: 'red',
            strokeWidth: 15,
            lineCap: 'round',
            lineJoin: 'round'
          });
     
          // dashed line
          var greenLine = new Kinetic.Line({
            points: [73, 70, 340, 23, 450, 60, 500, 20],
            stroke: 'green',
            strokeWidth: 2,
            lineJoin: 'round',
  
            dashArray: [33, 10]
          });
     
          // complex dashed and dotted line
          var blueLine = new Kinetic.Line({
            points: [73, 70, 340, 23, 450, 60, 500, 20],
            stroke: 'blue',
            strokeWidth: 10,
            lineCap: 'round',
            lineJoin: 'round',
   
            dashArray: [29, 20, 0.001, 20]
          });
     

          redLine.move(0, 5);
          greenLine.move(0, 55);
          blueLine.move(0, 105);
     
          layer.add(redLine);
          layer.add(greenLine);
          layer.add(blueLine);
          stage.add(layer);
        stage.draw();
*/

      var stage = new Kinetic.Stage({
        container: 'panel_canvas',
        width: 578, height: 200
      });
      var layer = new Kinetic.Layer();

      var circle = new Kinetic.Circle({
        x: stage.width()/2,
        y: stage.height()/2,
        sides: 6,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      });

      layer.add(circle);
      stage.add(layer);

      var amplitude = 150;
      var period = 2000;
      var centerX = stage.width()/2;

      //动画帧定义方法
      var anim = new Kinetic.Animation(function(frame) {
        circle.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
      }, layer);

      anim.start(); //动画开始
    
	}
	
	return {
		init : init
	};

})();