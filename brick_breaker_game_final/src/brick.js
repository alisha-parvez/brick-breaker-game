import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");
    //this.gameHeight = game.gameHeight;
    //this.gameWidth = game.gameWidth;
    this.position = position;
    this.width = 78;
    this.height = 22;
    this.game = game;
    this.markForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this) == 1) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
