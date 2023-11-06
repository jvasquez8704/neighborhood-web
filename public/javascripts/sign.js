var canvas = document.querySelector('canvas');
  canvas.style.position = 'relative';
  canvas.style.top = "0";
  canvas.style.left = "0";

var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 350;

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, drawLine;

canvas.onmousedown = function(event) {
  isDrawing = true;
  drawLine = { x: event.clientX, y: event.clientY };
};

canvas.onmousemove = function(event) {
  if (!isDrawing) return;

  ctx.beginPath();
  
  ctx.moveTo(drawLine.x, drawLine.y);
  ctx.lineTo(event.clientX, event.clientY);
  ctx.stroke();
     
  drawLine = { x: event.clientX, y: event.clientY };
};

canvas.onmouseup = function() {
  isDrawing = false;
};

document.getElementById('clear').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, false);

window.onload = function(){
var save = document.getElementById('download');

 save.onclick = function(){
    download(canvas, 'signature.png');
  }

}

function download(canvas, filename) {
  var lnk = document.createElement('a'), e;
  lnk.download = filename;
  lnk.href = canvas.toDataURL("image/png;base64");
  
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}