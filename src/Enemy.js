import MovingDirection from "./MovingDirection.js";
import player from "./anne.js";
export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );

    this.directionTimerDefault = this.#random(10, 50);
    this.directionTimer = this.directionTimerDefault;

    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
  }
  draw(ctx, pause, player) {
    if (!pause) {
      this.#move();
      this.#changeDirection();
    }

    this.#setImage(ctx, player);

    // ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  collideWith(player) {
    const size = this.tileSize / 2;
    if (
      this.x < player.x + size &&
      this.x + size > player.x &&
      this.y < player.y + size &&
      this.y + size > player.y
    ) {
      return true;
    } else {
      return false;
    }
  }
  #setImage(ctx, player) {
    if (player.powerKeyActive) {
      //   this.image = this.vechtSoldier;
      this.#setImageWhenPowerKeyIsActive(player);
    } else {
      this.image = this.normaalSoldier;
    }
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #setImageWhenPowerKeyIsActive(player) {
    if (player.powerKeyAboutToExpire) {
      this.scaredAboutToExpireTimer--;
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        if (this.image === this.vechtSoldier) {
          this.image = this.deadSoldier;
        } else {
          this.image = this.vechtSoldier;
        }
      }
    } else {
      this.image = this.vechtSoldier;
    }
  }

  #changeDirection() {
    this.directionTimer--;
    let newMoveDirection = null;
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length
      );
    }
    if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }

  #move() {
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;
      }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  #loadImages() {
    this.normaalSoldier = new Image();
    this.normaalSoldier.src = "images/enemy_0.png";

    this.vechtSoldier = new Image();
    this.vechtSoldier.src = "images/enemy_1.png";

    this.deadSoldier = new Image();
    this.deadSoldier.src = "images/enemy_2.png";

    this.image = this.normaalSoldier;
  }
}
