import {Position} from "./pacman-position.class";
import {PacmanConstants} from "./pacman-constants.class";
import {PacmanWalls} from "./pacman-walls.class";

export class PacmanMap {
  context: CanvasRenderingContext2D;
  height: number = 0;
  width: number = 0;
  private _blockSize: number = 0;
  pillSize: number = 0;
  static MAP: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  constructor(size: number, context: CanvasRenderingContext2D) {
    this.context = context;
    this._blockSize = size;
    this.reset();
  }

  public get blockSize():number {
    return this._blockSize;
  }

  public set blockSize(value: number) {
    this._blockSize = value;
  }

  withinBounds(y: number, x: number) {
    return y >= 0 && y < this.height && x >= 0 && x < this.width;
  }

  isWall(pos: Position) {
    return this.withinBounds(pos.y, pos.x) && PacmanMap.MAP[pos.y][pos.x] === PacmanConstants.WALL;
  }

  isFloorSpace(pos: Position) {
    if (!this.withinBounds(pos.y, pos.x)) {
      return false;
    }
    let piece = PacmanMap.MAP[pos.y][pos.x];
    return piece === PacmanConstants.EMPTY ||
      piece === PacmanConstants.BISCUIT ||
      piece === PacmanConstants.PILL;
  }

  drawWall() {

    let i, j, p, line;

    this.context.strokeStyle = "#0000FF";
    this.context.lineWidth   = 5;
    this.context.lineCap     = "round";

    for (i = 0; i < PacmanWalls.WALLS.length; i += 1) {
      line = PacmanWalls.WALLS[i];
      this.context.beginPath();

      for (j = 0; j < line.length; j += 1) {

        p = line[j];

        if (p.move) {
          this.context.moveTo(p.move[0] * this.blockSize, p.move[1] * this.blockSize);
        } else if (p.line) {
          this.context.lineTo(p.line[0] * this.blockSize, p.line[1] * this.blockSize);
        } else if (p.curve) {
          this.context.quadraticCurveTo(p.curve[0] * this.blockSize,
            p.curve[1] * this.blockSize,
            p.curve[2] * this.blockSize,
            p.curve[3] * this.blockSize);
        }
      }
      this.context.stroke();
    }
  }

  reset() {
    PacmanMap.MAP    = [...PacmanMap.MAP];
    this.height = PacmanMap.MAP.length;
    this.width  = PacmanMap.MAP[0].length;
  };

  block(pos: Position) {
    return PacmanMap.MAP[pos.y][pos.x];
  };

  setBlock(pos: Position, type: number) {
    PacmanMap.MAP[pos.y][pos.x] = type;
  };

  drawPills() {

    if (++this.pillSize > 30) {
      this.pillSize = 0;
    }

    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if (PacmanMap.MAP[i][j] === PacmanConstants.PILL) {
          this.context.beginPath();

          this.context.fillStyle = "#000";
          this.context.fillRect((j * this.blockSize), (i * this.blockSize),
            this.blockSize, this.blockSize);

          this.context.fillStyle = "#FFF";
          this.context.arc((j * this.blockSize) + this.blockSize / 2,
            (i * this.blockSize) + this.blockSize / 2,
            Math.abs(5 - (this.pillSize/3)),
            0,
            Math.PI * 2, false);
          this.context.fill();
          this.context.closePath();
        }
      }
    }
  };

  draw() {

    let i, j, size = this.blockSize;

    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.width * size, this.height * size);

    this.drawWall();

    for (i = 0; i < this.height; i += 1) {
      for (j = 0; j < this.width; j += 1) {
        this.drawBlock(i, j);
      }
    }
  };

  drawBlock(y: number, x: number) {

    var layout = PacmanMap.MAP[y][x];

    if (layout === PacmanConstants.PILL) {
      return;
    }

    this.context.beginPath();

    if (layout === PacmanConstants.EMPTY || layout === PacmanConstants.BLOCK ||
      layout === PacmanConstants.BISCUIT) {

      this.context.fillStyle = "#000";
      this.context.fillRect((x * this.blockSize), (y * this.blockSize),
        this.blockSize, this.blockSize);

      if (layout === PacmanConstants.BISCUIT) {
        this.context.fillStyle = "#FFF";
        this.context.fillRect((x * this.blockSize) + (this.blockSize / 2.5),
          (y * this.blockSize) + (this.blockSize / 2.5),
          this.blockSize / 6, this.blockSize / 6);
      }
    }
    this.context.closePath();
  };
}
