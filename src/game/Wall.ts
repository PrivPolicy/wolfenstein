import { Mesh } from "../engine/core/Mesh";
import { BoxGeometry } from "../engine/geometry/BoxGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";

export class Wall extends Mesh<BoxGeometry, TextureMaterial> {
    constructor(geometry: BoxGeometry, material: TextureMaterial) {
        super(geometry, material);
    }
}