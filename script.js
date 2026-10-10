
 // ==========================================
 // FINAL MESSAGE — EDIT THIS PART IF NEEDED
 // ==========================================

const finalTitle = "YOUR FREE TRIAL HAS EXPIRED 💔";

const finalMessage = `hey gorgeous 💋

your free trial of this situationship has officially expired.

to continue your subscription, please pay $1,000 a week.

no refunds. ♡`;

// ==========================================
// THE 8 RELATIONSHIP QUESTIONS
// ==========================================

const questions = [
  {
    question: "what matters most in a relationship? 💋",
    description: "every relationship is different. what do you think matters most?",
    answers: [
      "♡ trust and honesty",
      "♡ communication",
      "♡ effort from both people"
    ]
  },
  {
    question: "can you love someone and still not be right for them? 🖤",
    description: "sometimes feelings and compatibility aren't the same thing...",
    answers: [
      "♡ yes, absolutely",
      "♡ sometimes, yeah",
      "♡ it depends on the people"
    ]
  },
  {
    question: "words or actions? 💌",
    description: "which one means more when someone says they care about you?",
    answers: [
      "♡ words that make you feel loved",
      "♡ actions that prove it",
      "♡ both gotta match"
    ]
  },
  {
    question: "what if someone's feelings change? 🎀",
    description: "feelings can change, even when nobody planned for them to.",
    answers: [
      "♡ be honest about it",
      "♡ talk it through together",
      "♡ don't lead someone on"
    ]
  },
  {
    question: "is it fair to stay when your heart isn't in it? 💔",
    description: "think about how honesty affects both people.",
    answers: [
      "♡ no, both deserve honesty",
      "♡ only if you're working things out",
      "♡ it's better to communicate first"
    ]
  },
  {
    question: "can a relationship teach you something even if it ends? 🦋",
    description: "not every connection lasts forever, but experiences can still matter.",
    answers: [
      "♡ yes, you learn about yourself",
      "♡ definitely, every experience matters",
      "♡ yes, even the difficult ones"
    ]
  },
  {
    question: "what's a sign of a healthy relationship? 💗",
    description: "what makes a relationship feel safe and genuine?",
    answers: [
      "♡ trust and respect",
      "♡ feeling heard and understood",
      "♡ both people putting in effort"
    ]
  },
  {
    question: "one last question, pretty girl... ✨",
    description: "do you think it's important to be honest with someone, even when the truth is difficult?",
    answers: [
      "♡ yes, honesty matters",
      "♡ yes, even when it's hard",
      "♡ definitely, everyone deserves clarity"
    ]
  }
];

// ==========================================
// GAME ENGINE
// ==========================================

const questionEl = document.getElementById("question");
const descriptionEl = document.getElementById("description");
const choicesEl = document.getElementById("choices");
const finalScreen = document.getElementById("finalMessage");
const typedMessage = document.getElementById("typedMessage");
const finalTitleEl = document.getElementById("finalTitle");
const progressFill = document.getElementById("progressFill");
const stepLabel = document.getElementById("stepLabel");
const eyebrow = document.getElementById("eyebrow");
const pixelHeart = document.querySelector(".pixel-heart");

let typingTimer = null;

function showQuestion(index) {
  if (index >= questions.length) {
    showEnding();
    return;
  }

  const item = questions[index];

  questionEl.textContent = item.question;
  descriptionEl.textContent = item.description;

  eyebrow.textContent = "✧ RELATIONSHIP QUIZ.EXE ✧";

  choicesEl.innerHTML = "";
  choicesEl.classList.remove("hidden");

  item.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");

    button.className =
      answerIndex === 0 ? "choice" : "choice secondary";

    button.textContent = answer;

    button.addEventListener("click", () => {
      showQuestion(index + 1);
    });

    choicesEl.appendChild(button);
  });

  progressFill.style.width =
    `${((index + 1) / questions.length) * 100}%`;

  stepLabel.textContent =
    `QUESTION ${String(index + 1).padStart(2, "0")} / 08`;

  questionEl.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 350, easing: "ease-out" }
  );
}

function showEnding() {
  clearInterval(typingTimer);

  progressFill.style.width = "100%";
  stepLabel.textContent = "FINAL MESSAGE ♡";

  questionEl.classList.add("hidden");
  descriptionEl.classList.add("hidden");
  choicesEl.classList.add("hidden");
  pixelHeart.classList.add("hidden");
  eyebrow.classList.add("hidden");

  finalScreen.classList.remove("hidden");
  finalTitleEl.textContent = finalTitle;

  typedMessage.textContent = "";
  typedMessage.classList.add("typing");

  let position = 0;

  typingTimer = setInterval(() => {
    if (position >= finalMessage.length) {
      clearInterval(typingTimer);
      typedMessage.classList.remove("typing");
      return;
    }

    typedMessage.textContent += finalMessage.charAt(position);
    position++;
  }, 28);
}

// ==========================================
// FLOATING Y2K HEARTS AND SPARKLES
// ==========================================

const sparkleContainer = document.getElementById("sparkles");
const sparkleSymbols = ["✦", "♡", "✧", "⋆", "♥"];

function makeSparkle() {
  const sparkle = document.createElement("span");

  sparkle.className = "sparkle";

  sparkle.textContent =
    sparkleSymbols[
      Math.floor(Math.random() * sparkleSymbols.length)
    ];

  sparkle.style.left = Math.random() * 100 + "vw";

  sparkle.style.fontSize =
    (10 + Math.random() * 14) + "px";

  sparkle.style.animationDuration =
    (7 + Math.random() * 8) + "s";

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 16000);
}

for (let i = 0; i < 12; i++) {
  setTimeout(makeSparkle, i * 350);
}

setInterval(makeSparkle, 850);

// ==========================================
// START THE GAME
// ==========================================

showQuestion(0);
