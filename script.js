const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

let playerX = 175;
let score = 0;
let gameRunning = true;
let speed = 5;

document.addEventListener("keydown", (event) => {
  if (!gameRunning) return;

  if (event.key === "ArrowLeft") {
    playerX -= 20;
  }

  if (event.key === "ArrowRight") {
    playerX += 20;
  }

  // Road ke andar car ko rakho
  if (playerX < 35) playerX = 35;
  if (playerX > 315) playerX = 315;

  player.style.left = playerX + "px";
});

function moveEnemies() {
  if (!gameRunning) return;

  enemies.forEach((enemy) => {
    let y = parseInt(enemy.style.top || "-120");

    y += speed;

    if (y > 600) {
      y = -150;
      enemy.style.left = randomLane() + "px";

      score++;
      scoreText.textContent = "Score: " + score;

      // Game thoda difficult hota jayega
      if (score % 5 === 0) {
        speed += 0.5;
      }
    }

    enemy.style.top = y + "px";

    checkCollision(player, enemy);
  });

  requestAnimationFrame(moveEnemies);
}

function randomLane() {
  const lanes = [40, 125, 210, 295];
  return lanes[Math.floor(Math.random() * lanes.length)];
}

function checkCollision(player, enemy) {
  const p = player.getBoundingClientRect();
  const e = enemy.getBoundingClientRect();

  if (
    p.left < e.right &&
    p.right > e.left &&
    p.top < e.bottom &&
    p.bottom > e.top
  ) {
    endGame();
  }
}

function endGame() {
  gameRunning = false;
  gameOverScreen.style.display = "block";
}

function restartGame() {
  playerX = 175;
  score = 0;
  speed = 5;
  gameRunning = true;

  player.style.left = playerX + "px";
  scoreText.textContent = "Score: 0";
  gameOverScreen.style.display = "none";

  enemies[0].style.top = "-150px";
  enemies[1].style.top = "-400px";

  moveEnemies();
}

moveEnemies();
