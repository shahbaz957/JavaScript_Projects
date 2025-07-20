document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-btn");
  const nextButton = document.getElementById("next-btn");
  const restartButton = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("questioin-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Stockholm", "Berlin"],
      answer: "Paris",
    },
    {
      question: "Which Planet is known as Red Planet?",
      choices: ["Mars", "Venus", "Jupyter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet' ?",
      choices: [
        "Charles Dickens",
        "Jane Austin",
        "Vesper Lynd",
        "William Shakespeare",
      ],
    },
  ];
  let currentQuestionIndex = 0;
  let score = 0;

  // ************************ Buttons Listener **********************************

  startButton.addEventListener("click", startQuiz);
  restartButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", nextQuestion);

  function startQuiz() {
    startButton.classList.add("hidden");
    resultContainer.classList.add("hidden"),
      questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    showQuestion();
  }
  function showQuestion() {
    nextButton.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; // clearing the text for the next question
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectedAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }
  function selectedAnswer(choice, checkedLi) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      score++;
    }
    const allChoices = choicesList.querySelectorAll("li");
    allChoices.forEach((item) => {
      item.style.pointerEvents = "none";
      item.classList.add("disabled");
    });
    checkedLi.classList.add("selected");
    nextButton.classList.remove("hidden");
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} Out of ${questions.length}`;
  }
});
