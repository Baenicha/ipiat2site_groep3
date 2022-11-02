import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
export default class player {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.omhoog = this.playerAnimationTimerDefault = 10;
    this.playerAnimationTimer = null;

    this.playerRotation = this.Rotation.right;
    // this.goedSound = new Audio("sound/sound.wav");

    this.powerKeySound = new Audio("sound/achievement.wav");
    this.powerKeyActive = false;
    this.powerKeyAboutToExpire = false;
    this.timers = [];

    this.killSoldierSound = new Audio("sound/death.wav");

    this.madeFirstmove = false;

    document.addEventListener("keydown", this.#keydown);
    // document.addEventListener("touch", this.#touch);

    this.#loadPlayerimages();
  }

  Rotation = {
    right: 0,
    down: 1,
    left: 2,
    up: 3,
  };

  draw(ctx, pause, enemies) {
    if (!pause) {
      this.#move();
      this.#animate();
    }
    this.#eatKey();
    this.#eatPowerKey();
    this.#eatSoldier(enemies);

    const size = this.tileSize / 2;
    ctx.save();
    ctx.translate(this.x + size, this.y + size);
    ctx.rotate((this.playerRotation * 90 * Math.PI) / 180);
    ctx.drawImage(
      this.playerImages[this.playerImageIndex],
      -size,
      -size,
      this.tileSize,
      this.tileSize
    );

    ctx.restore();
    // ctx.drawImage(
    //   this.playerImages[this.playerImageIndex],
    //   this.x,
    //   this.y,
    //   this.tileSize,
    //   this.tileSize
    // );
  }

  #loadPlayerimages() {
    const playerImage1 = new Image();
    playerImage1.src = "images/1.png";

    const playerImage2 = new Image();
    playerImage2.src = "images/2.png";

    const playerImage3 = new Image();
    playerImage3.src = "images/3.png";

    const playerImage4 = new Image();
    playerImage4.src = "images/2.png";

    this.playerImages = [
      playerImage1,
      playerImage2,
      playerImage3,
      playerImage4,
    ];

    this.playerImageIndex = 0;
  }

  #keydown = (event) => {
    //omhoog
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
      this.madeFirstmove = true;
    }
    //omlaag
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
      this.madeFirstmove = true;
    }
    //links
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
      this.madeFirstmove = true;
    }
    //rechts
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
      this.madeFirstmove = true;
    }
  };

  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        )
          this.currentMovingDirection = this.requestedMovingDirection;
      }
    }
    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirection
      )
    ) {
      this.playerAnimationTimer = null;
      this.playerImageIndex = 1;
      return;
    } else if (
      this.currentMovingDirection != null &&
      this.playerAnimationTimer == null
    ) {
      this.playerAnimationTimer = this.playerAnimationTimerDefault;
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        this.playerRotation = this.Rotation.up;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        this.playerRotation = this.Rotation.down;
        break;
      case MovingDirection.left:
        this.x -= this.velocity;
        this.playerRotation = this.Rotation.left;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        this.playerRotation = this.Rotation.right;
        break;
    }
  }

  #animate() {
    if (this.playerAnimationTimer == null) {
      return;
    }
    this.playerAnimationTimer--;
    if (this.playerAnimationTimer == 0) {
      this.playerAnimationTimer = this.playerAnimationTimerDefault;
      this.playerImageIndex++;
      if (this.playerImageIndex == this.playerImages.length)
        this.playerImageIndex = 0;
    }
  }
  #eatKey() {
    if (this.tileMap.eatKey(this.x, this.y)) {
      //play sound
      //   this.goedSound.play();
    }
  }
  #eatPowerKey() {
    if (this.tileMap.eatPowerKey(this.x, this.y)) {
      //soldier wordt neergestoken
      this.powerKeySound.play();
      this.powerKeyActive = true;
      this.powerKeyAboutToExpire = false;
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers = [];

      let powerKeyTimer = setTimeout(() => {
        this.powerKeyActive = false;
        this.powerKeyAboutToExpire = false;
      }, 1000 * 6);
      this.timers.push(powerKeyTimer);

      let powerKeyAboutToExpireTimer = setTimeout(() => {
        this.powerKeyAboutToExpire = true;
      }, 1000 * 3);

      this.timers.push(powerKeyAboutToExpireTimer);
    }
  }
  #eatSoldier(enemies) {
    if (this.powerKeyActive) {
      const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
      collideEnemies.forEach((enemy) => {
        enemies.splice(enemies.indexOf(enemy), 1);
        this.killSoldierSound.play();
      });
    }
  }
}
