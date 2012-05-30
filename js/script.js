// variables
var canvas, ctx;
var imgObj;
var imgd;
var iOpSize = 40;
var iMode = 0;
var iCDif = 80;
var r0, r1, r2, r3, r4, r5, r6 = 0;

// util functions
function changeMode(i) {
    iMode = i;
}
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

// drawing functions
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    // draw original image
    ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
    if (iMode) {
        // .. and get its data
        imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgd.data;

        for (var y = 0; y < canvas.height; y+=iOpSize){
            for (var x = 0; x < canvas.width; x+=iOpSize){

                // different modes
                if (iMode == 1) {
                    r0 = 55 + Math.random() * 200;
                    r1 = r2 = r3 = r4 = r5 = r6 = 0;
                } else if (iMode == 2) {
                    r0 = 255;
                    r1 = r3 = r5 = getRand(-iCDif, iCDif * 2);
                    r2 = r4 = r6 = getRand(0, iCDif);
                } else if (iMode == 3) {
                    r0 = 255;
                    r1 = getRand(-iCDif, iCDif * 2);
                    r2 = getRand(0, iCDif);
                    r3 = getRand(-iCDif, iCDif * 2);
                    r4 = getRand(0, iCDif);
                    r5 = getRand(-iCDif, iCDif * 2);
                    r6 = getRand(0, iCDif);
                }

                for (var y2 = 0; y2 < iOpSize; y2++){
                    for (var x2 = 0; x2 < iOpSize; x2++){
                        var i = ((y + y2) * canvas.width + x + x2) * 4;

                        data[i+0] = data[i+0] - r1 + r2;
                        data[i+1] = data[i+1] - r3 + r4;
                        data[i+2] = data[i+2] - r5 + r6;
                        data[i+3] = r0;
                    }
                }
            }
        }

        ctx.putImageData(imgd, 0, 0);
    }
}

// binding onload event
if (window.attachEvent) {
    window.attachEvent('onload', main_init);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            main_init();
        };
        window.onload = newonload;
    } else {
        window.onload = main_init;
    }
}

function main_init() {

    // creating canvas and context objects
    canvas = document.getElementById('panel');
    ctx = canvas.getContext('2d');

    // loading source image
    imgObj = new Image();
    imgObj.onload = function () {
        ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas
        imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    imgObj.src = 'images/01.jpg';

    setInterval(drawScene, 150); // loop drawScene // 30
}