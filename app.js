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
    },
    {
        word: "camera",
        hint: "A device used to capture and record images or videos."
    },
    {
        word: "diamond",
        hint: "A precious gemstone known for its brilliance and hardness."
    },
    {
        word: "adventure",
        hint: "An exciting or daring experience."
    },
    {
        word: "science",
        hint: "The systematic study of the structure and behavior of the physical and natural world."
    },
    {
        word: "bicycle",
        hint: "A human-powered vehicle with two wheels."
    },
    {
        word: "sunset",
        hint: "The daily disappearance of the sun below the horizon."
    },
    {
        word: "coffee",
        hint: "A popular caffeinated beverage made from roasted coffee beans."
    },
    {
        word: "dance",
        hint: "A rhythmic movement of the body often performed to music."
    },
    {
        word: "galaxy",
        hint: "A vast system of stars, gas, and dust held together by gravity."
    },
    {
        word: "orchestra",
        hint: "A large ensemble of musicians playing various instruments."
    },
    {
        word: "volcano",
        hint: "A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected."
    },
    {
        word: "novel",
        hint: "A long work of fiction, typically with a complex plot and characters."
    },
    {
        word: "symphony",
        hint: "A long musical composition for a full orchestra, typically in multiple movements."
    },
    {
        word: "architecture",
        hint: "The art and science of designing and constructing buildings."
    },
    {
        word: "ballet",
        hint: "A classical dance form characterized by precise and graceful movements."
    },
    {
        word: "astronaut",
        hint: "A person trained to travel and work in space."
    },
    {
        word: "waterfall",
        hint: "A cascade of water falling from a height."
    },
    {
        word: "technology",
        hint: "The application of scientific knowledge for practical purposes."
    },
    {
        word: "rainbow",
        hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light."
    },
    {
        word: "universe",
        hint: "All existing matter, space, and time as a whole."
    },
    {
        word: "piano",
        hint: "A musical instrument played by pressing keys that cause hammers to strike strings."
    },
    {
        word: "vacation",
        hint: "A period of time devoted to pleasure, rest, or relaxation."
    },
    {
        word: "rainforest",
        hint: "A dense forest characterized by high rainfall and biodiversity."
    },
    {
        word: "theater",
        hint: "A building or outdoor area in which plays, movies, or other performances are staged."
    },
    {
        word: "telephone",
        hint: "A device used to transmit sound over long distances."
    },
    {
        word: "language",
        hint: "A system of communication consisting of words, gestures, and syntax."
    },
    {
        word: "desert",
        hint: "A barren or arid land with little or no precipitation."
    },
    {
        word: "sunflower",
        hint: "A tall plant with a large yellow flower head."
    },
    {
        word: "fantasy",
        hint: "A genre of imaginative fiction involving magic and supernatural elements."
    },
    {
        word: "telescope",
        hint: "An optical instrument used to view distant objects in space."
    },
    {
        word: "photography",
        hint: "The art, process, or practice of creating images by recording light or other electromagnetic radiation."
    },
    {
        word: "safari",
        hint: "An expedition or journey, typically to observe wildlife in their natural habitat."
    },
    {
        word: "planet",
        hint: "A celestial body that orbits a star and does not produce light of its own."
    },
    {
        word: "river",
        hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another such stream."
    },
    {
        word: "tropical",
        hint: "Relating to or situated in the region between the Tropic of Cancer and the Tropic of Capricorn."
    },
    {
        word: "mysterious",
        hint: "Difficult or impossible to understand, explain, or identify."
    },
    {
        word: "enigma",
        hint: "Something that is mysterious, puzzling, or difficult to understand."
    },
    {
        word: "puzzle",
        hint: "A game, toy, or problem designed to test ingenuity or knowledge."
    },
    {
        word: "whisper",
        hint: "To speak very softly or quietly, often in a secretive manner."
    },
    {
        word: "shadow",
        hint: "A dark area or shape produced by an object blocking the light."
    },
    {
        word: "secret",
        hint: "Something kept hidden or unknown to others."
    },
    {
        word: "curiosity",
        hint: "A strong desire to know or learn something."
    },
    {
        word: "unpredictable",
        hint: "Not able to be foreseen or known beforehand; uncertain."
    },
    {
        word: "brilliant",
        hint: "Exceptionally clever, talented, or impressive."
    },
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
//now it splits the secretword and then checks if the letters pressed are available in the splited word
function isWordGuessed() {
    return secretWord.split("").every(letter => guessedLetters.includes(letter));
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
//this function adds in the HTML using innerHTML the number of incorrect guesses and max which is 6
function renderGuessesText() {
    guessesTextElement.innerHTML = `${incorrectGuesses} / ${max_incorrect_guesses}`;
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