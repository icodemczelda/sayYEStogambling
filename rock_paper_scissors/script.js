let userb = document.getElementById("userb");

function NameGen() {
    let namechoice1 = Math.floor(Math.random() * 9); // 0–10
    console.log(namechoice1)
    let name1;

    switch (namechoice1) {
        case 0:
            name1 = "Booger";
            break;
        case 1:
            name1 = "Pickle";
            break;
        case 2:
            name1 = "Waffle";
            break;
        case 3:
            name1 = "Banana";
            break;
        case 4:
            name1 = "Goblin";
            break;
        case 5:
            name1 = "Noodle";
            break;
        case 6:
            name1 = "Pancake";
            break;
        case 7:
            name1 = "Sausage";
            break;
        case 8:
            name1 = "Toilet";
            break;
        case 9:
            name1 = "Chicken";
            break;
        default:
            name1 = "Unknown";
    }

    let namechoice2 = Math.floor(Math.random() * 9); // 0–10
        console.log(namechoice2)
    let name2;

    switch (namechoice2) {
        case 0:
            name2 = "Sniffer";
            break;
        case 1:
            name2 = "Launcher";
            break;
        case 2:
            name2 = "Tickler";
            break;
        case 3:
            name2 = "Juggler";
            break;
        case 4:
            name2 = "Juggler";
            break;
        case 5:
            name2 = "Gobbler";
            break;
        case 6:
            name2 = "Nibbler";
            break;
        case 7:
            name2 = "Wiggler";
            break;
        case 8:
            name2 = "Licker";
            break;
        case 9:
            name2 = "Lover";
            break;
        default:
            name2 = "Unknown";
    }
    let namechoice3 = Math.floor(Math.random() * 1010); // 0–999
        console.log(namechoice3)
    let name3 = namechoice3;
    userb.textContent = name1+name2+name3;
}

NameGen();

// DOM Elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerHandEl = document.getElementById('player-hand');
const computerHandEl = document.getElementById('computer-hand');

const playerHandImg = playerHandEl.querySelector('img');
const computerHandImg = computerHandEl.querySelector('img');
const resultText = document.querySelector('.result p');
const computerButtons = document.querySelectorAll('.computerOptions .choice-btn');
const optionButtons = document.querySelectorAll('.options .choice-btn');
const gameContainer = document.querySelector('.game-container');

let playerScore = 0;
let computerScore = 0;
const choices = ['rock','paper','scissors']

function disableComputerButtons(disabled){
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const PlayerChoice = button.dataset.choice;
        playRound(PlayerChoice)
    });
});
}

disableComputerButtons(true);

function disablePlayerButtons(disabled){
    optionButtons.forEach(button => {
        button.disabled = disabled;
    });
}

function playRound(playerChoice){
    disablePlayerButtons(true);


    resultText.textContent = "Rock, Paper, Scissors...";


    // Reset hands to logo for the shake animation
    playerHandImg.src = './images/question.png';
    computerHandImg.src = './images/question.png';


    // Add shake animation class
    playerHandEl.classList.add('shake');
    computerHandEl.classList.add('shake');  



    setTimeout(() => {
        // Remove shake animation class
        playerHandEl.classList.remove('shake');
        computerHandEl.classList.remove('shake');   


        // Get computer's choice
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
	//how does this math work^ ? Think about what Math.random() does. 


        // Update hand images to show the actual choice
        playerHandImg.src = `images/${playerChoice}.png`;
        computerHandImg.src = `images/${computerChoice}.png`;


        // Determine the winner and update the UI
        const winner = determineWinner(playerChoice, computerChoice);


        updateScoreboard(winner);


        // Re-enable buttons after the round is complete
        disablePlayerButtons(false);
    }, 1600)
} 


function determineWinner(player, computer){
    if (player === computer) {
            return 'tie';
        }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}


function updateScoreboard(winner){
    // Clear previous win/loss effects
    gameContainer.classList.remove('player-wins-transform');
    gameContainer.classList.remove('computer-wins-transform');

    if (winner === 'player') {
        resultText.textContent = "You Win! 🎉";
        playerScore++;
        playerScoreEl.textContent = playerScore;


        // Trigger score bounce and card transform animations
        gameContainer.classList.add('player-wins-transform');
        playerHandEl.classList.add('score-update');
    } else if (winner == 'computer'){
        gameContainer.classList.add('computer-wins-transform');
        resultText.textContent = "You Lose!";
        computerScore++;
        computerScoreEl.textContent = computerScore;


        // Trigger score bounce animation
        computerScoreEl.classList.add('score-updated');
    } else{
        resultText.textContent = "It's a Tie! 🤝";
        gameContainer.classList.add('tie-wins-transform');
    }


    // Remove animation classes after they finish so they can be re-triggered
    setTimeout(() => {
        playerScoreEl.classList.remove('score-updated');
        computerScoreEl.classList.remove('score-updated');
    }, 500);


    setTimeout(() => {
         gameContainer.classList.remove('player-wins-transform');
         gameContainer.classList.remove('computer-wins-transform');
         gameContainer.classList.remove('tie-wins-transform');
    }, 1200);
}