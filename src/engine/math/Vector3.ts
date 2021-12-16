import { Vector2 } from "./Vector2"

export class Vector3 {
    private _x: number
    private _y: number
    private _z: number

    static get left() { return new Vector3(-1, 0, 0) };
    static get right() { return new Vector3(1, 0, 0) };
    static get down() { return new Vector3(0, -1, 0) };
    static get up() { return new Vector3(0, 1, 0) };
    static get backwards() { return new Vector3(0, 0, -1) };
    static get forwards() { return new Vector3(0, 0, 1) };

    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }

    set(v: Vector3): Vector3
    set(x?: number, y?: number, z?: number): Vector3
    set(x: number | Vector3 = this._x, y = this._y, z = this._z): Vector3 {
        if (x instanceof Vector3) {
            this._x = x._x;
            this._y = x._y;
            this._z = x._z;
        } else {
            this._x = x;
            this._y = y;
            this._z = z;
        }

        return this;
    }

    add(x: Vector3): Vector3
    add(x: number, y?: number, z?: number): Vector3
    add(x: Vector3 | number = 0, y = 0, z = 0): Vector3 {
        if (x instanceof Vector3) {
            return new Vector3(this._x + x._x, this._y + x._y, this._z + x._z);
        } else {
            return new Vector3(this._x + x, this._y + y, this._z + z);
        }
    }

    sub(x: Vector3): Vector3
    sub(x: number, y?: number, z?: number): Vector3
    sub(x: Vector3 | number = 0, y = 0, z = 0): Vector3 {
        if (x instanceof Vector3) {
            return new Vector3(this._x - x._x, this._y - x._y, this._z - x._z);
        } else {
            return new Vector3(this._x - x, this._y - y, this._z - z);
        }
    }

    mul(n = 1): Vector3 {
        return new Vector3(this._x * n, this._y * n, this._z * n);
    }

    div(n = 1): Vector3 {
        return new Vector3(this._x / n, this._y / n, this._z / n);
    }

    cross(other: Vector3): Vector3 {
        return new Vector3(
            this._y * other._z - this._z * other._y,
            this._z * other._x - this._x * other._z,
            this._x * other._y - this._y * other._x
        );
    }

    normalize(): Vector3 {
        let length = Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);

        if (length > 0.00001) {
            return new Vector3(this._x / length, this._y / length, this._z / length);
        } else {
            return new Vector3();
        }
    }

    rotateY(angle: number) {
        let s = -Math.sin(angle);
        let c = Math.cos(angle);

        return new Vector3(this._x * c - this._z * s, this._y, this._x * s + this._z * c);
    }

    copy() {
        return new Vector3(this._x, this._y, this._z);
    }

    distanceTo(v: Vector3): number {
        return Math.sqrt(Math.pow(this._x - v._x, 2) + Math.pow(this._y - v._y, 2) + Math.pow(this._z - v._z, 2));
    }

    toVector2() {
        return new Vector2(this._x, this._z);
    }

    length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }

    equals(v: Vector3): boolean {
        return this._x === v._x && this._y === v._y && this._z === v._z;
    }
}