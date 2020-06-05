import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "./input";
import { buildLevel, level1, level2, level3, level4 } from "/src/levels";
import Lives from "./lives";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  LEVEL_UP: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.lives = 3;
    this.lifeCount = new Lives(this);
    new InputHandler(this.paddle, this);
    this.bricks = [];
    this.levels = [level1, level2, level3, level4];
    this.currentLevel = 0;
    this.gameObjects = [this.ball, this.paddle, this.lifeCount];
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAME_OVER;
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.LEVEL_UP
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.LEVEL_UP;
    }

    [...this.gameObjects, ...this.bricks].forEach(objects =>
      objects.update(deltaTime)
    );
    this.bricks = this.bricks.filter(objects => !objects.markForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(objects => objects.draw(ctx));
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "50px Arial";
      ctx.fillStyle = "#037eab";
      ctx.textAlign = "center";
      ctx.fillText("BRICKBREAKER", this.gameWidth / 2, this.gameHeight / 3);
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press Enter to Start",
        this.gameWidth / 2,
        this.gameHeight / 1.95
      );
      ctx.font = "20px Arial";
      ctx.fillStyle = "grey";
      ctx.fillText(
        "Press Spacebar to Pause",
        this.gameWidth / 2,
        this.gameHeight / 1.7
      );
    }

    if (this.gamestate === GAMESTATE.LEVEL_UP) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      if (this.currentLevel + 1 <= this.levels.length) {
        ctx.fillText("Level Up!", this.gameWidth / 2, this.gameHeight / 2);
        ctx.fillText(
          "Press Spacebar to start Level " + (this.currentLevel + 1),
          this.gameWidth / 2,
          this.gameHeight / 1.7
        );
      } else {
        ctx.fillText(
          "YOU HAVE WON THE GAME!",
          this.gameWidth / 2,
          this.gameHeight / 2
        );
      }
    }

    if (this.gamestate === GAMESTATE.GAME_OVER) {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) this.gamestate = GAMESTATE.RUNNING;
    else {
      if (this.gamestate === GAMESTATE.LEVEL_UP) this.start();
      else this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
