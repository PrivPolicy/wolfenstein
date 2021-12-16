export class Euler {
    private _x: number
    private _y: number
    private _z: number

    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }

    set(e: Euler): Euler
    set(x?: number, y?: number, z?: number): Euler
    set(x: number | Euler = this._x, y = this._y, z = this._z): Euler {
        if (x instanceof Euler) {
            this._x = x._x;
            this._y = x._y;
            this._z = x._z;
        } else {
            this._x = x;
            this._y = y;
            this._z = z;
        }

        this.normalize();

        return this;
    }

    private normalize() {
        const TAU = (360).toRad();

        let x = this._x % TAU;
        let y = this._y % TAU;
        let z = this._z % TAU;

        if (x < 0) { x = TAU + x; }
        if (y < 0) { y = TAU + y; }
        if (z < 0) { z = TAU + z; }

        this._x = x;
        this._y = y;
        this._z = z;
    }

    copy(): Euler {
        return new Euler(this._x, this._y, this._z);
    }

    equals(v: Euler): boolean {
        return this._x === v._x && this._y === v._y && this._z === v._z;
    }
}