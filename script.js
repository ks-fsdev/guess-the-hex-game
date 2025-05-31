const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

let correctHex = "";
let correctAnswer = null;

let score = 0;
let attempt = 0;
let userWin;
let userLose;
let lightMode = true;

//extracting
const newHex = document.querySelector(".colorCode");
const nextBtn = document.querySelector(".nextBtn");
const main = document.querySelector("main");
const question = document.querySelector(".question");
const newGameBtn = document.querySelector(".newGameBtn");
const scoreText = document.querySelector(".score");
const attemptText = document.querySelector(".attempt");
const result = document.querySelector(".result");
const mobResetGameBtn = document.querySelector(".newGameBtn-mob");
const toggleBtn = document.getElementById("toggleBtn");

//extrtacting options div
const opt1 = document.querySelector(".opt1");
const opt2 = document.querySelector(".opt2");
const opt3 = document.querySelector(".opt3");
const opt4 = document.querySelector(".opt4");
const opt5 = document.querySelector(".opt5");

//creating an array for options div to choose at random
const options = [opt1, opt2, opt3, opt4, opt5];

//constant theme applyer

const applyTheme = (isLight) => {
  lightMode = isLight;

  //set body acc to theme
  document.body.classList.toggle("dark-theme", !isLight);

  // Sync toggle switch
  toggleSwitch.checked = !isLight;

  // Sync toggle button state and text
  toggleBtn.classList.toggle("active", !isLight);
  toggleBtn.textContent = isLight ? "LIGHT MODE" : "DARK MODE";

  // (Optional) Save theme to localStorage
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

// ✅ On load: set theme from saved preference
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved) applyTheme(saved === "light");
});

// ✅ Toggle switch event
toggleSwitch.addEventListener("change", () => {
  applyTheme(!toggleSwitch.checked);
});

// ✅ Button event
toggleBtn.addEventListener("click", () => {
  applyTheme(!lightMode);
});

// ✅ Result display (your existing function)
const resultDisplay = () => {
  result.style.display = "block";
  const isDark = document.body.classList.contains("dark-theme");

  if (userWin) {
    result.innerText = "You Won!";
    result.style.color = isDark ? "#00ff00" : "#0B642C";
  } else if (userLose) {
    result.innerText = "You Lose";
    result.style.color = isDark ? "#ff0000" : "#6c1111";
  }

  result.style.backgroundColor = isDark ? "#2b2b34" : "#f9eccc";
};

//added js
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
});

//creating random hex
const randomHex = () => {
  hexColor = "#";
  for (i = 0; i < 6; i++) {
    hexColor += hex[randomNumberHex()];
  }
  return hexColor;
};

//reset function
const reset = () => {
  options.forEach((option) => {
    option.style.backgroundColor = "black";
    option.style.border = "none";
    question.style.backgroundColor = "black";
    question.style.color = "white";
    result.style.addProperty = "display";
    result.style.display = "none";
  });
};

//reset next button
const fullReset = () => {
  nextBtn.innerText = "Start";
  attempt = 0;
  score = 0;
  attemptText.innerText = attempt;
  scoreText.innerText = score;
  newHex.innerText = "#000000";
};

//newgame button reset
newGameBtn.addEventListener("click", () => {
  reset();
  fullReset();
});

//newgame button reset
mobResetGameBtn.addEventListener("click", () => {
  reset();
  fullReset();
});

//enable disble btn function
const disableBtn = (element) => {
  element.setAttribute("disabled", true);
  element.style.opacity = "0.7";
};
const enableBtn = (element) => {
  element.removeAttribute("disabled");
  element.style.opacity = "1";
};

//enable disable divisions
const disableElement = (element) => {
  element.style.pointerEvents = "none";
  element.style.opacity = "0.9";
};

const enableElement = (element) => {
  element.style.pointerEvents = "auto";
  element.style.opacity = "1";
};

//creating random number for hex
const randomNumberHex = () => {
  return Math.floor(Math.random() * hex.length);
};

//creating random number for opt
const randomNumberOptions = () => {
  return Math.floor(Math.random() * options.length);
};

//adding eventlinstner to hex#
nextBtn.addEventListener("click", () => {
  reset();

  disableBtn(nextBtn);
  options.forEach((option) => {
    enableElement(option);
  });

  attempt++;

  nextBtn.innerText = "Next";
  correctHex = randomHex();
  newHex.textContent = correctHex;

  correctAnswer = options[randomNumberOptions()];
  correctAnswer.style.backgroundColor = correctHex;
  attemptText.innerText = attempt;

  //other options
  options.forEach((option) => {
    option.style.backgroundColor =
      option === correctAnswer ? correctHex : randomHex();

    option.style.border = "2px solid transparent";
  });
});

//selected option
options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((option) => {
      disableElement(option);
    });

    enableBtn(nextBtn);
    checkAnswer(option);
  });
});

//checking answer

const checkAnswer = (selectedOpt) => {
  if (selectedOpt === correctAnswer) {
    correctAnswerChange();
  } else {
    wrongAnswerChange();
  }
};

//correct answer function
const correctAnswerChange = () => {
  question.style.backgroundColor = correctHex;
  question.style.color = getContrastColor(correctHex);
  correctAnswer.style.border = "2px solid black";

  score++;
  scoreText.innerText = score;

  userWin = true;
  userLose = null;
  resultDisplay();
};

//wrong answer function
const wrongAnswerChange = () => {
  question.style.backgroundColor = correctHex;
  question.style.color = getContrastColor(correctHex);
  correctAnswer.style.border = "2px solid black";

  userLose = true;
  userWin = null;
  resultDisplay();
};

// Function to calculate contrast color (black or white)
const getContrastColor = (hex) => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};
