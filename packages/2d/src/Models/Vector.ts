import Point from "./Point";
import Angle from "./Angle";

export default class Vector {
  angle: Angle;
  magnitude: number;

  constructor(angle: Angle, magnitude: number) {
    this.angle = angle;
    this.magnitude = magnitude;
  }

  clone() {
    return new Vector(this.angle.clone(), this.magnitude);
  }

  // Create a vector with tail at `first` and head at `second`.
  static fromPoints(first: Point, second: Point): Vector {
    const angle = Angle.fromPoints(first, second);
    const magnitude = first.distanceTo(second);
    return new Vector(angle, magnitude);
  }

  // Place a vector at the origin, and return the location of its head.
  toPoint(): Point {
    const x = this.magnitude * Math.cos(this.angle.radians);
    const y = -(this.magnitude * Math.sin(this.angle.radians)); // Inverted because of canvas coordinate space
    return new Point(x, y);
  }

  multiply(amount: number): Vector {
    return new Vector(this.angle, this.magnitude * amount);
  }

  multiplyMutate(amount: number): this {
    this.magnitude *= amount;
    return this;
  }

  divide(amount: number): Vector {
    return new Vector(this.angle, this.magnitude / amount);
  }

  divideMutate(amount: number): this {
    this.magnitude /= amount;
    return this;
  }
}
