function initializeCanvas(){
    canvas = document.getElementById("myCanvas");
    if(canvas.getContext){

        //2 Dimensions
        ctxCanvas = canvas.getContext("2d");

        //clear canvas
        //ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
        centerXCanvas = canvas.height / 2;
        centerYCanvas = canvas.width / 2;
        //console.log("Center x: " + centerXCanvas + "\nCenter y: " + centerYCanvas);        
        //change background color to white
        
        return true;
    }  else {
        return false;
    }
}


function posBall(i){

    var stepRad = ( 2 * Math.PI ) / alphabetToPlay.length;
    
    var radiusCircle = Math.round((5* Math.min(canvas.width, canvas.height)) / 12 );   
    
    var posX = centerXCanvas + Math.round(radiusCircle * Math.sin(stepRad * i));
    
    var posY = centerYCanvas - Math.round(radiusCircle * Math.cos(stepRad * i));
    return [posX,posY];
}

function drawBall(i, radiusBall, colorBall){
    
    ctxCanvas.beginPath();
    
    ctxCanvas.fillStyle = colorBall;
    
    ctxCanvas.arc(posBall(i)[0], posBall(i)[1], radiusBall, 0, 2 * Math.PI);
    
    ctxCanvas.fill();
}

function drawLetter(i, letter, letterFont, letterSize, letterColor){
    
    //console.log("bold " + letterSize + "px '" + letterFont + "'");
    ctxCanvas.font = "bold " + letterSize + "px " + letterFont;
    

    // Move it down by half the text height and left by half the text width
    var width = ctxCanvas.measureText(letter).width;


//    var posXLetter = posBall(i)[0] -  Math.round(letterSize * .3);
    
    var posXLetter = posBall(i)[0] -  width / 2;

    var posYLetter = posBall(i)[1] +  Math.round(letterSize * .3);
    
    ctxCanvas.beginPath();
    
    ctxCanvas.fillStyle = letterColor;
    
    ctxCanvas.fillText(letter, posXLetter, posYLetter);
}

function drawBallLetter(i, radiusBall, colorBall, letter, letterFont, letterSize, letterColor){
    
    drawBall(i, radiusBall, colorBall);
    
    drawLetter(i, letter, letterFont, letterSize, letterColor)
}

function drawAlphabet(alphabet){
    
    ctxCanvas.fillStyle = "white";
    
    ctxCanvas.fillRect(0, 0, canvas.width, canvas.height);
    
    ctxCanvas.fill();
    
    for(var i = 0; i < alphabet.length; i++) {
    
        drawBallLetter(i, ballRadius, ballColor, alphabet.substr(i,1).toUpperCase(), letterFont, letterSize, letterColor);
    }
}

