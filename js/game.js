class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.goodObstacles = [];
    this.badObstacles = [];
    this.player = null;
    this.gameOver = false;
    this.gameWin = false;
    this.score = 0;
  }

  timer() {
    const timer = document.querySelector(".timer");
    let countdown = 20;
    const internalId = setInterval(() => {
      countdown -= 1;
      timer.innerText = `CHECKTime left: ${countdown}`;
      if (countdown === 0) {
        clearInterval(internalId);
        buildGameOver();
      } else if (this.gameOver === true) clearInterval(internalId);
      else if (this.gameWin === true) clearInterval(internalId);
    }, 1 * 1000);
  }
  scoreup() {
    const score = document.querySelector(".score");
    score.innerText = `Score: ${this.score}`;
  }

  start() {
    this.timer();
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");
    this.player = new Player(this.canvas);

    // Add event listener for moving the player
    this.handleKeyDown = (event) => {
      if (event.code === "ArrowUp") {
        this.player.setDirection("up");
      } else if (event.code === "ArrowLeft") {
        this.player.setDirection("left");
      } else if (event.code === "ArrowRight") {
        this.player.setDirection("right");
      } else {
        this.player.setDirection("down");
      }
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      // We create the obstacles with random X
      if (Math.random() > 0.96) {
        const y = Math.random() * this.canvas.height;
        const x = this.canvas.width - 20;
        this.badObstacles.push(new ObstacleX(this.ctx, x, y, 1));
      }
      // We create the obstacles with random Y
      if (Math.random() > 0.975) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height - 20;
        this.goodObstacles.push(new ObstacleY(this.ctx, x, y, 1));
      }

      // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
      this.player.updateY();
      this.player.updateX();
      this.badObstacles.forEach((obstacle) => {
        obstacle.move();
      });
      this.goodObstacles.forEach((obstacle) => {
        obstacle.move();
      });

      this.checkBadCollisions();
      this.checkGoodCollisions();
      this.checkWin();

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.scoreup();

      // 3. UPDATE THE CANVAS
      // Draw the player
      this.player.draw();

      // Draw the enemies
      this.badObstacles.forEach((obstacle) => {
        obstacle.draw();
      });

      this.goodObstacles.forEach((obstacle) => {
        obstacle.draw();
      });

      // 4. TERMINATE LOOP IF GAME IS OVER OR WON
      if (this.gameWin) {
        buildGameWon();
      } else if (this.gameOver) {
        buildGameOver();
      } else {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }

  checkGoodCollisions() {
    this.goodObstacles.forEach((obstacle, index) => {
      if (this.player.collide(obstacle)) {
        if (obstacle.upscore) this.score += 20;
        this.goodObstacles.splice(index, 1);
        console.log(this.score);
      }
    });
  }
  checkBadCollisions() {
    this.badObstacles.forEach((obstacle) => {
      if (this.player.collide(obstacle)) {
        console.log("game over");
        this.gameOver = true;
      }
    });
  }
  checkWin() {
    if (this.player.x >= this.canvas.width) {
      this.gameWin = true;
    }
  }
}
