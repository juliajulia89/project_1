class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasHeight = 500;
    this.lives = lives;
    this.size = 55;
    this.x = 5;
    this.y = canvas.height / 2;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 2.5;
  }

  updateY() {
    this.y = this.y + this.directionY * this.speed;
    this.checkScreen();
  }
  updateX() {
    this.x = this.x + this.directionX * this.speed;
    this.checkScreen();
  }

  setDirection(direction) {
    if (direction === "up") this.directionY = -1;
    else if (direction === "right") this.directionX = 1;
    else if (direction === "left") this.directionX = -1;
    else this.directionY = 1;
  }

  // Check if the player is out of the screen / canvas
  checkScreen() {
    if (this.y + this.size - this.size <= 0) {
      this.directionY = 1;
    } else if (this.y + this.size >= 500) {
      this.directionY = -1;
    } else if (this.x + this.size - this.size <= 0) {
      this.directionX = 1;
    }
  }

  draw() {
    const playerImg = new Image();
    playerImg.src = "./images/player/submarine (1).png";
    this.ctx.drawImage(playerImg, this.x, this.y, this.size, this.size);
  }

  collide(obstacle) {
    if (
      this.x + this.size >= obstacle.x &&
      this.y + this.size > obstacle.y &&
      this.y < obstacle.y + obstacle.size &&
      this.x <= obstacle.x + obstacle.size &&
      this.y + this.size > obstacle.y &&
      this.y < obstacle.y + obstacle.size
    ) {
      return true;
    } else {
      return false;
    }
  }
}
