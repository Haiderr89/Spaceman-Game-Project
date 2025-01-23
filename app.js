/*-------------------------------- Constants --------------------------------*/
const max_incorrect_guesses = 6;
const secretWords = [
    {
        word: "guitar",
        hint: "A string instrument you play with your hands."
    },
    {
        word: "oxygen",
        hint: "The air we need to breathe."
    },
    {
        word: "mountain",
        hint: "A very big hill."
    },
    {
        word: "painting",
        hint: "A picture made with colors."
    },
    {
        word: "football",
        hint: "A game played with a ball on a field."
    },
    {
        word: "chocolate",
        hint: "A sweet treat made from cocoa."
    },
    {
        word: "butterfly",
        hint: "A colorful insect with wings."
    },
    {
        word: "history",
        hint: "Stories about the past."
    },
    {
        word: "pizza",
        hint: "A flat bread with toppings like cheese."
    },
    {
        word: "camera",
        hint: "A device to take pictures."
    },
    {
        word: "diamond",
        hint: "A shiny and expensive stone."
    },
    {
        word: "bicycle",
        hint: "A vehicle with two wheels you pedal."
    },
    {
        word: "sunset",
        hint: "When the sun goes down."
    },
    {
        word: "coffee",
        hint: "A drink that wakes you up."
    },
    {
        word: "dance",
        hint: "Moving your body to music."
    },
    {
        word: "galaxy",
        hint: "A group of stars in space."
    },
    {
        word: "waterfall",
        hint: "Water falling from a high place."
    },
    {
        word: "rainbow",
        hint: "A colorful arc in the sky after rain."
    },
    {
        word: "piano",
        hint: "A musical instrument with keys."
    },
    {
        word: "vacation",
        hint: "A time to relax or travel."
    },
    {
        word: "rainforest",
        hint: "A forest with lots of rain and trees."
    },
    {
        word: "theater",
        hint: "A place where you watch plays or movies."
    },
    {
        word: "telephone",
        hint: "A device used to talk to someone far away."
    },
    {
        word: "desert",
        hint: "A very dry and sandy place."
    },
    {
        word: "sunflower",
        hint: "A tall yellow flower."
    },
    {
        word: "fantasy",
        hint: "A made-up story with magic."
    },
    {
        word: "telescope",
        hint: "A tool to see faraway stars."
    },
    {
        word: "safari",
        hint: "A trip to see wild animals."
    },
    {
        word: "planet",
        hint: "A round object in space like Earth."
    },
    {
        word: "river",
        hint: "A large stream of water."
    },
    {
        word: "shadow",
        hint: "A dark shape made by blocking light."
    },
    {
        word: "secret",
        hint: "Something hidden from others."
    },
    {
        word: "curiosity",
        hint: "Wanting to learn or know more."
    },
    {
        word: "brilliant",
        hint: "Very smart or bright."
    }
];


const images = ["./images/0.png", "./images/1.png", "./images/2.png", "./images/3.png", "./images/4.png", "./images/5.png", "./images/6.png"];

/*-------------------------------- Variables --------------------------------*/
let secretWord = "";
let hint = "";
let incorrectGuesses = 0;
let guessedLetters = [];
let imageIndx = 0;

/*------------------------ Cached Element References ------------------------*/
const wordDisplayElement = document.querySelector(".word-display");
const guessesTextElement = document.querySelector(".guesses-text b");
const keyboardElement = document.querySelector(".keyboard");
const playAgainButton = document.querySelector(".play-again");
const hintElement = document.querySelector(".hint-text b");
const messageElement = document.querySelector(".gameMessage p");
const imageElement = document.querySelector(".hangman-box img");

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

    //initial state resets
    incorrectGuesses = 0;
    guessedLetters = [];
    messageElement.textContent = "";
    imageIndx = 0;
    imageElement.src = images[imageIndx];

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
    guessedLetters.push(letter);

    // Disable the clicked button
    disableButtonOnClick(letter);

    //if the letter pressed wrong increment the incorrect guesses
    if (!secretWord.includes(letter)) {
        incorrectGuesses++;
        changeImage();
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

/*-------------------------------- Function 10--------------------------------*/
function changeImage() {
    imageIndx++;
    imageElement.src = images[imageIndx];

}

initGame();