export class Vector2 {
    private _x: number
    private _y: number

    static get left() { return new Vector2(-1, 0) };
    static get right() { return new Vector2(1, 0) };
    static get down() { return new Vector2(0, -1) };
    static get up() { return new Vector2(0, 1) };

    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    get x() { return this._x; }
    get y() { return this._y; }

    set(x: Vector2): Vector2
    set(x: number, y: number): Vector2
    set(x: number | Vector2 = this._x, y = this._y): Vector2 {
        if (x instanceof Vector2) {
            this._x = x._x;
            this._y = x._y;
        } else {
            this._x = x;
            this._y = y;
        }

        return this;
    }

    add(x: Vector2): Vector2
    add(x: number, y?: number): Vector2
    add(x: Vector2 | number = 0, y = 0): Vector2 {
        if (x instanceof Vector2) {
            return new Vector2(this._x + x._x, this._y + x._y);
        } else {
            return new Vector2(this._x + x, this._y + y);
        }
    }

    sub(x: Vector2): Vector2
    sub(x: number, y?: number): Vector2
    sub(x: Vector2 | number = 0, y = 0): Vector2 {
        if (x instanceof Vector2) {
            return new Vector2(this._x - x._x, this._y - x._y);
        } else {
            return new Vector2(this._x - x, this._y - y);
        }
    }

    mul(n = 1): Vector2 {
        return new Vector2(this._x * n, this._y * n);
    }

    div(n = 1): Vector2 {
        return new Vector2(this._x / n, this._y / n);
    }

    normalize(): Vector2 {
        let length = this.length();

        if (length > 0.00001) {
            return new Vector2(this._x / length, this._y / length);
        } else {
            return new Vector2();
        }
    }

    rotate(angle: number) {
        let s = -Math.sin(angle);
        let c = Math.cos(angle);

        return new Vector2(this._x * c - this._y * s, this._x * s + this._y * c);
    }

    copy() {
        return new Vector2(this._x, this._y);
    }

    distanceTo(v: Vector2): number {
        return Math.sqrt(Math.pow(this._x - v._x, 2) + Math.pow(this._y - v._y, 2));
    }

    length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    angle(v: Vector2) {
        return Math.atan2(this._x * v._y - this._y * v._x, this._x * v._x + this._y * v._y);
    }

    dot(v: Vector2) {
        return this._x * v._x + this._y * v._y;
    }
}