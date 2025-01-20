/*-------------------------------- Constants --------------------------------*/
const max_incorrect_guesses = 6;
const secretWords = [
    { 
        word: "guitar", 
        hint: "A musical instrument with strings." 
    },
    { 
        word: "oxygen", 
        hint: "A colorless, odorless gas essential for life."
    },
    { 
        word: "car", 
        hint: "A common mode of transportation." 
    }
];

/*-------------------------------- Variables --------------------------------*/
let secretWord = "";
let hint = "";
let incorrectGuesses = 0;
let guessedLetters = [];

/*------------------------ Cached Element References ------------------------*/
const wordDisplayElement = document.querySelector(".word-display");
const guessesTextElement = document.querySelector(".guesses-text");
const keyboardElement = document.querySelector(".keyboard");
const playAgainButton = document.querySelector(".play-again");
const hintElement = document.querySelector(".hint-text b");
const messageElement = document.querySelector(".gameMessage p");

/*----------------------------- Event Listeners -----------------------------*/
keyboardElement.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        handleGuess(button.textContent.toUpperCase());
    });
});

playAgainButton.addEventListener("click", initGame);

/*-------------------------------- Function 1--------------------------------*/
function initGame() {
    const randomIndex = Math.floor(Math.random() * secretWords.length);
    secretWord = secretWords[randomIndex].word.toUpperCase();
    hint = secretWords[randomIndex].hint;

    incorrectGuesses = 0;
    guessedLetters = [];
    messageElement.textContent = "";

    renderWordDisplay();
    renderGuessesText();
    hintElement.textContent = hint;
    enableKeyboard();
}

/*-------------------------------- Function 2--------------------------------*/
function renderWordDisplay() {
    wordDisplayElement.innerHTML = "";
    for (let letter of secretWord) {
        const listItem = document.createElement("li");
        listItem.classList.add("letter");
        listItem.textContent = guessedLetters.includes(letter) ? letter : "";
        wordDisplayElement.appendChild(listItem);
    }
}

/*-------------------------------- Function 3--------------------------------*/
function renderGuessesText() {
    guessesTextElement.innerHTML = `Incorrect guesses: <b>${incorrectGuesses} / ${max_incorrect_guesses}</b>`;
}


/*-------------------------------- Function 4--------------------------------*/
function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (!secretWord.includes(letter)) {
        incorrectGuesses++;
    }

    renderWordDisplay();
    renderGuessesText();

    if (incorrectGuesses === max_incorrect_guesses) {
        showGameMessage(`You lost! The correct word was: ${secretWord}`);
    } else if (isWordGuessed()) {
        showGameMessage("Congrats, you won!");
    }
}

/*-------------------------------- Function 5--------------------------------*/
function isWordGuessed() {
    return secretWord.split("").every(letter => guessedLetters.includes(letter));
}

/*-------------------------------- Function 6--------------------------------*/
function showGameMessage(message) {
    messageElement.textContent = message;
    disableKeyboard();
}

/*-------------------------------- Function 7--------------------------------*/
function enableKeyboard() {
    keyboardElement.querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });
}

/*-------------------------------- Function 8--------------------------------*/
function disableKeyboard() {
    keyboardElement.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}

initGame();