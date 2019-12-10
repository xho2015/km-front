var AppGa1Ma1 = (function() {

    function init() {
        var cwidth = $("#panel_canvas").width();
        var cheight = $("#panel_canvas").height();

        var gTop = 140;
        var gLeft = 120;
        var gWidth = 400;
        var gHeight = 300;

        var blockTop = 100;
        var blockSize = 20;
        var messageTop = 400;
        var strokeWidth = 2;
        var onePlaceCount = 0;
        var tenPlaceCount = 0;
        var maxCount = 0;
        var duration = 0.6;
        var NumMAX = 45;

        var stage = new Konva.Stage({container: 'panel_canvas',
            width: cwidth, height: cheight });
        var layer = new Konva.Layer();

        //Ten's place
        var gradeTen = KUTIL.lineSquare(gLeft, gTop, gWidth, gHeight);
            layer.add(gradeTen);
        var gTenText = new Konva.Text({x: gLeft+gWidth/2,y: gTop - 60, 
            text: '十位',  fontSize: 20, fontFamily: 'Calibri', fill: '#ffffff'});
        layer.add(gTenText);
        var gTenDigit = new Konva.Text({x: gLeft+gWidth/2,y: gTop+gHeight+50, 
            text: '0',  fontSize: 60, fontFamily: 'Calibri', fill: '#ffffff'});
        layer.add(gTenDigit);

        //One's place
        gLeft += gWidth + 50;
        var gradeOne = KUTIL.lineSquare(gLeft, gTop, gWidth, gHeight);
            layer.add(gradeOne);
        var gOneText = new Konva.Text({x: gLeft+gWidth/2,y: gTop - 60, 
            text: '个位',  fontSize: 20, fontFamily: 'Calibri', fill: '#ffffff'});
        layer.add(gOneText);
        var gOneDigit = new Konva.Text({x: gLeft+gWidth/2,y: gTop+gHeight+50, 
            text: '0',  fontSize: 60, fontFamily: 'Calibri', fill: '#ffffff'});
        layer.add(gOneDigit);

        //groups
        var groupOne = new Konva.Group({x: gLeft+blockSize*3,  y: gTop+blockSize*4,  rotation: 0  });
        gLeft = 160;
        var groupTen = new Konva.Group({x: gLeft+blockSize,  y: gTop+blockSize*4,  rotation: 0  });
        layer.add(groupTen);
        layer.add(groupOne);

        stage.add(layer);

        function OnePlacefireNext() {
            if (maxCount > NumMAX)
                return;

            if (onePlaceCount < 10) {
                var rect = new Konva.Rect({ x: 12 * blockSize, y: 0,  width: blockSize,  height: blockSize,
                    fill: '#ffffff',  stroke: 'orange', strokeWidth: strokeWidth, visible : false, draggable:false
                });       
                groupOne.add(rect);
                maxCount++;
                onePlaceCount++;
                OnePlacefadeIn(rect, onePlaceCount*(blockSize+strokeWidth), 0 ); 
            } else {
                var cloneTen = groupTen.clone();
                layer.add(cloneTen);
                cloneTen.y(cloneTen.y() + (tenPlaceCount+1) * blockSize);
                
                TenPlacefadeIn(groupOne, cloneTen.x() - 40, cloneTen.y(), cloneTen);           
            }
        }

        function showDigits() {
            gTenDigit.text(tenPlaceCount);
            gOneDigit.text(onePlaceCount+'');
        }

        function TenPlacefadeIn(shape, posX, posY, cloneTen) {
            new Konva.Tween({
                node: shape, duration: duration, x: posX,  y: posY,
                rotation: 0, radius: blockSize / 2,pacity: 0.8, easing: Konva.Easings.EaseIn,
                onFinish: function() {
                    KUTIL.groupNodesMoveTo(groupOne, cloneTen);

                    groupOne.x(gLeft+gWidth+blockSize*3);
                    groupOne.y(gTop+blockSize*3);

                    tenPlaceCount++;
                    onePlaceCount=0;
                    showDigits(); 
                    
                    OnePlacefireNext();
                },
                fill: "#ffffff"
            }).play();
        }

        function OnePlacefadeIn(shape, posX, posY) { 
            shape.visible(true); 
            new Konva.Tween({
                node: shape, duration: duration, x: posX,  y: posY,
                rotation: 0, radius: blockSize / 2,pacity: 0.8, easing: Konva.Easings.EaseIn,
                onFinish: function() {
                    gOneDigit.text(onePlaceCount);
                    OnePlacefireNext();   
                },
                fill: "#ffffff"
            }).play();
        } 

        // fire first action
        OnePlacefireNext()

    } //-end init

    return {
		init : init
	};

})();