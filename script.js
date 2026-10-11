
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
    question: "what should you do when something feels wrong? 💌",
    hint: "communication is key...",
    answers: [
      "pretend nothing happened",
      "talk honestly about your feelings",
      "ignore the other person"
    ],
    correct: 1
  },
  {
    question: "what does trust mean in a relationship? 🎀",
    hint: "think about what builds a connection",
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
    hint: "sometimes things get complicated...",
    answers: [
      "hide it forever",
      "be honest and communicate",
      "make promises you don't mean"
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

const $ = id => document.getElementById(id);

const content = document.querySelector(".content");
const welcome = $("welcome");
const questionTemplate = $("questionScreen");
const loading = $("loading");
const ending = $("ending");

let currentQuestion = 0;
let locked = false;
let typingTimer = null;
let loadingTimer = null;
let messageInterval = null;
const questionScreens = [];

/* BUILD EIGHT SEPARATE QUESTION SCREENS */
questions.forEach((question, index) => {
  const screen = questionTemplate.cloneNode(true);

  screen.id = `question-screen-${index + 1}`;
  screen.classList.remove("active");

  screen.querySelector("#questionCount").id =
    `questionCount-${index}`;
  screen.querySelector("#progressBar").id =
    `progressBar-${index}`;
  screen.querySelector("#questionText").id =
    `questionText-${index}`;
  screen.querySelector("#questionHint").id =
    `questionHint-${index}`;
  screen.querySelector("#answers").id =
    `answers-${index}`;
  screen.querySelector("#feedback").id =
    `feedback-${index}`;

  content.insertBefore(screen, loading);
  questionScreens.push(screen);
});

questionTemplate.remove();

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(item => {
    item.classList.remove("active");
  });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

$("startBtn").addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
  showScreen(questionScreens[0]);
});

function renderQuestion() {
  locked = false;

  const question = questions[currentQuestion];
  const screen = questionScreens[currentQuestion];

  const count = screen.querySelector(
    `#questionCount-${currentQuestion}`
  );
  const bar = screen.querySelector(
    `#progressBar-${currentQuestion}`
  );
  const text = screen.querySelector(
    `#questionText-${currentQuestion}`
  );
  const hint = screen.querySelector(
    `#questionHint-${currentQuestion}`
  );
  const answers = screen.querySelector(
    `#answers-${currentQuestion}`
  );
  const feedback = screen.querySelector(
    `#feedback-${currentQuestion}`
  );

  count.textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 08`;

  bar.style.width = `${(currentQuestion / questions.length) * 100}%`;

  text.textContent = question.question;
  hint.textContent = question.hint;
  feedback.textContent = "";
  answers.replaceChildren();

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-btn";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answer}`;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answers.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (locked) return;

  const question = questions[currentQuestion];
  const screen = questionScreens[currentQuestion];

  const answers = screen.querySelector(
    `#answers-${currentQuestion}`
  );
  const feedback = screen.querySelector(
    `#feedback-${currentQuestion}`
  );
  const bar = screen.querySelector(
    `#progressBar-${currentQuestion}`
  );

  const buttons = answers.querySelectorAll("button");

  if (selectedIndex !== question.correct) {
    feedback.textContent = "not quite, try again! ♡";
    buttons[selectedIndex].classList.add("wrong");
    buttons[selectedIndex].disabled = true;
    return;
  }

  locked = true;
  buttons[selectedIndex].classList.add("correct");

  buttons.forEach(button => {
    button.disabled = true;
  });

  feedback.textContent = "correct! you're doing great 💗";
  bar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  window.setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();

      /* SWITCH TO A DIFFERENT SCREEN ELEMENT */
      showScreen(questionScreens[currentQuestion]);
    } else {
      beginEnding();
    }
  }, 650);
}

function beginEnding() {
  showScreen(loading);

  const messages = [
    "analyzing your answers... ♡",
    "preparing your results... 💌",
    "almost ready... 💗"
  ];

  let index = 0;
  $("loadingText").textContent = messages[0];

  messageInterval = window.setInterval(() => {
    index++;

    if (index < messages.length) {
      $("loadingText").textContent = messages[index];
    }
  }, 800);

  loadingTimer = window.setTimeout(() => {
    window.clearInterval(messageInterval);
    messageInterval = null;

    showScreen(ending);
    startTyping();
  }, 2800);
}

function startTyping() {
  if (typingTimer) {
    window.clearTimeout(typingTimer);
  }

  const output = $("typedMessage");
  const cursor = $("cursor");

  output.textContent = "";
  cursor.style.display = "inline-block";

  let index = 0;

  function typeNext() {
    if (index >= finalMessage.length) {
      cursor.style.display = "none";
      return;
    }

    output.textContent += finalMessage[index];

    const delay = finalMessage[index] === "\n" ? 180 : 23;
    index++;

    typingTimer = window.setTimeout(typeNext, delay);
  }

  typeNext();
}

/* FLOATING PINK SPARKLES — NO SOUND EFFECTS */
function createSparkles() {
  const layer = $("sparkles");
  const symbols = ["♡", "✧", "♥", "⋆", "✦"];

  for (let i = 0; i < 22; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = symbols[i % symbols.length];
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${12 + Math.random() * 15}px`;
    sparkle.style.animationDuration = `${7 + Math.random() * 10}s`;
    sparkle.style.animationDelay = `${Math.random() * 10}s`;

    layer.appendChild(sparkle);
  }
}

createSparkles();
