import { Vector3 } from "./Vector3";

export class Matrix4 {
    values: number[];

    constructor(values: number[]) {
        this.values = [...values];
    }

    static get identity() {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static multiply(a: Matrix4, b: Matrix4) {
        let a00 = a.values[0 * 4 + 0];
        let a01 = a.values[0 * 4 + 1];
        let a02 = a.values[0 * 4 + 2];
        let a03 = a.values[0 * 4 + 3];
        let a10 = a.values[1 * 4 + 0];
        let a11 = a.values[1 * 4 + 1];
        let a12 = a.values[1 * 4 + 2];
        let a13 = a.values[1 * 4 + 3];
        let a20 = a.values[2 * 4 + 0];
        let a21 = a.values[2 * 4 + 1];
        let a22 = a.values[2 * 4 + 2];
        let a23 = a.values[2 * 4 + 3];
        let a30 = a.values[3 * 4 + 0];
        let a31 = a.values[3 * 4 + 1];
        let a32 = a.values[3 * 4 + 2];
        let a33 = a.values[3 * 4 + 3];

        let b00 = b.values[0 * 4 + 0];
        let b01 = b.values[0 * 4 + 1];
        let b02 = b.values[0 * 4 + 2];
        let b03 = b.values[0 * 4 + 3];
        let b10 = b.values[1 * 4 + 0];
        let b11 = b.values[1 * 4 + 1];
        let b12 = b.values[1 * 4 + 2];
        let b13 = b.values[1 * 4 + 3];
        let b20 = b.values[2 * 4 + 0];
        let b21 = b.values[2 * 4 + 1];
        let b22 = b.values[2 * 4 + 2];
        let b23 = b.values[2 * 4 + 3];
        let b30 = b.values[3 * 4 + 0];
        let b31 = b.values[3 * 4 + 1];
        let b32 = b.values[3 * 4 + 2];
        let b33 = b.values[3 * 4 + 3];

        return new Matrix4([
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ]);
    }

    static translation(x: number, y: number, z: number): Matrix4 {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ]);
    }

    static rotationX(angle: number): Matrix4 {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        return new Matrix4([
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ]);
    }

    static rotationY(angle: number): Matrix4 {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        return new Matrix4([
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ]);
    }

    static rotationZ(angle: number): Matrix4 {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        return new Matrix4([
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    static scaling(x: number, y: number, z: number): Matrix4 {
        return new Matrix4([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1,
        ]);
    }

    static projection(width: number, height: number, depth: number): Matrix4 {
        return new Matrix4([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 2 / depth, 0,
            -1, 1, 0, 1,
        ]);
    }

    static perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
        let f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        let rInv = 1.0 / (near - far);

        return new Matrix4([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rInv, -1,
            0, 0, near * far * rInv * 2, 0
        ]);
    }

    static translate(matrix: Matrix4, x: number, y: number, z: number) {
        return Matrix4.multiply(matrix, Matrix4.translation(x, y, z));
    }

    static rotateX(matrix: Matrix4, angle: number) {
        return Matrix4.multiply(matrix, Matrix4.rotationX(angle));
    }

    static rotateY(matrix: Matrix4, angle: number) {
        return Matrix4.multiply(matrix, Matrix4.rotationY(angle));
    }

    static rotateZ(matrix: Matrix4, angle: number) {
        return Matrix4.multiply(matrix, Matrix4.rotationZ(angle));
    }

    static scale(matrix: Matrix4, x: number, y: number, z: number) {
        return Matrix4.multiply(matrix, Matrix4.scaling(x, y, z));
    }

    static inverse(matrix: Matrix4) {
        let m00 = matrix.values[0 * 4 + 0];
        let m01 = matrix.values[0 * 4 + 1];
        let m02 = matrix.values[0 * 4 + 2];
        let m03 = matrix.values[0 * 4 + 3];
        let m10 = matrix.values[1 * 4 + 0];
        let m11 = matrix.values[1 * 4 + 1];
        let m12 = matrix.values[1 * 4 + 2];
        let m13 = matrix.values[1 * 4 + 3];
        let m20 = matrix.values[2 * 4 + 0];
        let m21 = matrix.values[2 * 4 + 1];
        let m22 = matrix.values[2 * 4 + 2];
        let m23 = matrix.values[2 * 4 + 3];
        let m30 = matrix.values[3 * 4 + 0];
        let m31 = matrix.values[3 * 4 + 1];
        let m32 = matrix.values[3 * 4 + 2];
        let m33 = matrix.values[3 * 4 + 3];
        let tmp_0 = m22 * m33;
        let tmp_1 = m32 * m23;
        let tmp_2 = m12 * m33;
        let tmp_3 = m32 * m13;
        let tmp_4 = m12 * m23;
        let tmp_5 = m22 * m13;
        let tmp_6 = m02 * m33;
        let tmp_7 = m32 * m03;
        let tmp_8 = m02 * m23;
        let tmp_9 = m22 * m03;
        let tmp_10 = m02 * m13;
        let tmp_11 = m12 * m03;
        let tmp_12 = m20 * m31;
        let tmp_13 = m30 * m21;
        let tmp_14 = m10 * m31;
        let tmp_15 = m30 * m11;
        let tmp_16 = m10 * m21;
        let tmp_17 = m20 * m11;
        let tmp_18 = m00 * m31;
        let tmp_19 = m30 * m01;
        let tmp_20 = m00 * m21;
        let tmp_21 = m20 * m01;
        let tmp_22 = m00 * m11;
        let tmp_23 = m10 * m01;

        let t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        let t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        let t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        let t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        return new Matrix4([
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
        ]);

    }

    copy(): Matrix4 {
        return new Matrix4([...this.values]);
    }

    static lookAt(from: Vector3, to: Vector3): Matrix4 {
        let zAxis = from.sub(to).normalize();
        let xAxis = Vector3.up.cross(zAxis).normalize();
        let yAxis = zAxis.cross(xAxis).normalize();

        return new Matrix4([
            xAxis.x, xAxis.y, xAxis.z, 0,
            yAxis.x, yAxis.y, yAxis.z, 0,
            zAxis.x, zAxis.y, zAxis.z, 0,
            from.x, from.y, from.z, 1
        ]);
    }
}