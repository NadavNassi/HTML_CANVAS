'use strict'

let gCanvas
let gCtx

let gIsDrawing = false;
let gX = 0;
let gY = 0;

let gLineWidth = 10
let gMaxSize = 75
let gDiff = gMaxSize * 1.2

let gDrawCurrShape = drawArc
let gFillColor
let gStrokeColor


function init() {
    gFillColor = document.querySelector('.fill-selector').value
    gStrokeColor = document.querySelector('.stroke-selector').value
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    // gCtx.restore()
    resizeCanvas()
    var hammertime = new Hammer(gCanvas);
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on('panstart', onPressDown)
    hammertime.on('pan', onPanMove)
    hammertime.on('pressup', onPressUp)
}

function onPressDown(ev) {
    ev.preventDefault()
    gX = ev.center.x
    gY = ev.center.y
    gIsDrawing = true
}

function onPanMove(ev) {
    ev.preventDefault()
    if (Math.abs(ev.center.x - gX) < gDiff && Math.abs(ev.center.y - gY) < gDiff) return;
    if (gIsDrawing === true) {
        gDrawCurrShape(gX, gY);
        gX = ev.center.x;
        gY = ev.center.y;
    }
}

function onPressUp(ev) {
    ev.preventDefault()
    if (gIsDrawing === true) {
        gDrawCurrShape(gX, gY);
        gX = 0;
        gY = 0;
        gIsDrawing = false;
    }
}

// function onSave(ev) {
//     gCtx.save();
// }



function onSetMaxSize(elMaxSize) {
    if (elMaxSize.value < 1 || elMaxSize.value > 75) {
        alert('MAX SIZE VALUE HAS TO BE BETWEEN 1 AND 75')
        elMaxSize.value = ''
        return;
    }
    gMaxSize = elMaxSize.value
    gDiff = gMaxSize * 1.2
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function drawArc(x, y) {
    const arcMaxSize = Math.random() * gMaxSize
    gCtx.beginPath();
    gCtx.arc(x, y, arcMaxSize, 0, 2 * Math.PI);
    gCtx.strokeStyle = gStrokeColor
    gCtx.fillStyle = gFillColor
    gCtx.lineWidth = gLineWidth
    gCtx.fill();
    gCtx.stroke();
    gCtx.closePath()
}


function drawRect(x, y) {
    gCtx.beginPath();
    const width = Math.random() * gMaxSize
    const height = Math.random() * gMaxSize
    gCtx.rect(x, y, width, height)
    gCtx.fillStyle = gFillColor
    gCtx.lineWidth = gLineWidth
    gCtx.fillRect(x, y, width, height)
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
    gCtx.closePath()
}

function setShape(shape) {
    if (shape === 'circle') gDrawCurrShape = drawArc
    else gDrawCurrShape = drawRect
}

function setStrokeColor(color) {
    gStrokeColor = color
}

function setFillColor(color) {
    gFillColor = color
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}



    // function drawTriangle(x, y) {
    //     gCtx.beginPath();
    //     gCtx.moveTo(x, y);
    //     gCtx.lineTo(Math.random() * gCanvas.offsetWidth, Math.random() * gCanvas.offsetHeight);
    //     gCtx.lineTo(Math.random() * gCanvas.offsetWidth, Math.random() * gCanvas.offsetHeight);
    //     gCtx.closePath()
    //     gCtx.lineWidth = '5'
    //     gCtx.strokeStyle = gStrokeColor
    //     gCtx.fillStyle = gFillColor
    //     gCtx.stroke();
    //     gCtx.fill()

    // }