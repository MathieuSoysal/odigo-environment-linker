class Move {
  move: Array<number> = [];
  constructor(x: number, y: number) {
    this.move.push(x);
    this.move.push(y);
  }
}
class Line {
  line: Array<number> = [];
  constructor(x: number, y: number) {
    this.line.push(x);
    this.line.push(y);
  }
}
class Curve {
  curve: Array<number> = [];
  constructor(point1: number, point2: number, point3: number, point4: number) {
    this.curve.push(point1);
    this.curve.push(point2);
    this.curve.push(point3);
    this.curve.push(point4);
  }
}

export class PacmanWalls {
  static WALLS: Array<Array<any>> = [
    [new Move(0, 9.5), new Line(3, 9.5),
      new Curve(3.5, 9.5, 3.5, 9), new Line(3.5, 8),
      new Curve(3.5, 7.5, 3, 7.5), new Line(1, 7.5),
      new Curve(0.5, 7.5, 0.5, 7), new Line(0.5, 1),
      new Curve(0.5, 0.5, 1, 0.5), new Line(9, 0.5),
      new Curve(9.5, 0.5, 9.5, 1), new Line(9.5, 3.5)],

    [new Move(9.5, 1),
      new Curve(9.5, 0.5, 10, 0.5), new Line(18, 0.5),
      new Curve(18.5, 0.5, 18.5, 1), new Line(18.5, 7),
      new Curve(18.5, 7.5, 18, 7.5), new Line(16, 7.5),
      new Curve(15.5, 7.5, 15.5, 8), new Line(15.5, 9),
      new Curve(15.5, 9.5, 16, 9.5), new Line(19, 9.5)],

    [new Move(2.5, 5.5), new Line(3.5, 5.5)],

    [new Move(3, 2.5),
      new Curve(3.5, 2.5, 3.5, 3),
      new Curve(3.5, 3.5, 3, 3.5),
      new Curve(2.5, 3.5, 2.5, 3),
      new Curve(2.5, 2.5, 3, 2.5)],

    [new Move(15.5, 5.5), new Line(16.5, 5.5)],

    [new Move(16, 2.5), new Curve(16.5, 2.5, 16.5, 3),
      new Curve(16.5, 3.5, 16, 3.5), new Curve(15.5, 3.5, 15.5, 3),
      new Curve(15.5, 2.5, 16, 2.5)],

    [new Move(6, 2.5), new Line(7, 2.5), new Curve(7.5, 2.5, 7.5, 3),
      new Curve(7.5, 3.5, 7, 3.5), new Line(6, 3.5),
      new Curve(5.5, 3.5, 5.5, 3), new Curve(5.5, 2.5, 6, 2.5)],

    [new Move(12, 2.5), new Line(13, 2.5), new Curve(13.5, 2.5, 13.5, 3),
      new Curve(13.5, 3.5, 13, 3.5), new Line(12, 3.5),
      new Curve(11.5, 3.5, 11.5, 3), new Curve(11.5, 2.5, 12, 2.5)],

    [new Move(7.5, 5.5), new Line(9, 5.5), new Curve(9.5, 5.5, 9.5, 6),
      new Line(9.5, 7.5)],
    [new Move(9.5, 6), new Curve(9.5, 5.5, 10.5, 5.5),
      new Line(11.5, 5.5)],


    [new Move(5.5, 5.5), new Line(5.5, 7), new Curve(5.5, 7.5, 6, 7.5),
      new Line(7.5, 7.5)],
    [new Move(6, 7.5), new Curve(5.5, 7.5, 5.5, 8), new Line(5.5, 9.5)],

    [new Move(13.5, 5.5), new Line(13.5, 7),
      new Curve(13.5, 7.5, 13, 7.5), new Line(11.5, 7.5)],
    [new Move(13, 7.5), new Curve(13.5, 7.5, 13.5, 8),
      new Line(13.5, 9.5)],

    [new Move(0, 11.5), new Line(3, 11.5), new Curve(3.5, 11.5, 3.5, 12),
      new Line(3.5, 13), new Curve(3.5, 13.5, 3, 13.5), new Line(1, 13.5),
      new Curve(0.5, 13.5, 0.5, 14), new Line(0.5, 17),
      new Curve(0.5, 17.5, 1, 17.5), new Line(1.5, 17.5)],
    [new Move(1, 17.5), new Curve(0.5, 17.5, 0.5, 18), new Line(0.5, 21),
      new Curve(0.5, 21.5, 1, 21.5), new Line(18, 21.5),
      new Curve(18.5, 21.5, 18.5, 21), new Line(18.5, 18),
      new Curve(18.5, 17.5, 18, 17.5), new Line(17.5, 17.5)],
    [new Move(18, 17.5), new Curve(18.5, 17.5, 18.5, 17),
      new Line(18.5, 14), new Curve(18.5, 13.5, 18, 13.5),
      new Line(16, 13.5), new Curve(15.5, 13.5, 15.5, 13),
      new Line(15.5, 12), new Curve(15.5, 11.5, 16, 11.5),
      new Line(19, 11.5)],

    [new Move(5.5, 11.5), new Line(5.5, 13.5)],
    [new Move(13.5, 11.5), new Line(13.5, 13.5)],

    [new Move(2.5, 15.5), new Line(3, 15.5),
      new Curve(3.5, 15.5, 3.5, 16), new Line(3.5, 17.5)],
    [new Move(16.5, 15.5), new Line(16, 15.5),
      new Curve(15.5, 15.5, 15.5, 16), new Line(15.5, 17.5)],

    [new Move(5.5, 15.5), new Line(7.5, 15.5)],
    [new Move(11.5, 15.5), new Line(13.5, 15.5)],

    [new Move(2.5, 19.5), new Line(5, 19.5),
      new Curve(5.5, 19.5, 5.5, 19), new Line(5.5, 17.5)],
    [new Move(5.5, 19), new Curve(5.5, 19.5, 6, 19.5),
      new Line(7.5, 19.5)],

    [new Move(11.5, 19.5), new Line(13, 19.5),
      new Curve(13.5, 19.5, 13.5, 19), new Line(13.5, 17.5)],
    [new Move(13.5, 19), new Curve(13.5, 19.5, 14, 19.5),
      new Line(16.5, 19.5)],

    [new Move(7.5, 13.5), new Line(9, 13.5),
      new Curve(9.5, 13.5, 9.5, 14), new Line(9.5, 15.5)],
    [new Move(9.5, 14), new Curve(9.5, 13.5, 10, 13.5),
      new Line(11.5, 13.5)],

    [new Move(7.5, 17.5), new Line(9, 17.5),
      new Curve(9.5, 17.5, 9.5, 18), new Line(9.5, 19.5)],
    [new Move(9.5, 18), new Curve(9.5, 17.5, 10, 17.5),
      new Line(11.5, 17.5)],

    [new Move(8.5, 9.5), new Line(8, 9.5), new Curve(7.5, 9.5, 7.5, 10),
      new Line(7.5, 11), new Curve(7.5, 11.5, 8, 11.5),
      new Line(11, 11.5), new Curve(11.5, 11.5, 11.5, 11),
      new Line(11.5, 10), new Curve(11.5, 9.5, 11, 9.5),
      new Line(10.5, 9.5)]
  ];
}
