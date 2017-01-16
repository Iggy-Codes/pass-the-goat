var alphabet = "abcdefghijklmnopqrstuvwxyz";
//var alphabet = "a";

var alphabetToPlay = "";

var ballRadius = 18;
var ballRadiusQuestion = ballRadius + 2;
var ballRadiusQuestionErase = ballRadiusQuestion + 1;
var ballColor = "teal";
var ballColorQuestion = "steelblue";
var ballColorWrong = "#B22222";
var ballColorCorrect = "green";
var ballColorErase = "white";

var letterSize = 25;
var letterSizeQuestion = letterSize + 5;
var letterFont =  "'Catamaran'";
var letterColor = "white";
var letterColorQuestion = "yellow";
var letterColorAnswered = "lightslategray";

var answerCorrect = "correct";
var answerWrong = "wrong";
var answerPending = "pending";

var gameOn;
var gameOverText = "Game Over";

var canvas;
var ctxCanvas;
var centerXCanvas, centerYCanvas;

var playerName;
var currentLetter;

var anotherGameTxt = "Start a new game?";

var wordsToPlay; 

var idLanguage, idLevel, idLetter, idPosition, idDefinition, idWord, idCorrect, idWrong, idPending, idPlayerName;

var idLeftContainer, idRightContainer, idLeftFirst, idLeftSecond, idBigLogo, idMyCanvas, idMessageUp;


function updateResults(){
    
    var wordsCorrect = 0, wordsWrong = 0, wordsPendings = 0;
    
    wordsToPlay.forEach(function(word){
        
        switch (word[3]){

            case answerCorrect:
                
                wordsCorrect++;
                
                break;

            case answerWrong:
                
                wordsWrong++;
                
                break;

            case answerPending:
                
                wordsPendings++;
                
                break;
        }
    });

    idCorrect.innerHTML = wordsCorrect;
    idWrong.innerHTML = wordsWrong;
    idPending.innerHTML = wordsPendings;
    idLetter.value = "";
    idPosition.value = "";
    idDefinition.value = "";
    idWord.value = "";
    
    checkPending(wordsToPlay);
}

function checkPending(words){
    
    var out = false
    
    words.forEach(function(word){
    
        if(word[3] === answerPending){
    
            out = true;
    
        }
    });
    
    gameOn = out;
}


function validateWord(){
    
    if(gameOn){

        var answerResult, ballColorAnswer;
        
        if(idWord.value === undefined || idWord.value === null || idWord.value === ""){
        
            alert("Please insert your answer");
        
            return false;
        
        }else{
            
            if(idWord.value.toLowerCase() === wordsToPlay[currentLetter][1].word.toLowerCase()){
                //answer correct
                //console.log(answerCorrect);

                answerResult = answerCorrect;
                
                ballColorAnswer = ballColorCorrect;

            }else{
                //answer wrong
                //console.log(answerWrong);
                
                answerResult = answerWrong;
                
                ballColorAnswer = ballColorWrong;

                alert("Your answer is wrong\nThe correct answer is: " + wordsToPlay[currentLetter][1].word);
            }

            drawBall(currentLetter, ballRadiusQuestionErase, ballColorErase);
            
            drawBallLetter(currentLetter, ballRadius, ballColorAnswer, alphabetToPlay.substr(currentLetter,1).toUpperCase(), letterFont, letterSize, letterColorAnswered);

            wordsToPlay[currentLetter][3] = answerResult;

            updateResults();

            currentLetter = ++currentLetter % alphabetToPlay.length;
        
            makeQuestion();
        }
    }
}

function skipWord(){
    //console.log("skip!!!");
    
    drawBall(currentLetter, ballRadiusQuestionErase, ballColorErase);
    
    drawBallLetter(currentLetter, ballRadius, ballColor, alphabetToPlay.substr(currentLetter,1).toUpperCase(), letterFont, letterSize, letterColor);
    
    currentLetter = ++currentLetter % alphabetToPlay.length;
    
    makeQuestion();
}

