import { Mesh } from "../engine/core/Mesh";
import { BoxGeometry } from "../engine/geometry/BoxGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";
import { Resources } from "../engine/resources/Resources";

export class Elevator extends Mesh<BoxGeometry, TextureMaterial> {
    private _active: boolean;

    constructor(size: number) {
        let geometry = new BoxGeometry(size, size, size);
        let material = new TextureMaterial(Resources.instance.data.textures.door_final_elevator_switch_down);

        super(geometry, material);

        this._active = false;
    }

    get active() { return this._active }
    set active(v: boolean) { this._active = v }

    switch() {
        this.material.setAll(Resources.instance.data.textures.door_final_elevator_switch_up);
    }
}