import { Geometry } from "../geometry/Geometry";
import { Material } from "../material/Material";
import { Vector2 } from "../math/Vector2";
import { Object3D } from "./Object3D";

export class Mesh<G extends Geometry, M extends Material> extends Object3D {
    private _geometry: G
    private _material: M

    constructor(geometry: G, material: M) {
        super();

        this._geometry = geometry;
        this._material = material;
    }

    get geometry() {
        return this._geometry;
    }

    get material() {
        return this._material;
    }

    getBBox2D() {
        return this._geometry.collider ? this._geometry.collider.getBBox2D().map(v => v.add(this.position.x, this.position.z)) : null;
    }

    getClosestCorner2D(point: Vector2) {
        let corners = this.getBBox2D();

        if (corners === null) {
            return null;
        }

        let distances = [
            point.distanceTo(corners[0]),
            point.distanceTo(corners[1]),
            point.distanceTo(corners[2]),
            point.distanceTo(corners[3]),
        ];
        let min = Math.min(...distances);

        return corners.find((_, i) => distances[i] === min)!;
    }
}