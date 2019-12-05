var AppGa1Ma0Demo1 = (function() {
	
	function init() {

    var width = $("#panel_canvas").width();
    var height = $("#panel_canvas").height();

    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

    function getRandomColor() {
      return colors[Math.round(Math.random() * 5)];
    }

    function tango(layer) {
      for (var n = 0; n < layer.getChildren().length; n++) {
        var color = getRandomColor();
        var shape = layer.getChildren()[n];
        var stage = shape.getStage();
        var radius = Math.random() * 100 + 20;

        new Konva.Tween({
          node: shape,
          duration: 1,
          x: Math.random() * stage.width(),
          y: Math.random() * stage.height(),
          rotation: Math.random() * 360,
          radius: radius,
          opacity: (radius - 20) / 100,
          easing: Konva.Easings.EaseInOut,
          fill: color
        }).play();
      }
    }
    var stage = new Konva.Stage({
      container: 'panel_canvas',
      width: width,
      height: height
    });

    var layer = new Konva.Layer();

    for (var n = 0; n < 10; n++) {
      var radius = Math.random() * 100 + 20;
      var color = getRandomColor();
      var shape = new Konva.RegularPolygon({
        x: Math.random() * stage.width(),
        y: Math.random() * stage.height(),
        sides: Math.ceil(Math.random() * 5 + 3),
        radius: radius,
        fill: color,
        opacity: (radius - 20) / 100,
        draggable: true
      });

      layer.add(shape);
    }

    stage.add(layer);

    document.getElementById('panel_canvas').addEventListener(
      'click',
      function() {
        tango(layer);
      },
      false
    );
	}
	
	return {
		init : init
	};

})();