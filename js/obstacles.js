class ObstacleX {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 35;
  }

  draw() {
    const badObsImg = new Image();
    badObsImg.src = "./images/badObstacles/mermaid (1).png";
    this.ctx.drawImage(badObsImg, this.x, this.y, this.size, this.size);
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
    this.speed = speed;
    this.size = 25;
    this.upscore = true;
  }

  draw() {
    const goodObsImg = new Image();
    goodObsImg.src = "./images/goodObstacles/coin_pure.png";
    this.ctx.drawImage(goodObsImg, this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed * -2;
  }
}
