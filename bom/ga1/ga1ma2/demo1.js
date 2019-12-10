var AppGa1Ma2Demo = (function() {
	
	function init() {
    
      var stage = new Konva.Stage({
        container: 'panel_canvas',
        width: $("#panel_canvas").width(), height: $("#panel_canvas").height()
      });
      var layer = new Konva.Layer();

      var circle = new Konva.Circle({
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
      var anim = new Konva.Animation(function(frame) {
        circle.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
      }, layer);

      anim.start(); //动画开始
    
	}
	
	return {
		init : init
	};

})();