class ObstacleX {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = "red";
    this.speed = speed;
    this.size = 15;
  }

  draw() {
    // We will first draw squares
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.speed * -4;
  }
}

class ObstacleY {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = "green";
    this.speed = speed;
    this.size = 10;
    this.upscore = true;
  }

  draw() {
    // We will first draw squares
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed * -2;
  }
}
