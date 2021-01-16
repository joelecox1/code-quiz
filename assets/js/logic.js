var startBtn = document.getElementById("start");
var startScreen = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var timerId;
var time = questions.length * 15;
var questionIndex = 0;


function startQuiz() {
  startScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class", "hide");
  timerId = setInterval(countDown, 1000);

  getQuestions();
};

function countDown() {
  time--;
  timerEl.textContent = time;

  if (time <= 0){
    endQuiz();
  }
};

function getQuestions() {
  var currentQuestion = questions[questionIndex];
  questionTitle.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choices = document.createElement("button");
    choices.setAttribute("class", "choice");
    choices.setAttribute("value", choice);
    choices.textContent = i + 1 + ". " + choice;

    choices.onclick = questionClick;
    choicesEl.appendChild(choices);
  });
};

function questionClick() {
  
};



startBtn.onclick = startQuiz;
