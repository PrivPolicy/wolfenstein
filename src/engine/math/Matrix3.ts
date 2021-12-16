export class Matrix3 {
    values: number[];

    constructor(values: number[]) {
        this.values = [...values];
    }

    static get identity() {
        return new Matrix3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
    }

    static multiply(a: Matrix3, b: Matrix3) {
        let a00 = a.values[0 * 3 + 0];
        let a01 = a.values[0 * 3 + 1];
        let a02 = a.values[0 * 3 + 2];
        let a10 = a.values[1 * 3 + 0];
        let a11 = a.values[1 * 3 + 1];
        let a12 = a.values[1 * 3 + 2];
        let a20 = a.values[2 * 3 + 0];
        let a21 = a.values[2 * 3 + 1];
        let a22 = a.values[2 * 3 + 2];

        let b00 = b.values[0 * 3 + 0];
        let b01 = b.values[0 * 3 + 1];
        let b02 = b.values[0 * 3 + 2];
        let b10 = b.values[1 * 3 + 0];
        let b11 = b.values[1 * 3 + 1];
        let b12 = b.values[1 * 3 + 2];
        let b20 = b.values[2 * 3 + 0];
        let b21 = b.values[2 * 3 + 1];
        let b22 = b.values[2 * 3 + 2];

        return new Matrix3([
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]);
    }

    static translation(x: number, y: number): Matrix3 {
        return new Matrix3([
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        ]);
    }

    static rotation(angle: number): Matrix3 {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        return new Matrix3([
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        ]);
    }

    static scaling(x: number, y: number): Matrix3 {
        return new Matrix3([
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ]);
    }

    static projection(width: number, height: number): Matrix3 {
        return new Matrix3([
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1
        ]);
    }

    static translate(matrix: Matrix3, x: number, y: number) {
        return Matrix3.multiply(matrix, Matrix3.translation(x, y));
    }

    static rotate(matrix: Matrix3, angle: number) {
        return Matrix3.multiply(matrix, Matrix3.rotation(angle));
    }

    static scale(matrix: Matrix3, x: number, y: number) {
        return Matrix3.multiply(matrix, Matrix3.scaling(x, y));
    }

    copy(): Matrix3 {
        return new Matrix3([...this.values]);
    }
}