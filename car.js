const playerCar = document.getElementById('playerCar');
const gameContainer = document.querySelector('.game-container');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');

let gameInterval;
let enemyInterval;
let keys = {};
let playerPosition = { x: 175, y: 480 };
let enemies = [];
let score = 0;
let speed = 5;
let isPaused = false;

// Key controls
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function movePlayer() {
  if(keys['ArrowLeft'] && playerPosition.x > 0) playerPosition.x -= 5;
  if(keys['ArrowRight'] && playerPosition.x < gameContainer.clientWidth - 50) playerPosition.x += 5;
  playerCar.style.left = playerPosition.x + 'px';
}

// Enemy creation
function createEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy-car');
  enemy.style.left = Math.floor(Math.random() * 7) * 50 + 'px';
  enemy.style.top = '-120px';
  gameContainer.appendChild(enemy);
  enemies.push(enemy);
}

// Move enemies
function moveEnemies() {
  enemies.forEach((enemy, index) => {
    let top = parseInt(enemy.style.top);
    top += speed;
    enemy.style.top = top + 'px';

    // Collision detection
    if(
      top + 100 > playerPosition.y &&
      top < playerPosition.y + 100 &&
      parseInt(enemy.style.left) === playerPosition.x
    ) {
      endGame();
    }

    // Remove enemy if out of screen
    if(top > gameContainer.clientHeight) {
      enemy.remove();
      enemies.splice(index, 1);
      score++;
      scoreDisplay.innerText = score;
    }
  });
}

// Game loop
function gameLoop() {
  if(!isPaused){
    movePlayer();
    moveEnemies();
  }
}

// Start game
startBtn.addEventListener('click', () => {
  if(!gameInterval){
    gameInterval = setInterval(gameLoop, 20);
    enemyInterval = setInterval(createEnemy, 1500);
  }
  isPaused = false;
});

// Pause game
pauseBtn.addEventListener('click', () => {
  isPaused = true;
});

// Restart game
restartBtn.addEventListener('click', () => {
  enemies.forEach(enemy => enemy.remove());
  enemies = [];
  score = 0;
  scoreDisplay.innerText = score;
  playerPosition.x = 175;
  playerCar.style.left = playerPosition.x + 'px';
  isPaused = false;
});

// End game
function endGame() {
  alert('Game Over! Your Score: ' + score);
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  gameInterval = null;
  enemyInterval = null;
  enemies.forEach(enemy => enemy.remove());
  enemies = [];
  score = 0;
  scoreDisplay.innerText = score;
  playerPosition.x = 175;
  playerCar.style.left = playerPosition.x + 'px';
}
