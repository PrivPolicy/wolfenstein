import { Matrix4 } from "../math/Matrix4";
import { Object3D } from "./Object3D";

export class Camera extends Object3D {
    constructor() {
        super();
    }

    getViewMatrix(): Matrix4 {
        let matrix = Matrix4.identity;
        matrix = Matrix4.translate(matrix, this.position.x, this.position.y, this.position.z);
        matrix = Matrix4.rotateY(matrix, this.rotation.y);
        return matrix;
    }

    getViewInverseMatrix(): Matrix4 {
        return Matrix4.inverse(this.getViewMatrix());
    }
}