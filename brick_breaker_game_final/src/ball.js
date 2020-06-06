import { detectCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.image = document.getElementById("img_ball");

    this.size = 20;
    this.reset();
  }

  reset() {
    this.position = {
      x: 30,
      y: 100
    };
    this.speed = {
      x: 4,
      y: 4
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //collision detection with the sides/walls
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //losing a life
    if (this.position.y > this.gameHeight - this.size) {
      this.game.lives--;
      this.reset();
    }

    //collision detection with the paddle

    if (detectCollision(this, this.game.paddle) === 1) {
      this.speed.y = -this.speed.y;
    }

    /*if (
      this.position.y + this.size > this.game.paddle.position.y &&
      this.position.x >= this.game.paddle.position.x &&
      this.position.x <= this.game.paddle.position.x + this.game.paddle.width
    ) {
      this.speed.y = -this.speed.y;
    }*/

    //collision detection with the bricks
  }
}
