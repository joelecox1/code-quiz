var startBtn = document.getElementById("start");
var startScreen = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var timerId;
var time = questions.length * 15;
var questionIndex = 0;
var rightWrongEl = document.getElementById("right-wrong");
var endScreen = document.getElementById("end-screen");
var saveBtn = document.getElementById("save-btn");
var initialsEl = document.getElementById("input");
var highScoresEl = document.getElementById("high-scores");
var scoreList = document.getElementById("score-list");
var clearBtn = document.getElementById("clear-score-btn");
var restartBtn = document.getElementById("restart");
var viewScoresBtn = document.getElementById("high-score");
var clickCount = 0;

function startQuiz() {
  startScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(countDown, 1000);

  getQuestions();
};

function countDown() {
  time--;
  timerEl.textContent = "Time: " + time;

  if (time <= 0) {
    endQuiz();
  }
};

function getQuestions() {
  var currentQuestion = questions[questionIndex];
  questionTitle.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choices = document.createElement("button");
    choices.setAttribute("class", "choice");
    choices.setAttribute("value", choice);
    choices.textContent = i + 1 + ". " + choice;
    console.log(choice);
    choices.onclick = questionClick;
    choicesEl.appendChild(choices);
  });
};

function questionClick() {
  if (this.value !== questions[questionIndex].answer) {
    time -= 10;

    if (time <= 0) {
      time = 0;
    };

    timerEl.textContent = "Time: " + time;

    rightWrongEl.textContent = "Wrong!";
  } else {
    rightWrongEl.textContent = "Correct!";

  }
  questionIndex++;

  if (questionIndex == questions.length) {
    endQuiz();
  } else {
    getQuestions();
  }
};

function endQuiz() {
  clearInterval(timerId);

  endScreen.removeAttribute("class");

  var score = document.getElementById("score");

  score.textContent = time;

  questionsEl.setAttribute("class", "hide");
};

function saveScore() {
  if (clickCount < 1) {
    var initials = initialsEl.value.trim();

    if (initials !== null) {
      var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        initials: initials
      };
  
      highScores.push(newScore);
  
      localStorage.setItem("highscores", JSON.stringify(highScores));
      showScores(highScores);
    };
  } else {
    highScoresEl.removeAttribute("class");
    startScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    // scoreList.setAttribute("class", "hide");
    // scoreList.textContent = "";  
  };
};

function showScores(highScores) {
  highScoresEl.removeAttribute("class");
  startScreen.setAttribute("class", "hide");
  endScreen.setAttribute("class", "hide");

  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  highScores.forEach(function (score) {
    var liEl = document.createElement("li");

    liEl.textContent = score.initials + " - " + score.score;
    scoreList.appendChild(liEl);
  });
};

function clearScores() {
  localStorage.clear();
  scoreList.setAttribute("class", "hide");
};

function reload() {
  location.reload();
};

function checkClicked() {
  clickCount++;
  saveScore();
};

startBtn.onclick = startQuiz;
saveBtn.onclick = saveScore;
clearBtn.onclick = clearScores;
restartBtn.onclick = reload;
viewScoresBtn.onclick = checkClicked;
