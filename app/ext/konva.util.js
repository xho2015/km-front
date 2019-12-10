var KUTIL = (function() {

    function lineSquare(x, y, width, height, stroke){
        return new Konva.Line({
            points: [x,y,  x+width,y,  x+width,y+height,  x,y+height,  x,y  ],
            stroke: stroke===undefined ? 'green': stroke,strokeWidth: 2, lineJoin: 'round',dash: [15, 8]});
    }

    function groupNodesMoveTo(gFrom, gTo) {
        for (var n = gFrom.getChildren().length -1; n>=0; n--) {
            var shape = gFrom.getChildren()[n];
            shape.moveTo(gTo);
        }
    }


	return {
        lineSquare : lineSquare,
        groupNodesMoveTo:groupNodesMoveTo
	};

})();