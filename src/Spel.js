import Tilemap from "./Tilemap.js";

const tileSize = 32;
const velocity = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new Tilemap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("sound/game_over.wav");
const gameWinSound = new Audio("sound/game_win.wav");

// var s = window.matchMedia("(max-width: 400px)")
// function myFunction(s){
//   if(s.matches){
//     document.body.style.backgroundColor = "Black";
//   }
//   else{
//     document.body.style.back
//   }
// }

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  player.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), player));
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !player.powerKeyActive && enemy.collideWith(player)
  );
}

function pause() {
  return !player.madeFirstmove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = " You escaped!";
    if (gameOver) {
      text = "You got caught!";
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height / 2.7, canvas.width, 80);

    ctx.font = "80px  Cormorant Unicase, serif";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "white");
    gradient.addColorStop("0.5", "white");
    gradient.addColorStop("1.0", "white");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 10, canvas.height / 2);
  }
}
tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);
