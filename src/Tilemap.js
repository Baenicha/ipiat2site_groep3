import player from "./anne.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
export default class Tilemap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.sleutel_geel = new Image();
    this.sleutel_geel.src = "images/sleutel_roze.png";

    this.sleutel_echtgeel = new Image();
    this.sleutel_echtgeel.src = "images/sleutel_geel.png";

    this.gras_randen = new Image();
    this.gras_randen.src = "images/bloemetjes.jpeg";

    this.powerKey = this.sleutel_echtgeel;
    this.powerKeyAnimationTimerDefault = 30;
    this.powerKeyAnimationTimer = this.powerKeyAnimationTimerDefault;
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 4, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 7, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 7, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 6, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.#drawKey(ctx, column, row, this.tileSize);
        } else if (tile == 7) {
          this.#drawPowerKey(ctx, column, row, this.tileSize);
        } else {
          this.#drawBlank(ctx, column, row, this.tileSize);
        }
      }
    }
  }

  #drawKey(ctx, column, row, size) {
    ctx.drawImage(
      this.sleutel_geel,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawPowerKey(ctx, column, row, size) {
    this.powerKeyAnimationTimer--;
    if (this.powerKeyAnimationTimer == 0) {
      this.powerKeyAnimationTimer = this.powerKeyAnimationTimerDefault;
      if (this.powerKey == this.sleutel_echtgeel) {
        this.powerKey = this.sleutel_geel;
      } else {
        this.powerKey = this.sleutel_echtgeel;
      }
    }
    ctx.drawImage(this.powerKey, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.gras_randen,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }
  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "green";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  getPlayer(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile == 4) {
          this.map[row][column] = 0;
          return new player(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile == 6) {
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }
  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

  didWin() {
    return this.#keysLeft() === 0;
  }

  #keysLeft() {
    return this.map.flat().filter((tile) => tile === 0).length;
  }
  eatKey(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 0) {
        this.map[row][column] = 5;
        return true;
      }
    }
    return false;
  }
  eatPowerKey(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 7) {
        this.map[row][column] = 5;
        return true;
      }
    }
    return false;
  }
}
