var AppGa1Ma0Small = (function() {
	
	function init() {
        

        var cwidth = $("#panel_canvas").width();
        var cheight = $("#panel_canvas").height();

        var blockTop = 200;
        var blockSize = 34;
        var messageTop = 480;
        var strokeWidth = 4;
        var count = 0;
        var maxCount = 9;
        var duration = 1;

        var stage = new Konva.Stage({
        container: 'panel_canvas',
        width: cwidth,
        height: cheight
        });

        var layer = new Konva.Layer();

        var simpleText = new Konva.Text({
            x: stage.width() / 2,
            y: messageTop,
            text: '',
            fontSize: 60,
            fontFamily: 'Calibri',
            fill: '#ffffff'
          });
    
        // to align text in the middle of the screen, we can set the
        // shape offset to the center of the text shape after instantiating it
        simpleText.offsetX(simpleText.width() / 2);

        var gLeft = 140;
        var gTop = 120;
        var gWidth = 470;
        var gHeight = 300;

        var gradeOne = KUTIL.lineSquare(gLeft, gTop, gWidth, gHeight);
        layer.add(gradeOne);

        layer.add(simpleText);

        stage.add(layer);

        var xoff = 170;

        function fireNext() {
            var rect1 = new Konva.Rect({
                x: cwidth - 100,
                y: blockTop,
                width: blockSize,
                height: blockSize,
                fill: '#ffffff',
                stroke: 'orange',
                strokeWidth: strokeWidth,
                visible : false,
                draggable:true
            });
          
           
            layer.add(rect1);

            xoff += (blockSize + strokeWidth);

            if (count < maxCount) {
                fadeIn(rect1, xoff, blockTop ); 
            }
        }

        function fadeIn(shape, posX, posY) { 
            shape.visible(true); 
            new Konva.Tween({
                node: shape,
                duration: duration,
                x: posX,
                y: posY,
                rotation: 0,
                radius: blockSize / 2,
                opacity: 0.8,
                easing: Konva.Easings.EaseIn,
                onFinish: function() {
                    count +=1;
                    showMessage(count);
                    fireNext();
                },
                fill: "#ffffff"
            }).play();
        } 

        function showMessage(count) {
           simpleText.text(count);
        }

        fireNext();
    }
    
	
	return {
		init : init
	};

})();