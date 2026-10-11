
const questions = [
  {
    question: "what makes a relationship healthy? ♡",
    hint: "let's start with the basics...",
    answers: [
      "trust, respect, and communication",
      "always agreeing with each other",
      "never talking about problems"
    ],
    correct: 0
  },
  {
    question: "what should you do when something feels wrong?",
    hint: "communication is key 💌",
    answers: [
      "pretend nothing happened",
      "talk honestly about your feelings",
      "ignore the other person"
    ],
    correct: 1
  },
  {
    question: "what does trust mean in a relationship? 🎀",
    hint: "think about what builds a strong connection",
    answers: [
      "having to check everything",
      "never needing boundaries",
      "feeling safe and being honest"
    ],
    correct: 2
  },
  {
    question: "is it okay to set personal boundaries? 💗",
    hint: "everybody has their own needs",
    answers: [
      "yes, boundaries matter",
      "no, boundaries ruin everything",
      "only when the other person agrees"
    ],
    correct: 0
  },
  {
    question: "what should happen when feelings change? 🦋",
    hint: "sometimes life gets complicated",
    answers: [
      "hide it forever",
      "be honest and communicate",
      "keep making promises you don't mean"
    ],
    correct: 1
  },
  {
    question: "does caring about someone mean you must stay together?",
    hint: "this one's a little deeper...",
    answers: [
      "yes, no matter what",
      "only if other people approve",
      "no, caring and compatibility aren't the same"
    ],
    correct: 2
  },
  {
    question: "what is the kindest way to end a relationship? 💌",
    hint: "think about the other person's feelings",
    answers: [
      "be honest, direct, and respectful",
      "disappear without saying anything",
      "make the other person guess"
    ],
    correct: 0
  },
  {
    question: "what do both people deserve? ♡",
    hint: "last question, you've got this!",
    answers: [
      "to be together forever, no matter what",
      "honesty, respect, and kindness",
      "to never have difficult conversations"
    ],
    correct: 1
  }
];

const finalMessage = `i just wanna say that i've genuinely enjoyed the time we've spent talking and getting to know each other. you've made me smile, and i'm grateful for the memories and the moments we've shared. i don't regret any of it, and i hope you know that you didn't do anything wrong.

but as much as i've enjoyed everything, i don't think i can keep doing this anymore. i don't wanna lead you on or keep something going when my heart isn't fully in it anymore. you deserve honesty, and i didn't wanna leave you wondering what happened or why things changed.

i really do wish you the best, and i hope life brings you so many good things. thank you for the laughs, the conversations, and the time we had together. i'll always appreciate that.

take care of yourself 💗`;

const welcomeScreen = document.getElementById("welcome");
const quizScreen = document.getElementById("quiz");
const loadingScreen = document.getElementById("loading");
const endingScreen = document.getElementById("ending");

const startBtn = document.getElementById("startBtn");
const questionCount = document.getElementById("questionCount");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const questionHint = document.getElementById("questionHint");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const typedMessage = document.getElementById("typedMessage");
const cursor = document.querySelector(".cursor");
const loadingText = document.getElementById("loadingText");

let currentQuestion = 0;
let typingTimer = null;
let answerLocked = false;

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(item => {
    item.classList.remove("active");
  });

  screen.classList.add("active");
}

startBtn.addEventListener("click", () => {
  currentQuestion = 0;
  showScreen(quizScreen);
  renderQuestion();
});

function renderQuestion() {
  answerLocked = false;

  const item = questions[currentQuestion];

  questionCount.textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionText.textContent = item.question;
  questionHint.textContent = item.hint;
  feedback.textContent = "";
  answersContainer.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-btn";
    button.type = "button";
    button.textContent = `${["♡", "✧", "♥"][index]}  ${answer}`;

    button.addEventListener("click", () => {
      selectAnswer(index, button);
    });

    answersContainer.appendChild(button);
  });
}

function selectAnswer(index, selectedButton) {
  if (answerLocked) return;

  const item = questions[currentQuestion];

  if (index !== item.correct) {
    feedback.textContent = "not quite! give it another thought ♡";

    selectedButton.classList.add("wrong");

    // Let the player try another answer.
    // Incorrect choices do not lock the question.
    return;
  }

  answerLocked = true;
  selectedButton.classList.add("correct");

  answersContainer.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });

  feedback.textContent = "that's right! ♡";

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      beginEnding();
    }
  }, 700);
}

function beginEnding() {
  showScreen(loadingScreen);
  loadingText.textContent = "putting the pieces together...";

  setTimeout(() => {
    showScreen(endingScreen);
    startTyping();
  }, 2800);
}

function startTyping() {
  if (typingTimer) {
    clearTimeout(typingTimer);
  }

  typedMessage.textContent = "";
  cursor.style.display = "inline-block";

  let position = 0;

  function typeNextCharacter() {
    if (position >= finalMessage.length) {
      cursor.style.display = "none";
      return;
    }

    typedMessage.textContent += finalMessage.charAt(position);
    position++;

    // Slightly faster for spaces, while keeping the typewriter effect.
    const character = finalMessage.charAt(position - 1);
    const delay = character === "\n" ? 180 : 23;

    typingTimer = setTimeout(typeNextCharacter, delay);
  }

  typeNextCharacter();
}

// Floating sparkles and hearts: visual effects only, no audio.
function createSparkles() {
  const layer = document.getElementById("sparkles");
  const symbols = ["♡", "✧", "⋆", "♥", "✦"];

  for (let i = 0; i < 22; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = symbols[
      Math.floor(Math.random() * symbols.length)
    ];

    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 12}s`;
    sparkle.style.animationDuration = `${9 + Math.random() * 12}s`;
    sparkle.style.fontSize = `${10 + Math.random() * 13}px`;

    layer.appendChild(sparkle);
  }
}

createSparkles();
