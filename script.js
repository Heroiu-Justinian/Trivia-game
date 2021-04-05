(function(){
//************************************THE TIMER GOES HERE**************************************************************** */


var counter = 0;
var timeLeft = 16;
var timer = document.querySelector('#timer');
timer.style.display = 'none';
function setupTimer(){
        timer.style.display = 'block'
        timer.textContent = '0';
        function timeIt(){
                counter++;
                timer.textContent = timeLeft - counter;
                timer.style.value = timeLeft-counter;  
                if(counter === timeLeft){
                    nextQuestion();
                    counter = 0;
                }
        };
            setInterval(timeIt,1000);
    }
    




//Everything besides the timer is going to be inside a private function for privacy(not now)



//Game controlling
//The DOMstrings object for convenient use of the query selector
var DOMstrings = {
    question : '.question',
    html : '<div class = "answer" id = "answer-0">%number%.%description%</div>',
    answersWrapper : '.answersWrap',
    nextQuestionBtn : '.next',
    checkBtn :'.check__btn',
    inputValue :'.add__value',
    giveUp:'.backBtn',
    progressBar:'#loadingBar',
    restart : '.restart'
}

//Set the array with the questions
var questions = ['q1','q2','q3','q4',"q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "q26", "q27", "q28", "q29", "q30"];
//the current idex of the question array
var answerIndex = 0;
var currentIndex = 0;
//Set the array with the answers
var answers = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12', 'a13', 'a14', 'a15','a16',"a17", "a18", "a19", "a20", "a21", "a22", "a23", "a24", "a25", "a26", "a27", "a28", "a29", "a30", "a31", "a32", "a33", "a34", "a35", "a36", "a37", "a38", "a39", "a40", "a41", "a42", "a43", "a44", "a45", "a46", "a47", "a48", "a49", "a50", "a51", "a52", "a53", "a54", "a55", "a56", "a57", "a58", "a59", "a60", "a61", "a62", "a63", "a64", "a65", "a66", "a67", "a68", "a69", "a70", "a71", "a72", "a73", "a74", "a75", "a76", "a77", "a78", "a79", "a80", "a81", "a82", "a83", "a84", "a85", "a86", "a87", "a88", "a89", "a90", "a91", "a92", "a93", "a94", "a95", "a96", "a97", "a98", "a99", "a100", "a101", "a102", "a103", "a104", "a105", "a106", "a107", "a108", "a109", "a110", "a111", "a112", "a113", "a114", "a115","a116","a117","a118","a119","a120"];
var correctAnswers = [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2]; //Position from 1 to 4(here the correct answer tot the first question is the first answer and so on)
 var currentCorrectAns = correctAnswers[currentIndex];                                             //currentIndex * 4 + correctAnswers[currentIndex];
//Input from the user(the answer from the user)
var userAnswer = parseInt(document.querySelector(DOMstrings.inputValue).value);

//Player score
var score = 0;
//
function calculateScore(){
    if(currentIndex < 10){
        score += 10;
    }else if(currentIndex >= 10 && currentIndex < 20){
        score += 15;
    }else if (currentIndex >= 20){
        score += 25;
    }
    score = Math.round(score + timeLeft/10);
}
function resetCounter(){
    counter = 0;
    if(currentIndex < 10 ){
        timeLeft = 15;
    }else if(currentIndex >= 10 && currentIndex < 20){
        timeLeft = 24;
    }else if (currentIndex >= 20){
        timeLeft = 36;
    }
    
}
//get tpo the next question
function nextQuestion(){
    if(currentIndex < questions.length - 1){//you can't infinitely click "next"
    resetCounter();
    clearField();
        currentIndex++;
        answerIndex += 4;
        currentCorrectAns = correctAnswers[currentIndex];
        // removeAnswers()
        display();//add the new ones
    }else{
        displayEndingScreen();
    }
}
//check if the answer is right
function checkAnswer(){
    var userAnswer = parseInt(document.querySelector(DOMstrings.inputValue).value) ;
    if(userAnswer === currentCorrectAns){
        calculateScore();//if the answer is correct calculate the score
        console.log('your score is' + score);
        nextQuestion();
    }else{
      console.log('wrong answer pal');
      nextQuestion();
    }
    
}
//Clear input
function clearField(){
    document.querySelector(DOMstrings.inputValue).value = "";

}





//UI controlling
//Intro screen
var answerBlock = document.querySelector('.wrapperDW');
answerBlock.style.display = 'none';


var element,newHTML;
element = DOMstrings.answersWrapper;
function display(){
    document.querySelector(DOMstrings.question).textContent = questions[currentIndex];
    removeAnswers(); 
    var number =1;   
    for ( var i = answerIndex;i<(currentIndex + 1) * 4;i++){ //For every question index take 4 possible answers   
         
        newHTML = DOMstrings.html.replace('%description%',answers[i]);
        newHTML = newHTML.replace('%number%',number);
        number++;
        document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
        
    }
    progress();
    }


    var wrapper =  document.querySelector(DOMstrings.answersWrapper);//deining them in the global scope because they are needed in both functions bellow
    // var child = wrapper.lastElementChild; ___________________TEST IF IT WORKS WITHOUT THIS
function removeAnswers(){
    var child = wrapper.lastElementChild;
    while (child) { //remove all the elements on the screen before adding the new ones
        wrapper.removeChild(child); 
        child = wrapper.lastElementChild; 
    }
}

function displayEndingScreen(){
    document.querySelector(DOMstrings.question).textContent = "Congrats!You have finished our programming quiz!";   
    removeAnswers();
    clearField();
    newHTML = DOMstrings.html.replace('%description%',"You have acquired " + score + " points");
    newHTML = newHTML.replace('%number%.','');
  
    document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
    timer.style.display = 'none';
    
}
    
    //LOADING BAR
    var pBar,widthB;

    pBar = document.querySelector(DOMstrings.progressBar);
    widthB =0.1;
    function progress(){
        widthB = 3.33 * (currentIndex + 1) + 0.1;
        pBar.style.width = widthB + '%';
        pBar.textContent = Math.round(widthB) + '%';
    }
   









//GLOBAL CONTROLLER
var setupEventListeners = function(){
    document.querySelector(DOMstrings.nextQuestionBtn).addEventListener('click',nextQuestion);
    document.querySelector(DOMstrings.checkBtn).addEventListener('click',checkAnswer);
    document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which === 13){
            checkAnswer();
        }
    });
    document.querySelector(DOMstrings.giveUp).addEventListener('click',displayEndingScreen)
    document.querySelector(DOMstrings.restart).addEventListener("click",restart);
}



//initializes the scene
function restart(){
    currentIndex = 0;
    answerIndex = 0;
    currentCorrectAns = correctAnswers[currentIndex];
    score = 0;
    resetCounter();//reset the countdown timer
    clearField();
    //reset the index
    progress();//reset the progress
    removeAnswers();
   display();
}
function init(){
    setupTimer();
    removeAnswers();//Remove the "intro" screen
    answerBlock.style.display = 'block';
    setupEventListeners();
    display();
    resetCounter();
}
//  init();
document.querySelector('.start').addEventListener('click',init);

    
})();

