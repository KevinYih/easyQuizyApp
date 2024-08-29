const questions = [
  {
    question: "What is the correct syntax to print a message in the console?",
    answers: [
      { text: "console.print('Hello, World!')", correct: false },
      { text: "console.log('Hello, World!')", correct: true },
      { text: "print('Hello, World!')", correct: false },
      { text: "log.console", correct: false },
    ],
  },
  {
    question:
      "Which of the following is a way to declare a variable in JavaScript?",
    answers: [
      { text: "variable x = 10", correct: false },
      { text: "let x = 10", correct: true },
      { text: "x := 10", correct: false },
      { text: "declare x = 10", correct: false },
    ],
  },
  {
    question: "Which method is used to combine two arrays in JavaScript?",
    answers: [
      { text: "add()", correct: false },
      { text: "combine()", correct: false },
      { text: "concat()", correct: true },
      { text: "merge()", correct: false },
    ],
  },
  {
    question: "What is the result of typeof null in JavaScript?",
    answers: [
      { text: "null", correct: false },
      { text: "undefined", correct: false },
      { text: "object", correct: true },
      { text: "boolean", correct: false },
    ],
  },
  {
    question: "Which statement is used to stop a loop in JavaScript?",
    answers: [
      { text: "stop", correct: false },
      { text: "exit", correct: false },
      { text: "break", correct: true },
      { text: "end", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");
// const nextBtns = document.getElementsByClassName("btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + ". " + currentQuestion.question;

  // console.log("next question");
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    // if (answer.correct) {
    //   button.dataset.correct = answer.correct; //answer.correct
    // }
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  // console.log(typeof isCorrect);
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // if (button.dataset.correct === "false") {
    //   button.classList.add("incorrects");
    // }
    button.disabled = true; //you can't click any button
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextBtn.textContent = "Restart";
  nextBtn.style.display = "block";
}

// listener one
// function handleNextButton() {
//   currentQuestionIndex++;
//   if (currentQuestionIndex < questions.length) {
//     showQuestion();
//   } else {
//     showScore();
//   }
// }

// nextBtn.addEventListener("click", () => {
//   if (currentQuestionIndex < questions.length) {
//     handleNextButton();
//   } else {
//     startQuiz();
//   }
// });

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    nextBtn.addEventListener("click", () => {
      startQuiz();
    });
  }
});

startQuiz();
