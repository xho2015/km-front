var ART = (function() {

//runtime support inforsturcture
var PC = 0;
var CODE = [];
var STACK = new AppCommon.Map();

//2d support facilities
var cwidth = $("#panel_canvas").width();
var cheight = $("#panel_canvas").height();
var stage = new Konva.Stage({ container: 'panel_canvas', width: cwidth, height: cheight});
var layer = new Konva.Layer();
stage.add(layer);


/**
 * public: initilization of Animation Runtime
 */
function init() {
    clear();
}


/**
 * public: launch the ART
 */
function run() {
    loop();
}

/**
 * append commands to command queue. 
 * @param {} index cmd index
 * @param {*} fn function
 * @param {*} param  parameters
 */
function code(fn, param) {
    //ignore index
    var evalString = "CODE.push({'l':'','f':"+fn+",'p':["+param+"]})";
    eval(evalString);
}

function label(name) {
    var evalString = "CODE.push({'l':'"+name+"','f':dummy ,'p':[]})";
    eval(evalString);
}

function dummy(param) {
    //DONOTHING, only for code line labling
    PC++;  loop();
}


/**
 * private: main loop.
 */
function loop() {
    var curFn = CODE[PC];
    if (curFn){
        curFn['f'](curFn['p']);
    }
}

/**
 * private: clear variable
 */
function clear() {
    try {
        delete CODE; CODE = [];  
        delete STACK; STACK = new AppCommon.Map();
        PC = 0;
    } catch (e) {
        return e;
    }
}

/**
 * have variable assign value IN STACK
 */
function assign(param) {
    var vname = param[0];  var vvalue = param[1];
    if (STACK.get(vname)){
        console.error("var ["+vname+"] has been decleared.");
        alert("var ["+vname+"] has been decleared.");
    }
    STACK.put(vname, vvalue);
    PC++; loop();
}

/**
 * decrease value of a number variable by param[1]
 */
function vdec(param) {
    var vname = param[0]; var vvalue = param[1];
    if(isNaN(vvalue)!==0) {
        var nvalue = STACK.get(vname);  
        nvalue-=vvalue;   
        STACK.put(vname, nvalue);
    }
    PC++;  loop();
}

function dump(param) {
    console.log(param[0]+":"+STACK.get(param[0]));  
    PC++;  loop();
}

/**
 * increase value of a variable by param[1]
 */
function vinc(param) {
    var vname = param[0]; var vvalue = param[1];
    if(isNaN(vvalue)!==0) {
        var nvalue = STACK.get(vname);   nvalue+=vvalue;     STACK.put(vname, nvalue);
    }
    PC++; loop();
}

/**
 * jump to index line if variable is not equal zero
 */
function nzjp(param) {
    var vname = param[0];  
    var lineLabel = param[1];

    var nvalue = STACK.get(vname);
    if (nvalue > 0) {
        for (i=0; i<CODE.length;i++) {
            if (CODE[i]['l']===lineLabel) {
                PC = i; loop();  return;
            }
        }
    }
    PC++;  loop();
}


function ifgo(param) {
    var vname = param[0];
    var exp = param[1];
    var gotoLabel = param[2];

    eval("var "+vname+"=STACK.get('"+vname+"');");

    var ret = eval(exp);
    if(ret) {
        for (i=0; i<CODE.length;i++) {
            if (CODE[i]['l']===gotoLabel) {
                PC = i; loop();  return;
            }
        }
    } 
    PC++; loop();
}

/**
 * new a text K object
 */
function text(param) {
    var vname = param[0];
    var str = param[1];
    var text1 = new Konva.Text({x: 0, y: 0, text: str, fontSize: 60,fontFamily: 'Calibri', fill: '#ffffff' });
    layer.add(text1);  layer.draw();
    STACK.put(vname, text1);
    PC++; loop();
}

/**
 * private: clone a K object
 */
function clone(param) {
    var vname = param[0];
    var cname = param[1];
    var nobj = STACK.get(vname).clone();
    STACK.put(cname, nobj);
    layer.add(nobj);
    PC++; loop();
}

/**
 * shine a K shape or shape group
 */
function shine(param) {
    var duration = param[0]; var fill = param[1];
    var oldFill = [];
    for (i=2; i<param.length;i++) {
        var vname = param[i]; 
        var shape = STACK.get(vname);
        oldFill.push(shape.fill());
        shape.fill(fill);
    }     
    layer.draw();
    setTimeout(function() {
          for (i=2; i<param.length;i++) {
            var vname = param[i]; var shape = STACK.get(vname);
            shape.fill(oldFill[i-2]);
          }  
          layer.draw();
          PC++;loop();
      }, duration);

}

/**
 * align a group of shape
 */
function align(param) {
    var xPos = param[0];  var yPos = param[1];
    for(i=2; i<param.length; i++) {
        var vname = param[i];
        var shape = STACK.get(vname);
        shape.absolutePosition({x: xPos, y: yPos});
        layer.draw();
        xPos+=shape.width() * 1.2;
    }
    PC++; loop();
}

/**
 * sleep a while for given duration
 */
function sleep(ms) {
    setTimeout(function() {
      PC++; loop();  
    }, ms);
}

/**
 * console log message
 */
function log(msg) {
    console.log(msg);
    PC++; loop();
}

/**
 * new a K rect object
 */
function rect(param) {
    var vname = param[0]; var blockSize = param[1];var color = param[2];
    var rect1 = new Konva.Rect({
        x: 0,   y: 0, width: blockSize,   height: blockSize,  fill: color, stroke: 'orange',
        strokeWidth: 4,    visible : true,     draggable:true });
    layer.add(rect1);
    STACK.put(vname, rect1);
    PC++; loop();
}


/**
 * move a K object by Tween action
 */
function move(param) {
    var vname = param[0]; var duration = param[1]; var posX = param[2]; var posY = param[3];
    var shape = STACK.get(vname);
    shape.visible(true); 
    new Konva.Tween({
        node: shape, duration: duration, x: posX, y: posY, rotation: 0,radius: 40,opacity: 0.8,
        easing: Konva.Easings.EaseIn,
        onFinish: function() {
            PC++; loop();
        },
        fill: "#ffffff"
    }).play();
}

function changeText(param) {
    var vname = param[0];
    var newText = param[1];
    var obj = STACK.get(vname);
    obj.text(newText);
    layer.draw();
    PC++; loop();
}

function destroy(param) {
    var vname = param[0];
    var obj = STACK.get(vname);
    STACK.remove(vname);
    obj.destroy();
    layer.draw();
    PC++; loop();
}

/**
 * move a K object by Tween action
 */
function to(param) {
    var vname = param[0]; var duration = param[1]; var posX = param[2]; var posY = param[3];
    var shape = STACK.get(vname);
    shape.visible(true); 
    shape.to({duration: duration, x: posX, y: posY,
        onFinish: function() {
            PC++; loop();
        }
    });
}


return {
    run:run,
    init:init,
    code:code,
    label:label
};

})();