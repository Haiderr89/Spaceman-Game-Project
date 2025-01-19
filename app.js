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
    }
];

/*-------------------------------- Variables --------------------------------*/
let secretWord = "";
let hint = "";
let incorrectGuesses = 0;
let guessedLetters = [];

/*------------------------ Cached Element References ------------------------*/
const gameModelElement = document.querySelector(".game-model");
const contentElement = gameModelElement.querySelector(".content");
const wordDisplayElement = document.querySelector(".word-display");
const guessesTextElement = document.querySelector(".guesses-text");
const keyboardElement = document.querySelector(".keyboard");
const playAgainButton = document.querySelector(".play-again");

/*----------------------------- Event Listeners -----------------------------*/
keyboardElement.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        handleGuess(button.textContent.toUpperCase());
    });
});

playAgainButton.addEventListener("click", initGame);

/*-------------------------------- Functions --------------------------------*/

// Function to initialize the game
function initGame() {
    
    // Reset game state
    const randomIndex = Math.floor(Math.random() * secretWords.length);
    secretWord = secretWords[randomIndex].word.toUpperCase();
    hint = secretWords[randomIndex].hint;

    incorrectGuesses = 0;
    guessedLetters = [];
    gameModelElement.style.display = "none";

    // Render initial state
    renderWordDisplay();
    renderGuessesText();
    enableKeyboard();
    hintFun()
}

//=================================
// Function to render the word display
function renderWordDisplay() {
    wordDisplayElement.innerHTML = ""; 

    for (let letter of secretWord) {
        const listItem = document.createElement("li");
        listItem.classList.add("letter");

        // Use if statement to determine the text content
        if (guessedLetters.includes(letter)) {
            listItem.textContent = letter;
        } else {
            listItem.textContent = ""; 
        }

        wordDisplayElement.appendChild(listItem);
    }
}

//=================================
// Function to render guesses text
function renderGuessesText() {
    guessesTextElement.innerHTML = `Incorrect guesses: <b>${incorrectGuesses} / ${max_incorrect_guesses}</b>`;
}


//=================================
// Function to handle letter guesses
function handleGuess(letter) {

    // Ignore if letter already guessed
    if (guessedLetters.includes(letter)) 
        return;

    guessedLetters.push(letter);

    // Check if the guessed letter is not in the secret word
    if (!secretWord.includes(letter)) {
        incorrectGuesses++;
    }
    
    
    renderWordDisplay();
    renderGuessesText();

    // Check for win or lose conditions
    if (incorrectGuesses === max_incorrect_guesses) {
        showGameOverModal();
    } else if (isWordGuessed()) {
        showWinModal();
    }
}

//=================================
// Function to check if the entire word has been guessed
function isWordGuessed() {
    return secretWord.split("").every(letter => guessedLetters.includes(letter));
}

//=================================
// Function to show the game over modal
function showGameOverModal() {
    contentElement.innerHTML = `
        <img src="images/lost.gif" alt="lost gif">
        <h4>Game Over!</h4>
        <p>The correct word was: <b>${secretWord}</b></p>
        <button class="play-again">Play Again!</button>
    `;
    gameModelElement.style.display = "flex";
    // disableKeyboard();
}

//=================================
// Function to show the win modal
function showWinModal() {
    contentElement.innerHTML = `
        <img src="images/victory.gif" alt="win gif">
        <h4>Congratulations!</h4>
        <p>You've guessed the word: <b>${secretWord}</b></p>
        <button class="play-again">Play Again!</button>
    `;
    gameModelElement.style.display = "flex";
    // disableKeyboard();
}

//=================================
// Function to disable the keyboard
// function disableKeyboard() {
//     keyboardElement.querySelectorAll("button").forEach(button => {
//         button.disabled = true;
//     });
// }

// //=================================
// // Function to enable the keyboard
// function enableKeyboard() {
//     keyboardElement.querySelectorAll("button").forEach(button => {
//         button.disabled = false;
//     });
// }


function hintFun() {
    contentElement.textContent = `Hint: ${secretWords.hint}`;
    gameModelElement.style.display = "flex";
    
}

/* Call initGame to start the game when the script runs */
initGame();
