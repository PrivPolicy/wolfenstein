import { Mesh } from "../engine/core/Mesh";
import { PlaneGeometry } from "../engine/geometry/PlaneGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";

export class StaticObject extends Mesh<PlaneGeometry, TextureMaterial> {
    constructor(size: number, texture: TextureMaterial) {
        super(new PlaneGeometry(size, size), texture);
    }
}