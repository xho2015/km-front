var ART = (function() {

//runtime support inforsturcture
var PC = 0;
var CODE = [];
var STACK = new AppCommon.Map();

//2d support facilities
var cwidth = $("#panel_canvas").width();
var cheight = $("#panel_canvas").height();
var stage = new Konva.Stage({
    container: 'panel_canvas',
    width: cwidth, height: cheight
    });
var layer = new Konva.Layer();
stage.add(layer);



function loop() {
    var curFn = CODE[PC];
    if (curFn){
        curFn['f'](curFn['p']);
    }
}

function push(fn, param) {
    var evalString = "CODE.push({'f':"+fn+",'p':["+param+"]})";
    eval(evalString);
}


function sleep(ms) {
    setTimeout(function() {
      PC++;
      loop();  
    }, ms);
}

function consoleLog(msg) {
    console.log(msg);
    PC++;
    loop();
}

function nr(param) {
    var vname = param[0];
    var blockSize = param[1];
    var color = param[2];
    var rect1 = new Konva.Rect({
        x: 0,
        y: 0,
        width: blockSize,
        height: blockSize,
        fill: color,
        stroke: 'orange',
        strokeWidth: 4,
        visible : true,
        draggable:true
    });
  
    layer.add(rect1);
    STACK.put(vname, rect1);
    PC++;
    loop();
}

function mv(param) {
    var vname = param[0];
    var duration = param[1];
    var posX = param[2];
    var posY = param[3];

    var shape = STACK.get(vname);
    shape.visible(true); 
    new Konva.Tween({
        node: shape,
        duration: duration,
        x: posX,
        y: posY,
        rotation: 0,
        radius: 40,
        opacity: 0.8,
        easing: Konva.Easings.EaseIn,
        onFinish: function() {
            PC++;
            loop();
        },
        fill: "#ffffff"
    }).play();
}



return {
    PC : PC,
    CODE:CODE,
    STACK:STACK,
    loop:loop,
    push:push
};

})();