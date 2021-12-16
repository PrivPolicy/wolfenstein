import { Mesh } from "../engine/core/Mesh";
import { PlaneGeometry } from "../engine/geometry/PlaneGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";

export class Plane extends Mesh<PlaneGeometry, TextureMaterial> {
    constructor(geometry: PlaneGeometry, material: TextureMaterial) {
        super(geometry, material);
    }
}