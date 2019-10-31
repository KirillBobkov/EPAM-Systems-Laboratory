import { WSANOTINITIALISED } from "constants";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function Component(image, src, positionX, positionY, width, height ) {
    this.image = image;
    this.image.src = src;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
}

const background = new Component( new Image(), "src/image/back3.png", 0, 0, 592, 900);
const enemy = new Component( new Image(), `src/image/barrier5.png`, 100, -100, 52, 120);
const unit  = new Component( new Image(), "src/image/superman.png", 170, 700, 33, 85);
const bonus = new Component( new Image(), `src/image/bonus.png`, 100, -100, 30, 34);


//event listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }

    if (e.keyCode == 38) {
        upPressed = true;
    }

    if (e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    if (e.keyCode == 38) {
        upPressed = false;
    }
    if (e.keyCode == 40) {
        downPressed = false;
    }
}



//flags
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let running = true;

//creating arrays of entities
const enemyArray = [];
const bonusArray = [];
const explosions = [];
let health = 100;
let score  = 0;
let speedY = 5;

enemyArray.push({
    positionX: 30,
    positionY: -100,
    width: 52,
    height: 120
});

bonusArray.push({
    positionX: 70,
    positionY: -300,
    width: 25,
    height: 37
});

function generateRandomXPosition() {
    const randomPositionX = Math.floor( 0 + Math.random() * (canvas.width-48) );
    return randomPositionX;
}

function unitMove() {
    if (rightPressed) {
        unit.positionX += 8;
    } else if (leftPressed) {
        unit.positionX -= 8;
    }

    if (upPressed) {
        speedY = 10;
    }

    if (downPressed) {
        speedY = 5;
    }

    if (unit.positionX > canvas.width-30) {
        unit.positionX = canvas.width-30;
    }
    if (unit.positionX < 0) {
        unit.positionX = 0;
    }
}

function backgroundMove() {
    if (background.image.height >=  canvas.height) {
        background.image.height = 0;
    }
    background.image.height += speedY;
}

function collisionOccursBonus() {
    bonusArray.forEach( (bonusItem) => {
        if (collisionCheck(bonusItem, unit)) {
            bonusArray.splice( bonusItem, 1);
            score++;
        } 
    });
}

function collisionOccursEnemy() {
    enemyArray.forEach( (enemy) => {
        if (collisionCheck(enemy, unit)) {
            --health;
            if (health == 0) {
                gameOver();
            }
        } 
    });
}



function collisionCheck(a, b) {
    return (a.positionX < b.positionX + b.width - 10) &&
           (a.positionX + a.width-10 > b.positionX) &&
           (a.positionY < b.positionY + b.height - 20) &&
           (a.positionY + a.height - 10 > b.positionY + 10);
}


function generateEnemy() {
    for (let i in enemyArray) {
        enemyArray[i].positionY += speedY;

        if (enemyArray[i].positionY == (enemyArray[i].positionY % speedY + 60) ) {
            enemyArray.push({
                positionX: generateRandomXPosition(),
                positionY: -100,
                width: 52,
                height: 120
            }); 
        }
        
        if (enemyArray[i].positionY > canvas.height+300) {
            enemyArray.splice(enemyArray[i], 1);
        }
    }
}

function generateBonus() {
    for (let i in bonusArray) {
        bonusArray[i].positionY += speedY;

        if (bonusArray[i].positionY == (bonusArray[i].positionY % speedY + 60)) {
            bonusArray.push({
                positionX: generateRandomXPosition(),
                positionY: -120,
                width: 25,
                height: 37
            }); 
        }
        if (bonusArray[i].positionY > canvas.height+300) {
            bonusArray.splice(bonusArray[i], 1);
        }
    }
}

function update() {
    backgroundMove();
    unitMove();
    collisionOccursEnemy();
    collisionOccursBonus();
    generateEnemy();
    generateBonus();
}

function render() {
    //render background
    ctx.drawImage(background.image, 0, background.image.height);
    ctx.drawImage(background.image,  0, background.image.height - canvas.height);

    //render enemies
    for (let i in enemyArray) {
        ctx.drawImage(enemy.image, enemyArray[i].positionX, enemyArray[i].positionY);
    }
    //render bonuses
    for (let i in bonusArray) {
        ctx.drawImage(bonus.image, bonusArray[i].positionX, bonusArray[i].positionY);
    }
    //render unit
    ctx.drawImage(unit.image, unit.positionX, unit.positionY);

    //render score and health info
    ctx.fillStyle = "#000000";
    ctx.fillRect(10, canvas.height - 40, 150, 30);
    ctx.fillRect(410, canvas.height - 40, 150, 30);
    ctx.font = "26px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Health: ${health}`, 15, canvas.height - 15 );
    ctx.fillText(`Score: ${score}`, canvas.width - 150, canvas.height - 15 );
}

function gameOver() {
    running = false;
    alert('Врезался!');
}

function gameStart() {
    update();
    render();
    if (running) {
        requestAnimationFrame(gameStart);
    } 
}

gameStart();