"use strict";
class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.goodObstacles = [];
    this.badObstacles = [];
    this.player = null;
    this.gameIsOver = false;
    this.gameIsWon = false;
    this.score = 0;
  }

  timer() {
    const timer = document.querySelector(".timer");
    let countdown = 20;
    setInterval(() => {
      countdown -= 1;
      console.log(countdown);
      timer.innerText = countdown;
    }, 1 * 1000);
    console.log(timer);
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.timer();
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.player = new Player(this.canvas, 3);

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
      if (Math.random() > 0.99) {
        const y = Math.random() * this.canvas.height;
        const x = this.canvas.width - 20;
        this.badObstacles.push(new ObstacleX(this.ctx, x, y, 1));
      }
      // We create the obstacles with random Y
      if (Math.random() > 0.99) {
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

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      } else {
        buildGameOver();
      }

       if (!this.gameIsWon) {
         window.requestAnimationFrame(loop);
       } else {
         buildGameOver();
       }
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
  }

  checkGoodCollisions() {
    this.goodObstacles.forEach((obstacle) => {
      if (this.player.goodCollide(obstacle)) {
        console.log("great");
        this.gameIsOver = false;
      }
    });
  }
  checkBadCollisions() {
    this.badObstacles.forEach((obstacle) => {
      if (this.player.badCollide(obstacle)) {
        console.log("boom");
        this.gameIsOver = true;
      }
    });
  }
}
