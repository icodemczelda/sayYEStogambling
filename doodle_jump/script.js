const gameWidth = 400;
const gameHeight = 600;

let score = 0;
let gameRunning = false;
let platforms = []
let platformGap = 90;
let camera = 0;
let baseJumpPower = -5;
let player = {
    x: 175,
    y:450,
    width:50,
    height:50,
    velocityY:0,
    velocityX:6,
    jumpPower: baseJumpPower,
    gravityStrength:0.1,
};

let moveLeft = false;
let moveRight = false;

const playerElement = document.getElementById('player');
const scoreElement =  document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startScreenElement = document.getElementById('startscreen');
const gameContainer = document.getElementById('gameContainer');

function createPlatform(x,y) { 
    // a block of code that we can call on
    const isBreakable = Math.random() < 0.20;
    const isBouncing = Math.random() < 0.10;
    const isSpace = Math.random() < 0.005;
    const platform = {
        x:x,
        y: y,
        width: Math.random()*40+50,
        height: 15,
        element:null,
        isBreakable: isBreakable,
        isBouncing: isBouncing,
        isSpace: isSpace,
        isBroken: false
    };
    const platformElement = document.createElement('div'); //creates div
    platformElement.className = 'platform'; //gives div platform class
    if (platform.isBreakable) {
        platformElement.classList.add('breaking-platform');
    }

    if (platform.isBouncing) {
        platformElement.classList.add('bouncing-platform');
    }
     if (platform.isSpace) {
        platformElement.classList.add('space-platform');
    }

    platformElement.style.width = platform.width;
    platformElement.style.left = platform.x + 'px';
    platformElement.style.top = platform.y + 'px';
    gameContainer.appendChild(platformElement);


    platform.element = platformElement;
    return platform;

}

function initializePlatforms() {
    platforms = [];

    // for (let i=0; i<3; i++) {
    //     const x= Math.random() * (gamewidth -70);
    //     const y = i*90+50;
    //     let newPlatform = createPlatform(x,y);
    //     newPlatform.width = 70;
    //     newPlatform.element.width = width;
    //     platforms.push(newPlatform);
    // }

    for (let i=0; i<7; i++) {
        const x= Math.random() * (gameWidth -70);
        const y = i*platformGap+50;
        platforms.push(createPlatform(x,y));
    }

    platforms.push(createPlatform(player.x-10, player.y+player.height))
}

function startGame() {

    let startScreen = document.getElementById("startscreen"); //gets start screen from HTML

    startScreen.hidden = true;
    gameOverElement.style.display = 'none';
    player.jumpPower = baseJumpPower;
    player.x = 175
    player.y = 450
    player.velocityY = 0;
    score = 0;
    camera = 0;
     document.querySelectorAll('.platform').forEach(p => p.remove())
    
     initializePlatforms();

     gameRunning = true;
     gameLoop(); 
}


document.addEventListener('keydown', function (e) {
    const key = e.key
    if (!gameRunning) return;

    if (key == 'ArrowLeft' || key == 'a') 
    {
        console.log("MoveLeft Pressed");
        moveLeft = true
    }
     else if (key == 'ArrowRight' || key == 'd') 
    {
        console.log("MoveRight Pressed");
        moveRight = true;
    }

});

document.addEventListener('keyup', function (e){
    const key = e.key
    if (!gameRunning) return;

    if (key == 'ArrowLeft' || key == 'a') {
    moveLeft = false
    console.log("MoveLeft Unimpressed");
} else if (key == 'ArrowRight' || key == 'd') {
    moveRight = false;
       console.log("MoveRight Unimpressed");
}

}); 

function updatePlayer() {
    player.velocityY += player.gravityStrength;
    player.y += player.velocityY;

    
    if (moveLeft) {
        player.x -= player.velocityX;
    }

    if (moveRight) {
        player.x += player.velocityX;
    }

    // if (player.x < -player.width) {
    //     player.x = gameWidth;
    // } else if (player.x > -player.width) {
    //     player.x = -player.width;
    // }

    playerElement.style.left = player.x + 'px';
    playerElement.style.top = player.y + 'px';
}


function checkCollisions() {
    if (player.velocityY <= 0) return;

    for (let i=platforms.length - 1; i >= 0; i--) {
        let platform = platforms[i];

        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height + 10) { // checking to see if the player should collide with the platform
                
            player.velocityY = player.jumpPower;
            
            if(platform.isBreakable && !platform.isBroken){
                score += 10;
            }
            else if(platform.isSpace){
                score += 25;
            }
            else{
                score += 1;
            }

            if(score % 10 === 0){
                platformGap += 2
            }
            scoreElement.textContent = 'Score: ' + score;


            
            if (platform.isBreakable && !platform.isBroken) {
                platform.isBroken = true; 
                platform.element.classList.add('breaking'); 
            }


            if(platform.isBouncing){
                player.velocityY = player.jumpPower * 1.8;
            }else{
                player.velocityY = player.jumpPower;
            }

            if(platform.isSpace){
                player.gravityStrength = .005;
            }else{
                player.gravityStrength = 0.1;
            }


        }    
    }
}

console.log("fart");

 function gameLoop() {
    if    (!gameRunning) return;

    
    updatePlayer();
    checkCollisions();
    updateCamera();
    checkGameOver();
    update();
    
    requestAnimationFrame(gameLoop);
 }

 function updateCamera() {
    if (player.y < 200) {
        const ScrollAmount = 200 - player.y;
        player.y = 200;

        camera += ScrollAmount;

        for(let i = platforms.length - 1; i>=0; i--) {
            platforms[i].y += ScrollAmount;
            platforms[i].element.style.top = platforms[i].y+'px'

            //remove old platforms

            if(platforms[i].y > gameHeight) {
                platforms[i].element.remove();
                platforms.splice(i,1);

                const newX = Math.random() * (gameWidth-70);
                const newY = -10;
                platforms.push(createPlatform(newX,newY))
            }
        }
    }
 }

  function checkGameOver() {
    if (player.y > gameHeight) {
        gameOver();
    }
 }

 function gameOver() {
    gameRunning = false;

    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
 }

console.log("hi")

let lastScore = score;

function update() {
  const diff = score - lastScore;
  if (diff > 0) {
    player.jumpPower -= diff * 0.01;
    lastScore = score;
  }
}



console.log(player.jumpPower)