function cheatWord(){
    
    idWord.value = wordsToPlay[currentLetter][1].word;

    idWord.focus();
}

function makeQuestion(){

    var wordFound = false;
    
    if(gameOn){
        
        while(!wordFound){
            
            if(wordsToPlay[currentLetter][3] === "pending"){
                
                wordFound = true;
                
                idLetter.value = wordsToPlay[currentLetter][0];
                
                idPosition.value = wordsToPlay[currentLetter][2];
                
                idDefinition.value = wordsToPlay[currentLetter][1].definition;
        
                idWord.value = "";

                idWord.focus();

                drawBallLetter(alphabetToPlay.indexOf(wordsToPlay[currentLetter][0]), ballRadiusQuestion, ballColorQuestion, alphabetToPlay.substr(currentLetter,1).toUpperCase(), letterFont, letterSize, letterColorQuestion);

            } else {
                
                currentLetter = ++currentLetter % alphabetToPlay.length;
            }
        }

    } else {
        
        ctxCanvas.font = "bold " + (letterSize * 2) + "px " + letterFont
        
        ctxCanvas.beginPath();
        
        ctxCanvas.fillStyle = ballColor;
        
        ctxCanvas.textAlign="center"; 
        
        ctxCanvas.fillText(gameOverText, canvas.width / 2, canvas.height / 2);
        
        console.log("game off");
    }
    
}

function anotherGame() {
    
    if(confirm(anotherGameTxt)) startGame();
}

function hideMessage() {

    idMessageUp.style.padding = "0rem";

    idMessageUp.innerHTML = "";

    //idMessageUp.display = "none";
}

function showMessage(messageTxt, backGroundColor, color, fontSize, top, left, duration){

    //idMessageUp.display = "inline-block";

    idMessageUp.style.fontFamily = "Catamaran";

    idMessageUp.style.top = top;

    idMessageUp.style.left = left;

    idMessageUp.style.backgroundColor = backGroundColor;

    idMessageUp.style.color = color;

    idMessageUp.style.fontSize = fontSize + "rem";

    idMessageUp.style.padding = ".5rem";

    idMessageUp.innerHTML = "<p>" + messageTxt + "</p>";

    window.setTimeout(hideMessage,duration);
}

function startGame() {
    
    alphabetToPlay = "";
    
    gameOn = true;

    //leftSideScreen

    idLeftFirst.style.display = "none";

    idLeftSecond.style.display = "inline-block";

    idPlayerName.innerHTML = playerName;

    //rightSideScreen

    idBigLogo.style.display = "none";

    idMyCanvas.style.display = "inline-block";

    wordsToPlay = findWords(alphabet, dictionary, idLanguage.value);

    //pop up

    idMessageUp.style.display = "none";

    if(initializeCanvas()){

        drawAlphabet(alphabetToPlay);
    }

    currentLetter = document.getElementById("numLetter").value;

    updateResults();

    makeQuestion(currentLetter);
}

function login() { 

    idPlayerName = document.getElementById("playerName");
    idLanguage = document.getElementById("language");
    idLevel = document.getElementById("level");
    idLetter = document.getElementById("letter");
    idPosition = document.getElementById("position");
    idDefinition = document.getElementById("definition");
    idWord = document.getElementById("word");
    idCorrect = document.getElementById("correct");
    idWrong = document.getElementById("wrong");
    idPending = document.getElementById("pending"); 

    idLeftFirst = document.getElementById("leftFirst");
    idLeftSecond = document.getElementById("leftSecond");
    idBigLogo = document.getElementById("bigLogo");
    idMyCanvas = document.getElementById("myCanvas");
    idMessageUp = document.getElementById("messageUp");


    //leftSideScreen

    if(idPlayerName.value === null || idPlayerName.value === ""){

        //alert("Player Name can not be empty");
        showMessage("Player Name can not be empty", "red", "white", 1.5, "20%", "23%", 1500);

        idPlayerName.value = "";

        idPlayerName.focus();

    } else {

        startGame();
    }
}

