import {Position} from "./pacman-position.class";
import {PacmanConstants} from "./pacman-constants.class";
import {PacmanMap} from "./pacman-map.class";
import {PacmanComponent} from "../../modules/pacman/pacman.component";

export class PacmanGhost {
  game: PacmanComponent;
  context: CanvasRenderingContext2D;
  map: PacmanMap;
  position: Position  = new Position(0,0);
  direction: number = -1;
  eatable: number | null = -1;
  eaten: number | null = -1;
  due: number = -1;
  colour: string = "";

  constructor(game: PacmanComponent, map: PacmanMap, colour:string, context: CanvasRenderingContext2D) {
    this.game = game;
    this.map = map;
    this.context = context;
  }

  getNewCoord(dir: number, current: Position): Position {
    let speed  = this.isVulnerable() ? 1 : this.isHidden() ? 4 : 2,
      xSpeed = (dir === PacmanConstants.LEFT && -speed || dir === PacmanConstants.RIGHT && speed || 0),
      ySpeed = (dir === PacmanConstants.DOWN && speed || dir === PacmanConstants.UP && -speed || 0);
    return new Position(this.addBounded(current.x, xSpeed), this.addBounded(current.y, ySpeed));
  }

  /* Collision detection(walls) is done when a ghost lands on an
   * exact block, make sure they dont skip over it
   */
  addBounded(val1: number, val2: number) {
    let rem    = val1 % 10,
      result = rem + val2;
    if (rem !== 0 && result > 10) {
      return val1 + (10 - rem);
    } else if(rem > 0 && result < 0) {
      return val1 - rem;
    }
    return val1 + val2;
  }

  isVulnerable() {
    return this.eatable !== null;
  }

  isDangerous() {
    return this.eaten === null;
  }

  isHidden() {
    return this.eatable === null && this.eaten !== null;
  }

  getRandomDirection() {
    let moves = (this.direction === PacmanConstants.LEFT || this.direction === PacmanConstants.RIGHT)
      ? [PacmanConstants.UP, PacmanConstants.DOWN] : [PacmanConstants.LEFT, PacmanConstants.RIGHT];
    return moves[Math.floor(Math.random() * 2)];
  };

  reset() {
    this.eaten = null;
    this.eatable = null;
    this.position = new Position(90, 80);
    this.direction = this.getRandomDirection();
    this.due = this.getRandomDirection();
  };

  onWholeSquare(val: number) {
    return val % 10 === 0;
  };

  oppositeDirection(dir: number) {
    return dir === PacmanConstants.LEFT && PacmanConstants.RIGHT ||
      dir === PacmanConstants.RIGHT && PacmanConstants.LEFT ||
      dir === PacmanConstants.UP && PacmanConstants.DOWN || PacmanConstants.UP;
  };

  makeEatable() {
    this.direction = this.oppositeDirection(this.direction);
    this.eatable = this.game.getTick();
  };

  eat() {
    this.eatable = null;
    this.eaten = this.game.getTick();
  };

  pointToCoord(x: number) {
    return Math.round(x / 10);
  };

  nextSquare(val: number, dir: number) {
    let rem = val % 10;
    if (rem === 0) {
      return val;
    } else if (dir === PacmanConstants.RIGHT || dir === PacmanConstants.DOWN) {
      return val + (10 - rem);
    } else {
      return val - rem;
    }
  };

  onGridSquare(pos: Position) {
    return this.onWholeSquare(pos.x) && this.onWholeSquare(pos.y);
  };

  secondsAgo(tick: number) {
    return (this.game.getTick() - tick) / PacmanConstants.FPS;
  };

  getColour() {
    if (this.eatable) {
      if (this.secondsAgo(this.eatable) > 5) {
        return this.game.getTick() % 20 > 10 ? "#FFFFFF" : "#0000BB";
      } else {
        return "#0000BB";
      }
    } else if(this.eaten) {
      return "#222";
    }
    return this.colour;
  };

