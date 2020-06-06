export default class Lives {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("img_life");
  }

  update(deltaTime) {}

  draw(ctx) {
    for (let i = 0; i < this.game.lives; i++) {
      ctx.drawImage(this.image, 700 + 30 * i, 0, 30, 30);
    }
  }
}
