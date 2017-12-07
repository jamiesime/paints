var app = function(){
  var canvas = document.getElementById('main-canvas');
  var context = canvas.getContext('2d');
  console.log(context);
  //
  // context.fillStyle = "#FFA500";
  // context.fillRect(10, 10, 100, 100);
  //
  // context.beginPath();
  // context.moveTo(100, 100);
  // context.lineTo(100, 200);
  // context.stroke();
  //
  // context.beginPath();
  // context.moveTo(200,200);
  // context.lineTo(200, 300);
  // context.lineTo(100,300);
  // context.closePath();
  // context.stroke();
  //
  // context.beginPath();
  // context.arc(200, 200, 75, 0, 2*Math.PI);
  // context.fill();
  // context.closePath();

//global variables
  var brushSize = 3;

//mouseEvents
          var mouseDown;

          canvas.addEventListener('mousedown', function(event){
            console.log('location: ', event.layerX, event.layerY);
            simpleBrush(event.layerX, event.layerY);
            mouseDown = true;
          })

          canvas.addEventListener('mouseup', function(event){
            mouseDown = false;
          })

          canvas.addEventListener('mousemove', function(event){
            if (mouseDown){
              simpleBrush(event.layerX, event.layerY, brushSize);
            }
          })


//draw Functions
          var drawCircle = function(x, y){
            context.beginPath();
            context.arc(x, y, 50, 0, 2*Math.PI);
            context.stroke();
            context.closePath();
          }

          var simpleBrush = function(x, y, size){
            context.lineJoin = "round";
            context.lineWidth = size;
            context.beginPath();
            context.moveTo(x-1, y-1);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
          }

        var img = document.createElement('img');
        img.src = "http://emojis.slackmojis.com/emojis/images/1457563042/312/doge.png";

        var drawDog = function(){
          context.drawImage(img, 200, 400, 90, 90);
        }
        img.addEventListener('load', drawDog);


//toolbar Functions

  var changeColour = function(){
    context.strokeStyle = this.value;
  }

  var changeBrushSize = function(size){
    brushSize = size;
  }





//DOM manipulation
  var colourPicker = document.getElementById('color-picker');
  colourPicker.addEventListener('change', changeColour);

  var smallBrush = document.getElementById('small-brush');
  smallBrush.addEventListener('click', function(){
    changeBrushSize(3);
  })
  var mediumBrush = document.getElementById('medium-brush');
  mediumBrush.addEventListener('click', function(){
    changeBrushSize(6);
  })
  var largeBrush = document.getElementById('large-brush');
  largeBrush.addEventListener('click', function(){
    changeBrushSize(10);
  })

};



window.addEventListener('load', app);