  draw() {
    let s = this.map.blockSize,
      top  = (this.position.y/10) * s,
      left = (this.position.x/10) * s;

    if (this.eatable && this.secondsAgo(this.eatable) > 8) {
      this.eatable = null;
    }

    if (this.eaten && this.secondsAgo(this.eaten) > 3) {
      this.eaten = null;
    }

    let tl = left + s;
    let base = top + s - 3;
    let inc = s / 10;

    let high = this.game.getTick() % 10 > 5 ? 3  : -3;
    let low  = this.game.getTick() % 10 > 5 ? -3 : 3;

    this.context.fillStyle = this.getColour();
    this.context.beginPath();

    this.context.moveTo(left, base);

    this.context.quadraticCurveTo(left, top, left + (s/2),  top);
    this.context.quadraticCurveTo(left + s, top, left+s,  base);

    // Wavy things at the bottom
    this.context.quadraticCurveTo(tl-(inc), base+high, tl - (inc * 2),  base);
    this.context.quadraticCurveTo(tl-(inc*3), base+low, tl - (inc * 4),  base);
    this.context.quadraticCurveTo(tl-(inc*5), base+high, tl - (inc * 6),  base);
    this.context.quadraticCurveTo(tl-(inc*7), base+low, tl - (inc * 8),  base);
    this.context.quadraticCurveTo(tl-(inc*9), base+high, tl - (inc * 10), base);

    this.context.closePath();
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = "#FFF";
    this.context.arc(left + 6,top + 6, s / 6, 0, 300, false);
    this.context.arc((left + s) - 6,top + 6, s / 6, 0, 300, false);
    this.context.closePath();
    this.context.fill();

    let f = s / 12;
    let off: any = {};
    off[PacmanConstants.RIGHT] = [f, 0];
    off[PacmanConstants.LEFT]  = [-f, 0];
    off[PacmanConstants.UP]    = [0, -f];
    off[PacmanConstants.DOWN]  = [0, f];

    this.context.beginPath();
    this.context.fillStyle = "#000";
    this.context.arc(left+6+off[this.direction][0], top+6+off[this.direction][1],
      s / 15, 0, 300, false);
    this.context.arc((left+s)-6+off[this.direction][0], top+6+off[this.direction][1],
      s / 15, 0, 300, false);
    this.context.closePath();
    this.context.fill();
  };

  pane(pos: Position): Position | null {
    if (pos.y === 100 && pos.x >= 190 && this.direction === PacmanConstants.RIGHT) {
      return new Position(-10, 100);
    }
    if (pos.y === 100 && pos.x <= -10 && this.direction === PacmanConstants.LEFT) {
      return new Position(190, 100);
    }
    return null;
  };

  move(): any {
    let oldPos = this.position;
    let onGrid = this.onGridSquare(this.position);
    let npos: Position | null = null;

    if (this.due !== this.direction) {

      npos = this.getNewCoord(this.due, this.position);

      if (onGrid &&
        this.map.isFloorSpace({
          y: this.pointToCoord(this.nextSquare(npos.y, this.due)),
          x: this.pointToCoord(this.nextSquare(npos.x, this.due))})) {
        this.direction = this.due;
      } else {
        npos = null;
      }
    }

    if (npos === null) {
      npos = this.getNewCoord(this.direction, this.position);
    }

    if (onGrid &&
      this.map.isWall({
        x : this.pointToCoord(this.nextSquare(npos.x, this.direction)),
        y : this.pointToCoord(this.nextSquare(npos.y, this.direction))
      })) {

      this.due = this.getRandomDirection();
      return this.move();
    }

    this.position = npos;

    let tmp = this.pane(this.position);
    if (tmp) {
      this.position = tmp;
    }

    this.due = this.getRandomDirection();

    return {
      new : this.position,
      old : oldPos
    };
  };
}
