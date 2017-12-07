//global variables
  var brushSize = 3;
  var brushType = 'default';
  var lineStartX;
  var lineStartY;
  var lineStarted;

var app = function(){
  var canvas = document.getElementById('main-canvas');
  var context = canvas.getContext('2d');
  console.log(context);


//need to run first, they populate initial setup

      var sizedropper = document.getElementById('size-dropper');
      for (i = 0 ; i < 40 ; i++){
        var option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        sizedropper.appendChild(option);
      }
      sizedropper.addEventListener('change', function(){
        brushSize = sizedropper.value;
      })

      var currentBrushDisplay = function(){
        var current = document.getElementById('current-brush');
        current.innerText = "Current: " + brushType;
      }

      sizedropper.value = 3;
      currentBrushDisplay();

//mouseEvents
          var mouseDown;

          canvas.addEventListener('mousedown', function(event){
            mouseDown = true;
            switch (brushType){
              case 'default':
                simpleBrushStart(event.layerX, event.layerY);
              break;
              case 'line':
                if (!lineStarted)
                {
                  startLine(event.layerX, event.layerY);
                }
                else {
                  endLine(event.layerX, event.layerY);
                }
              break;
            }
          })

          canvas.addEventListener('mouseup', function(event){
            mouseDown = false;
            simpleBrushEnd();
          })

          canvas.addEventListener('mousemove', function(event){
            if (mouseDown && brushType === 'default'){
              simpleBrushDraw(event.layerX, event.layerY, brushSize);
            }
          })

          canvas.addEventListener('dblclick', function(event){
            lineStarted = false;
          })


//draw Functions

          var drawCircle = function(x, y){
            context.beginPath();
            context.arc(x, y, 50, 0, 2*Math.PI);
            context.stroke();
            context.closePath();
          }

          var startLine = function(x, y){
            lineStartX = x;
            lineStartY = y;
            lineStarted = true;
          }

          var endLine = function(x, y){
            context.lineJoin = "round";
            context.lineWidth = brushSize;
            context.beginPath();
            context.moveTo(lineStartX, lineStartY);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
            lineStartX = x;
            lineStartY = y;
          }

          var simpleBrushStart = function(x, y, size){
            context.lineJoin = "round";
            context.lineWidth = size;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x-1, y-1);
            context.stroke();
          }

          var simpleBrushDraw = function(x, y, size){
            context.lineJoin = "round";
            context.lineWidth = size;
            context.lineTo(x-1, y-1);
            context.stroke();
          }

          var simpleBrushEnd = function(){
            context.closePath();
          }

//toolbar Functions

  var changeColour = function(){
    context.strokeStyle = this.value;
  }

  var changeBrushSize = function(size){
    brushSize = size;
    changeBrushType('default');
    currentBrushDisplay();
  }

  var changeBrushType = function(type){
    lineStarted = false;
    switch (type){
      case 'default':
        brushType = 'default';
        break;
      case 'line':
        brushType = 'line';
        break;
    }
    currentBrushDisplay();
  }

  var clearAll = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }


//DOM manipulation
  var colourPicker = document.getElementById('color-picker');
  colourPicker.addEventListener('change', changeColour);

  var lineTool = document.getElementById('line-tool');
  lineTool.addEventListener('click', function(){
    changeBrushType('line');
  })
  var penTool = document.getElementById('pen-tool');
  penTool.addEventListener('click', function(){
    changeBrushType('default');
  })
  var clearButton = document.getElementById('clear-all');
  clearButton.addEventListener('click', clearAll);


};


var paintBrush = function(){
  var context = canvas.getContext('2d');
  var isDrawing;
  context.lineWidth = brushSize;
  context.closePath();
  context.beginPath();

  canvas.onmousedown = function(e) {
    isDrawing = true;
    context.moveTo(e.clientX, e.clientY);
  };
  canvas.onmousemove = function(e) {
    if (isDrawing) {
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    }
  };
  canvas.onmouseup = function() {
    isDrawing = false;
  };
}



window.addEventListener('load', app);
