const world_el = document.getElementById("word");
const popupCont = document.getElementById("popup-container");
const popup = document.querySelector(".popup");
const message_el = document.getElementById("success-message");
const selectedWord = getRandomWord();
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const playAgain = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];

function getRandomWord() {
  const words = ["javascript", "java", "python", "css", "html"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  world_el.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
            <div class='letter'>
                ${correctLetters.includes(letter) ? letter : " "}
            </div>
        `
          )
          .join("")}
    `;
  const w = world_el.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popupCont.style = "display : flex;";
    message_el.innerText = "Tebrikler Kazandınız !";
  }
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? `<h3>Hatalı Harfler</h3>` : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style = "display : flex;";
    } else {
      item.style = "display : none;";
    }
  });

  if (wrongLetters.length === items.length) {
    popupCont.style = "display : flex;";
    message_el.innerText = "Kaybettiniz !";
    popup.style = "background-color : red;";
  }
}

function dissplayMessage() {
  message.classList.add("show");

  setTimeout(function () {
    message.classList.remove("show");
  }, 2000);
}

function refreshPage() {
  window.location.reload();
}

playAgain.addEventListener("click", function () {
  refreshPage();
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 222) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        dissplayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        dissplayMessage();
      }
    }
  }
});
displayWord();
