// get HTML elements
const birdElement = document.getElementById('bird');
const startScreenElement = document.getElementById('startscreen');
const gameOverElement = document.getElementById('gameOver');
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

const finalScoreElement = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScoreDisplay');

// bird variables
let bird = {
    x:50,
    y:300,
    width: 40,
    height: 30,
    velocityY: 0,
    flapPower: -6,
    gravity: 0.1,
}

// easy controls: grav:0.2, pipeGap: 300

//game state variables
let gameRunning = false;
let pipes = []; 
let frameCount = 0;
let playerClicked = false;

let score = 0;
let highScore = 0;

const pipeGap = 250; //vertical gap height between pipes
const pipeWidth = 1;
const gameHeight = 600;  //how high our game is
const gameWidth = 400;  //how width our game is
const pipeSpeed = 2;
const pipeSpawnInterval = 240;

document.addEventListener('keydown', function(e){
    if(e.code === 'Space' && gameRunning) {
        bird.velocityY = bird.flapPower;
        playerClicked = true;

        console.log("fart");
    }
})
function updateBird() {
    
    bird.velocityY += bird.gravity; //adding gravity makes it fall faster, computers work like that
    bird.y += bird.velocityY;

    birdElement.style.top = bird.y + 'px';
}

function createPipes() {
    const gapTop = Math.random() * (gameHeight-pipeGap-100)+50; //making pipe gap, not too low or high

    const topPipe = document.createElement('div');
        topPipe.className = 'pipe'; //names div pipe to reference in css
        topPipe.style.height = gapTop + 'px'; //took our value
        topPipe.style.top =  '0px';
        topPipe.style.left = gameWidth -200 + 'px'; //pushing 400px left to spawn off screen

    const bottomPipe = document.createElement('div')
        bottomPipe.className = 'pipe'; //names div pipe to reference in css
        bottomPipe.style.height = gameHeight - gapTop - pipeGap + 'px'; //took our value
        bottomPipe.style.top =  gapTop + pipeGap + 'px';
        bottomPipe.style.left = gameWidth -200 + 'px'; //pushing 400px left to spawn off screen   

    gameContainer.appendChild(topPipe); //append = add on to
    gameContainer.appendChild(bottomPipe);

    //object is grouping of data

    pipes.push({ //this is an object
        x:gameWidth,
        topElement:topPipe,
        bottomElement:bottomPipe,
        passed: false //whether you have passed pipe or not
    });
}

function updatePipes() {
    for(let i = pipes.length - 1; i>= 0; i--) {
        let p = pipes[i];

        p.x -= pipeSpeed;
        p.topElement.style.left = p.x + 'px';
        p.bottomElement.style.left = p.x + 'px';

        if(!p.passed && p.x + pipeWidth < bird.x)  {
            p.passed = true;
            score += 1;
            scoreElement.textContent = score;
        }

        if(p.x + pipeWidth < 0) {
            p.topElement.remove();
            p.bottomElement.remove();
            pipes.splice(i,1);
        }
    }

    if(frameCount % pipeSpawnInterval === 0) { //% gives remainder
        createPipes();
    }
}


function checkCollisions () {
    if(bird.y < 0 || bird.y + bird.height > gameHeight) {
        gameOver();
        return;
    }

    for(let p of pipes) {
        const pipeTopHeight = parseFloat(p.topElement.style.height);
        const pipeBottomHeight = parseFloat(p.bottomElement.style.top);

        const birdCollidesWithPipe =
            bird.x < p.x + pipeWidth &&
            bird.x + bird.width > p.x &&
            (bird.y < pipeTopHeight || bird.y + bird.height > pipeBottomHeight);

            if (birdCollidesWithPipe) {
                gameOver();
                return;
            }
    }
}

function gameOver () {
    gameRunning = false;
    if (score > highScore) {
        highScore = score;
    }
    finalScoreElement.textContent = score;
    highScoreDisplay.textContent = highScore;
    gameOverElement.style.display = 'block';
}
function gameLoop() {
    if(!gameRunning) {return;} // if game isnt running, dont loop it
    if(playerClicked) {
        frameCount++
        updateBird();
        updatePipes();

        console.log("nick")
        checkCollisions();
    }

    requestAnimationFrame(gameLoop);
}

function startGame() {

    startScreenElement.style.display = 'none';
    gameOverElement.style.display = 'none';

    bird.y = 300;
    bird.velocityY = 0;
    score = 0;
    frameCount = 0;

    
    scoreElement.textContent = '0'

    document.querySelectorAll('.pipe').forEach(p=>p.remove());
    pipes = [];


    gameRunning = true;
    birdElement.style.top = bird.y + 'px';
    playerClicked = false;
    gameLoop(); 
}




gameLoop();