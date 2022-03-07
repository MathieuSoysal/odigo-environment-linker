export class Position {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Move {
  new: Position;
  old: Position;

  constructor(newPos: Position, oldPos: Position) {
    this.new = newPos;
    this.old = oldPos;
  }
}
