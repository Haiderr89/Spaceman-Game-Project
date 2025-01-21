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
        word: "mountain",
        hint: "A large natural elevation of the Earth's surface."
    },
    {
        word: "painting",
        hint: "An art form using colors on a surface to create images or expression."
    },
    {
        word: "astronomy",
        hint: "The scientific study of celestial objects and phenomena."
    },
    {
        word: "football",
        hint: "A popular sport played with a spherical ball."
    },
    {
        word: "chocolate",
        hint: "A sweet treat made from cocoa beans."
    },
    {
        word: "butterfly",
        hint: "An insect with colorful wings and a slender body."
    },
    {
        word: "history",
        hint: "The study of past events and human civilization."
    },
    {
        word: "pizza",
        hint: "A savory dish consisting of a round, flattened base with toppings."
    }
];

/*-------------------------------- Variables --------------------------------*/
let secretWord = "";
let hint = "";
let incorrectGuesses = 0;
let guessedLetters = [];

/*------------------------ Cached Element References ------------------------*/
const wordDisplayElement = document.querySelector(".word-display");
const guessesTextElement = document.querySelector(".guesses-text b");
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

    //this is to random the words in the secretWords array 
    const randomIndex = Math.floor(Math.random() * secretWords.length);

    // stores the words in secretword using the random const with the hint
    secretWord = secretWords[randomIndex].word.toUpperCase();
    hint = secretWords[randomIndex].hint;

    //initial state
    incorrectGuesses = 0;
    guessedLetters = [];
    messageElement.textContent = "";

    renderWordDisplay();
    renderGuessesText();
    hintElement.textContent = hint;
    enableKeyboard();
}

/*-------------------------------- Function 2--------------------------------*/

// Here this function start displaying empty dashes, then added a for loop to 
// create li and giving it a class name of letter. 
function renderWordDisplay() {
    wordDisplayElement.innerHTML = "";
    for (let letter of secretWord) {
        const listItem = document.createElement("li");
        listItem.classList.add("letter");

        // Then it checks the guesses letter is in the word, if its here add it in the the listItem, else if not keep it empty.
        if (guessedLetters.includes(letter)) {
            listItem.textContent = letter;
        } else {
            listItem.textContent = "";
        }
        // This adds it into the html
        wordDisplayElement.appendChild(listItem);
    }
}


/*-------------------------------- Function 3--------------------------------*/
//this function adds in the HTML using innerHTML the number of incorrect guesses and max which is 6
function renderGuessesText() {
    guessesTextElement.innerHTML = `${incorrectGuesses} / ${max_incorrect_guesses}`;
}

/*-------------------------------- Function 4--------------------------------*/
function handleGuess(letter) {
    //to not be able to click a button you have already clicked 
    // if (guessedLetters.includes(letter))
    //     return;

    guessedLetters.push(letter);

    // Disable the clicked button
    disableButtonOnClick(letter);

    //if the letter pressed wrong increment the incorrect guesses
    if (!secretWord.includes(letter)) {
        incorrectGuesses++;
    }

    //call the functions to add the letter if correct or increment the wrong if wrong
    renderWordDisplay();
    renderGuessesText();

    //checks if you lost if the incorrect guesses are equal to 6 or won
    if (incorrectGuesses === max_incorrect_guesses) {
        showGameMessage(`You lost! The correct word was: ${secretWord}`);
    } else if (isWordGuessed()) {
        showGameMessage("Congrats, you won!");
    }
}

/*-------------------------------- Function 5--------------------------------*/
//now it splits the secretword and then checks if the letters pressed are available in the splited word
function isWordGuessed() {
    return secretWord.split("").every(letter => guessedLetters.includes(letter));
}

/*-------------------------------- Function 6--------------------------------*/
// this prints message 
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

/*-------------------------------- Function 9--------------------------------*/
function disableButtonOnClick(letter) {
    const button = document.getElementById(letter);
    if (button) {
        button.disabled = true;
    }
}

initGame();