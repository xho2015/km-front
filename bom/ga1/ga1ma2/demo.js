var AppGa1Ma2 = (function() {
	
	function init() {
    
		var cwidth = $("#panel_canvas").width();
        var cheight = $("#panel_canvas").height();

        var gTop = 140;
        var gLeft = 120;
        var gWidth = 400;
        var gHeight = 300;

        var blockTop = 100;
        var blockSize = 20;
		
		var state = 1;
		
        var strokeWidth = 2;
		var onePlace6 = 0;
		var onePlace7 = 0;
        var tenPlaceCount = 0;
 
        var duration = 0.6;
		var N7max = 7;
		var decrease6 = 5;

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
        var groupOne6 = new Konva.Group({x: gLeft+blockSize*3,  y: gTop+blockSize*4,  rotation: 0  });
        var groupOne7 = new Konva.Group({x: gLeft+blockSize*3,  y: gTop+blockSize*9,  rotation: 0  });
        gLeft = 160;
        var groupTen = new Konva.Group({x: gLeft+blockSize,  y: gTop+blockSize*4,  rotation: 0  });
        layer.add(groupTen);
        layer.add(groupOne6);
		layer.add(groupOne7);

		var plus = new Konva.Text({x: gLeft+700,y: gTop+90, 
			text: '+',  fontSize: 60, fontFamily: 'Calibri', fill: '#ffffff'});
			plus.visible(false);
		layer.add(plus);

        stage.add(layer);

        function OnePlacefireNext() {

            if (state == 1) {
                var rect = new Konva.Rect({ x: 12 * blockSize, y: 0,  width: blockSize,  height: blockSize,
                    fill: '#ffffff',  stroke: 'orange', strokeWidth: strokeWidth, visible : false, draggable:false
                });       
                groupOne6.add(rect);
				onePlace6++;
				state = (onePlace6 == 6 ? 2 : 1); 
                OnePlacefadeIn(rect, onePlace6*(blockSize+strokeWidth), 0 ); 
            } else if (state == 2) {
				plus.visible(true);
				state = 3;
				OnePlacefadeIn(plus, gLeft+440, gTop+110); 	
			} else if (state == 3) {
				var rect = new Konva.Rect({ x: 12 * blockSize, y: 0,  width: blockSize,  height: blockSize,
                    fill: '#ffffff',  stroke: 'orange', strokeWidth: strokeWidth, visible : false, draggable:false
                });       
                groupOne7.add(rect);
				onePlace7++;
				state = (onePlace7 == N7max ? 4 : 3); 
                OnePlacefadeIn(rect, onePlace7*(blockSize+strokeWidth), 0 ); 
			} else if (state == 4){
				AppCommon.sleep(
					(function() {state = 5; OnePlacefireNext();}), 
					2000);	  
            } else if (state == 5) {
				if (decrease6 < 3) {
					TenPlacefadeIn(groupOne7, gLeft+30, gTop+100);
					return;
				}

				PlusOpfadeIn1();
				  
			}
		}

        function TenPlacefadeIn(shape, posX, posY) {
			
            new Konva.Tween({
                node: shape, duration: duration, x: posX,  y: posY,
                rotation: 0, radius: blockSize / 2,pacity: 0.8, easing: Konva.Easings.EaseIn,
                onFinish: function() {
					plus.text('');
					gTenDigit.text(1);
					gOneDigit.text(3);
                },
                fill: "#ffffff"
            }).play();
		}

		function PlusOpfadeIn2() {
			var rect = new Konva.Rect({ x: groupOne6.x() + 240, y: groupOne6.y(),  width: blockSize,  height: blockSize,
				fill: '#ffffff',  stroke: 'orange', strokeWidth: strokeWidth, draggable:false
			});
			layer.add(rect);
			new Konva.Tween({
                node: rect, duration: duration, x: groupOne6.x() + 240,  y: groupOne7.y(),
                rotation: 0, radius: blockSize / 2,pacity: 0.8, easing: Konva.Easings.EaseIn,
                onFinish: function() {
					rect.visible(false);

					N7max++;
					decrease6--;
					state=3;
					OnePlacefireNext();    
                },
                fill: "#ffffff"
            }).play();
		}

		function PlusOpfadeIn1() {

			var node = groupOne6.getChildren()[decrease6];
			
			new Konva.Tween({
                node: node, duration: duration, x: 240,  y: 0,
                rotation: 0, radius: blockSize / 2,pacity: 0.8, easing: Konva.Easings.EaseIn,
                onFinish: function() {
					node.remove(); 
					PlusOpfadeIn2();   
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
                    OnePlacefireNext();   
                },
                fill: "#ffffff"
            }).play();
        } 

        // fire first action
        OnePlacefireNext()
    
	}
	
	return {
		init : init
	};

})();