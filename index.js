const questions = [
    {
        question: "Combien de dieses y a t-il dans la gamme majeur ?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: true }
        ]
    },
    {
        question: "Combien de gamme de si mineur y a t-il?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "4", correct: false }
        ]
    },
    {
        question: "Combien de bémols compte la gamme de Fa mineur?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: true }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('buttonreponse');
const nextButton = document.getElementById('nextquestion');

let currentQuestionIndex = 0;
let score = 0;
document.getElementById("startbutton").addEventListener("click", function() {

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }

    function showQuestion(){
        resetState();
        let currentQuestion= questions[currentQuestionIndex];
        let questionNo=currentQuestionIndex+1;
        questionElement.innerHTML=questionNo+". "+currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button=document.createElement('button');
            button.innerHTML=answer.text;
            button.classList.add('butn');
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct=answer.correct;
            }
            button.addEventListener('click', selectAnswer);
        });
    }

    function resetState(){
        nextButton.style.display = 'none';
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e){
        const selectedButton=e.target;
        const correctAnswer=selectedButton.dataset.correct==='true';
        if(correctAnswer){
            selectedButton.classList.add("correct");
            score++;
        }
        else{
            selectedButton.classList.add("wrong") 
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct==='true'){
                button.classList.add('correct');
            }
            button.disabled=true;
        });
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startGame() 
        }
    });

    function showScore(){
        resetState();
        questionElement.innerHTML="Votre score est de "+score+" sur "+questions.length;
        nextButton.innerHTML="Recommencer";
        document.querySelector(".timersection").remove();

    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex<questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }

    let timerValue = 60;

    document.getElementById("startbutton").style.display = "none";

    function updateTimer() {
        const display = document.getElementById("timerValue");
        display.textContent = timerValue;

        if (timerValue <= 10) {
            display.style.color = "red";
        } else {
            display.style.color = "black";
        }
        if (timerValue <= 0) {
            showScore();
        }
    }

    // Function to start the timer
    function startTimer() {
        updateTimer();

        setInterval(function () {
            if (timerValue > 0) {
                timerValue--;
                updateTimer();
            }
        }, 1000);
    }

    startTimer();
    startGame();
});


  




