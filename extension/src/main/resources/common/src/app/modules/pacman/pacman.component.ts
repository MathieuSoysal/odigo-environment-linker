import {Component, ElementRef, Inject, AfterViewInit, ViewChild, HostListener, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {PacmanConstants} from "../../models/pacman/pacman-constants.class";
import {Move, Position} from "../../models/pacman/pacman-position.class";
import {PacmanMap} from "../../models/pacman/pacman-map.class";
import {PacmanUser} from "../../models/pacman/pacman-user.class";
import {PacmanGhost} from "../../models/pacman/pacman-ghost.class";

@Component({
  selector: 'pacman',
  templateUrl: './pacman.component.html',
  styleUrls: ['./pacman.component.css']
})
export class PacmanComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;
  context: CanvasRenderingContext2D;
  state: number = PacmanConstants.WAITING;
  ghosts: PacmanGhost[] = [];
  ghostSpecs: string[]  = ["#00FFDE", "#FF0000", "#FFB8DE", "#FFB847"];
  eatenCount: number = 0;
  level: number = 0;
  tick: number = 0;
  ghostPos: Move[];
  userPos: Position;
  stateChanged: boolean = true;
  timerStart: number;
  lastTime     = 0;
  timer: number;
  map: PacmanMap;
  user: PacmanUser;
  stored: any = null;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit() {
    let canvas: HTMLCanvasElement = document.createElement("canvas");
    this.init();
    canvas.setAttribute("width", (this.map.blockSize * 19) + "px");
    canvas.setAttribute("height", (this.map.blockSize * 22) + 30 + "px");
    // @ts-ignore
    this.context = canvas.getContext('2d');
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  @HostListener('window:keydown', ['$event'])
  keyEventKeyUp(event: KeyboardEvent) {
    this.keyDown(event)
  }

  @HostListener('window:press', ['$event'])
  keyEventKeyPress(event: KeyboardEvent) {
    this.keyPress(event)
  }

  getTick() {
    return this.tick;
  };

  drawScore(text: string, position: Move) {
    this.context.fillStyle = "#FFFFFF";
    this.context.font      = "12px BDCartoonShoutRegular";
    this.context.fillText(text,
      (position.new.x / 10) * this.map.blockSize,
      ((position.new.y + 5) / 10) * this.map.blockSize);
  }

  dialog(text: string) {
    this.context.fillStyle = "#FFFF00";
    this.context.font      = "14px BDCartoonShoutRegular";
    let width = this.context.measureText(text).width,
      x = ((this.map.width * this.map.blockSize) - width) / 2;
    this.context.fillText(text, x, (this.map.height * 10) + 8);
  }

  startLevel() {
    this.user.resetPosition();
    for (let i = 0; i < this.ghosts.length; i += 1) {
      this.ghosts[i].reset();
    }
    this.timerStart = this.tick;
    this.setState(PacmanConstants.COUNTDOWN);
  }

  startNewGame() {
    this.setState(PacmanConstants.WAITING);
    this.level = 1;
    this.user.reset();
    this.map.reset();
    this.map.draw();
    this.startLevel();
  }

  keyDown(e: KeyboardEvent) {
    console.log(e.code);
    if (e.keyCode === PacmanConstants.KEY.N) {
      this.startNewGame();
    } else if (e.keyCode === PacmanConstants.KEY.P && this.state === PacmanConstants.PAUSE) {
      this.map.draw();
      this.setState(this.stored);
    } else if (e.keyCode === PacmanConstants.KEY.P) {
      this.stored = this.state;
      this.setState(PacmanConstants.PAUSE);
      this.map.draw();
      this.dialog("Paused");
    } else if (this.state !== PacmanConstants.PAUSE) {
      return this.user.keyDown(e);
    }
    return true;
  }

  loseLife() {
    this.setState(PacmanConstants.WAITING);
    this.user.loseLife();
    if (this.user.getLives() > 0) {
      this.startLevel();
    }
  }

  setState(nState: number) {
    this.state = nState;
    this.stateChanged = true;
  };

  collided(user: Position, ghost: Position) {
    return (Math.sqrt(Math.pow(ghost.x - user.x, 2) +
      Math.pow(ghost.y - user.y, 2))) < 10;
  };

  drawFooter() {

    let topLeft  = (this.map.height * this.map.blockSize),
      textBase = topLeft + 17;

    this.context.fillStyle = "#000000";
    this.context.fillRect(0, topLeft, (this.map.width * this.map.blockSize), 30);

    this.context.fillStyle = "#FFFF00";

    for (let i = 0, len = this.user.getLives(); i < len; i++) {
      this.context.fillStyle = "#FFFF00";
      this.context.beginPath();
      this.context.moveTo(150 + (25 * i) + this.map.blockSize / 2,
        (topLeft+1) + this.map.blockSize / 2);

      this.context.arc(150 + (25 * i) + this.map.blockSize / 2,
        (topLeft+1) + this.map.blockSize / 2,
        this.map.blockSize / 2, Math.PI * 0.25, Math.PI * 1.75, false);
      this.context.fill();
    }

    this.context.font = "bold 16px sans-serif";
    //this.context.fillText("♪", 10, textBase);
    this.context.fillText("s", 10, textBase);

    this.context.fillStyle = "#FFFF00";
    this.context.font      = "14px BDCartoonShoutRegular";
    this.context.fillText("Score: " + this.user.theScore(), 30, textBase);
    this.context.fillText("Level: " + this.level, 260, textBase);
  }

  redrawBlock(pos: Position) {
    this.map.drawBlock(Math.floor(pos.y/10), Math.floor(pos.x/10));
    this.map.drawBlock(Math.ceil(pos.y/10), Math.ceil(pos.x/10));
  }

  mainDraw() {
    let i: number;
    let len: number;
    let move: Move
    this.ghostPos = [];
    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      this.ghostPos.push(this.ghosts[i].move());
    }
    move = this.user.move();

    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      this.redrawBlock(this.ghostPos[i].old);
    }
    this.redrawBlock(move.old);

    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      this.ghosts[i].draw();
    }
    this.user.draw();

    this.userPos = move.new;

    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      if (this.collided(this.userPos, this.ghostPos[i].new)) {
        if (this.ghosts[i].isVulnerable()) {
          this.ghosts[i].eat();
          this.eatenCount += 1;
          let nScore = this.eatenCount * 50;
          this.drawScore(nScore + "", this.ghostPos[i]);
          this.user.addScore(nScore);
          this.setState(PacmanConstants.EATEN_PAUSE);
          this.timerStart = this.tick;
        } else if (this.ghosts[i].isDangerous()) {
          this.setState(PacmanConstants.DYING);
          this.timerStart = this.tick;
        }
      }
    }
  };

  mainLoop() {
    let diff;
    if (this.state !== PacmanConstants.PAUSE) {
      ++this.tick;
    }

    this.map.drawPills();

    if (this.state === PacmanConstants.PLAYING) {
      this.mainDraw();
    } else if (this.state === PacmanConstants.WAITING && this.stateChanged) {
      this.stateChanged = false;
      this.map.draw();
      this.dialog("Press N to start a New game");
    } else if (this.state === PacmanConstants.EATEN_PAUSE &&
      (this.tick - this.timerStart) > (PacmanConstants.FPS / 3)) {
      this.map.draw();
      this.setState(PacmanConstants.PLAYING);
    } else if (this.state === PacmanConstants.DYING) {
      if (this.tick - this.timerStart > (PacmanConstants.FPS * 2)) {
        this.loseLife();
      } else {
        this.redrawBlock(this.userPos);
        for (let i = 0, len = this.ghosts.length; i < len; i += 1) {
          this.redrawBlock(this.ghostPos[i].old);
          // this.ghostPos.push(this.ghosts[i].draw());
          this.ghosts[i].draw();
        }
        this.user.drawDead((this.tick - this.timerStart) / (PacmanConstants.FPS * 2));
      }
    } else if (this.state === PacmanConstants.COUNTDOWN) {

      diff = 5 + Math.floor((this.timerStart - this.tick) / PacmanConstants.FPS);

      if (diff === 0) {
        this.map.draw();
        this.setState(PacmanConstants.PLAYING);
      } else {
        if (diff !== this.lastTime) {
          this.lastTime = diff;
          this.map.draw();
          this.dialog("Starting in: " + diff);
        }
      }
    }

    this.drawFooter();
  }

  eatenPill() {
    this.timerStart = this.tick;
    this.eatenCount = 0;
    for (let i = 0; i < this.ghosts.length; i += 1) {
      this.ghosts[i].makeEatable();
    }
  };

  completedLevel() {
    this.setState(PacmanConstants.WAITING);
    this.level += 1;
    this.map.reset();
    this.user.newLevel();
    this.startLevel();
  };

  keyPress(e: KeyboardEvent) {
    if (this.state !== PacmanConstants.WAITING && this.state !== PacmanConstants.PAUSE) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  init() {
    let i, len, ghost,
      blockSize = this.wrapper.nativeElement.offsetWidth / 19,
      canvas    = document.createElement("canvas");

    canvas.setAttribute("width", (blockSize * 19) + "px");
    canvas.setAttribute("height", (blockSize * 22) + 30 + "px");

    this.wrapper.nativeElement.appendChild(canvas);

    let context = canvas.getContext('2d');
    if(context) {
      this.context = context;
    }

    this.map   = new PacmanMap(blockSize, this.context);
    this.user  = new PacmanUser(this, this.map, this.context);

    for (i = 0, len = this.ghostSpecs.length; i < len; i += 1) {
      ghost = new PacmanGhost(this, this.map, this.ghostSpecs[i], this.context);
      this.ghosts.push(ghost);
    }

    this.map.draw();
    this.dialog("Loading ...");

    this.loaded();
  };

  loaded() {
    this.dialog("Press N to Start");
    this.timer = window.setInterval(() => this.mainLoop(), 1000 / PacmanConstants.FPS);
  };
}
