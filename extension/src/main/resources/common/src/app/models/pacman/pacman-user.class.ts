import {Move, Position} from "./pacman-position.class";
import {PacmanConstants} from "./pacman-constants.class";
import {PacmanMap} from "./pacman-map.class";
import {PacmanComponent} from "../../modules/pacman/pacman.component";

export class PacmanUser {
  context: CanvasRenderingContext2D;
  map: PacmanMap;
  game: PacmanComponent;
  position: Position = new Position(0, 0);
  direction: number = -1;
  eaten: number = -1;
  due: number = -1;
  lives: number = -1;
  score: number = 5;
  keyMap: any = {};

  constructor(game: PacmanComponent, map: PacmanMap, context: CanvasRenderingContext2D) {
    this.context = context;
    this.map = map;
    this.game = game;
    this.keyMap[PacmanConstants.KEY.ARROW_LEFT]  = PacmanConstants.LEFT;
    this.keyMap[PacmanConstants.KEY.ARROW_UP]    = PacmanConstants.UP;
    this.keyMap[PacmanConstants.KEY.ARROW_RIGHT] = PacmanConstants.RIGHT;
    this.keyMap[PacmanConstants.KEY.ARROW_DOWN]  = PacmanConstants.DOWN;
    this.initUser();
  }

  keyDown(e: KeyboardEvent) {
    if (typeof this.keyMap[e.keyCode] !== "undefined") {
      this.due = this.keyMap[e.keyCode];
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  }

  addScore(nScore: number) {
    this.score += nScore;
    if (this.score >= 10000 && this.score - nScore < 10000) {
      this.lives += 1;
    }
  }

  theScore() {
    return this.score;
  }

  loseLife() {
    this.lives -= 1;
  }

  getLives() {
    return this.lives;
  }

  initUser() {
    this.score = 0;
    this.lives = 3;
    this.newLevel();
  }

  newLevel() {
    this.resetPosition();
    this.eaten = 0;
  }

  resetPosition() {
    this.position.x = 90;
    this.position.y = 120;

    this.direction = PacmanConstants.LEFT;
    this.due = PacmanConstants.LEFT;
  }

  reset() {
    this.initUser();
  }

  getNewCoord(dir: number, current: Position): Position {
    return {
      "x": current.x + (dir === PacmanConstants.LEFT && -2 || dir === PacmanConstants.RIGHT && 2 || 0),
      "y": current.y + (dir === PacmanConstants.DOWN && 2 || dir === PacmanConstants.UP && -2 || 0)
    }

  }

  onWholeSquare(val: number) {
    return val % 10 === 0;
  }

  pointToCoord(val: number) {
    return Math.round(val / 10);
  }


  nextSquare(val: number, dir: number) {
    let rem = val % 10;
    if (rem === 0) {
      return val;
    } else if (dir === PacmanConstants.RIGHT || dir === PacmanConstants.DOWN) {
      return val + (10 - rem);
    } else {
      return val - rem;
    }
  }

  next(pos: Position, dir: number): Position {
    let position = new Position(0, 0);
    position.x = this.pointToCoord(this.nextSquare(pos.y, dir));
    position.y = this.pointToCoord(this.nextSquare(pos.x, dir));
    return position;
  }

  onGridSquare(pos: Position) {
    return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
  }


  isOnSamePlane(due: number, dir: number) {
    return ((due === PacmanConstants.LEFT || due === PacmanConstants.RIGHT) &&
        (dir === PacmanConstants.LEFT || dir === PacmanConstants.RIGHT)) ||
      ((due === PacmanConstants.UP || due === PacmanConstants.DOWN) &&
        (dir === PacmanConstants.UP || dir === PacmanConstants.DOWN));
  }


  move(): Move {
    let npos: Position | null = new Position(0, 0);
    let nextWhole = null;
    let oldPosition = this.position;
    let block = null;

    if (this.due !== this.direction) {
      npos = this.getNewCoord(this.due, this.position);

      if (this.isOnSamePlane(this.due, this.direction) ||
        (this.onGridSquare(this.position) && this.map.isFloorSpace(this.next(npos, this.due)))) {
        this.direction = this.due;
      } else {
        npos = null;
      }
    }

    if (npos === null) {
      npos = this.getNewCoord(this.direction, this.position);
    }

    if (this.onGridSquare(this.position) && this.map.isWall(this.next(npos, this.direction))) {
      this.direction = PacmanConstants.NONE;
    }

    if (this.direction === PacmanConstants.NONE) {
      return new Move(this.position, this.position);
    }

    if (npos.y === 100 && npos.x >= 190 && this.direction === PacmanConstants.RIGHT) {
      npos = new Position(-10, 100);
    }

    if (npos.y === 100 && npos.x <= -12 && this.direction === PacmanConstants.LEFT) {
      npos = new Position(190, 100);
    }

    this.position = npos;
    nextWhole = this.next(this.position, this.direction);

    block = this.map.block(nextWhole);

    if ((this.isMidSquare(this.position.y) || this.isMidSquare(this.position.x)) &&
      block === PacmanConstants.BISCUIT || block === PacmanConstants.PILL) {

      this.map.setBlock(nextWhole, PacmanConstants.EMPTY);
      this.addScore((block === PacmanConstants.BISCUIT) ? 10 : 50);
      this.eaten += 1;

      if (this.eaten === 182) {
        this.game.completedLevel();
      }

      if (block === PacmanConstants.PILL) {
        this.game.eatenPill();
      }
    }

    return new Move(this.position, oldPosition);
  }

  isMidSquare(val: number) {
    let rem = val % 10;
    return rem > 3 || rem < 7;
  }


  calcAngle(dir: number, pos: Position) {
    if (dir == PacmanConstants.RIGHT && (pos.x % 10 < 5)) {
      return {
        "start": 0.25,
        "end": 1.75,
        "direction": false
      }

    } else if (dir === PacmanConstants.DOWN && (pos.y % 10 < 5)) {
      return {
        "start": 0.75,
        "end": 2.25,
        "direction": false
      }

    } else if (dir === PacmanConstants.UP && (pos.y % 10 < 5)) {
      return {
        "start": 1.25,
        "end": 1.75,
        "direction": true
      }

    } else if (dir === PacmanConstants.LEFT && (pos.x % 10 < 5)) {
      return {
        "start": 0.75,
        "end": 1.25,
        "direction": true
      }

    }
    return {
      "start": 0,
      "end": 2,
      "direction": false
    }

  }

  drawDead(amount: number) {
    let size = this.map.blockSize, half = size / 2;
    if (amount >= 1) {
      return;
    }

    this.context.fillStyle = "#FFFF00";
    this.context.beginPath();
    this.context.moveTo(((this.position.x / 10) * size) + half,
      ((this.position.y / 10) * size) + half);

    this.context.arc(((this.position.x / 10) * size) + half,
      ((this.position.y / 10) * size) + half,
      half,
      0,
      Math.PI * 2 * amount,
      true);

    this.context.fill();
  }


  draw() {
    let s = this.map.blockSize,
      angle = this.calcAngle(this.direction, this.position);
    this.context.fillStyle = "#FFFF00";
    this.context.beginPath();
    this.context.moveTo(((this.position.x / 10) * s) + s / 2,
      ((this.position.y / 10) * s) + s / 2);
    this.context.arc(((this.position.x / 10) * s) + s / 2,
      ((this.position.y / 10) * s) + s / 2,
      s / 2,
      Math.PI * angle.start,
      Math.PI * angle.end,
      angle.direction);
    this.context.fill();
  }
}
