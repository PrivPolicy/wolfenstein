import { Mesh } from "../engine/core/Mesh";
import { BoxGeometry } from "../engine/geometry/BoxGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";
import { Resources } from "../engine/resources/Resources";
import { Sounds } from "../engine/resources/Sound";
import { SoundEmitter } from "./SoundEmitter";

export class Door extends Mesh<BoxGeometry, TextureMaterial>{
    private coordOffset: number;
    private targetCoordOffset: number;
    private movementSpeed: number;
    private blockSize: number;
    private _state: "opened" | "closed" | "moving";
    private readonly selfCloseInterval: number;
    private openedTimestamp: number;
    private _selfCloseTimestamp: number;

    constructor(blockSize: number, movementSpeed: number, special = false) {
        let geometry = new BoxGeometry(blockSize, blockSize, 16);
        let material = new TextureMaterial([
            special ? Resources.instance.data.textures.door_final_front : Resources.instance.data.textures.door_front,
            Resources.instance.data.textures.transparent,
            Resources.instance.data.textures.transparent,
            special ? Resources.instance.data.textures.door_final_front : Resources.instance.data.textures.door_front,
            Resources.instance.data.textures.transparent,
            Resources.instance.data.textures.transparent,
        ]);

        super(geometry, material);

        this.coordOffset = 0;
        this.targetCoordOffset = 0;
        this.movementSpeed = movementSpeed;
        this.blockSize = blockSize;
        this._state = "closed";
        this.selfCloseInterval = 5000;
        this.openedTimestamp = Number.MAX_SAFE_INTEGER;
        this._selfCloseTimestamp = Number.MAX_SAFE_INTEGER;

        this.geometry.collider.setSize(blockSize, blockSize, blockSize);

        [this.geometry.textureCoords[36], this.geometry.textureCoords[37]] = [0, 0];
        [this.geometry.textureCoords[38], this.geometry.textureCoords[39]] = [1, 0];
        [this.geometry.textureCoords[40], this.geometry.textureCoords[41]] = [0, 1];
        [this.geometry.textureCoords[42], this.geometry.textureCoords[43]] = [0, 1];
        [this.geometry.textureCoords[44], this.geometry.textureCoords[45]] = [1, 0];
        [this.geometry.textureCoords[46], this.geometry.textureCoords[47]] = [1, 1];
    }

    get state() {
        return this._state;
    }

    get selfCloseTimestamp() {
        return this._selfCloseTimestamp;
    }

    getPosition() {
        if (this.rotation.y === (90).toRad()) {
            return this.position.sub(0, 0, this.coordOffset);
        } else {
            return this.position.sub(this.coordOffset);
        }
    }

    update(delta: number) {
        if (this.coordOffset !== this.targetCoordOffset) {
            let diff = this.targetCoordOffset - this.coordOffset;
            let maxMoveAmount = this.movementSpeed * delta;

            if (Math.abs(diff) <= maxMoveAmount) {
                this.coordOffset = this.targetCoordOffset;
            } else {
                this.coordOffset += maxMoveAmount * Math.sign(diff);
            }

            this._state = "moving";
        } else {
            this._state = this.targetCoordOffset === 0 ? "closed" : "opened";
        }

        this.geometry.collider.enabled = this._state !== "opened";
    }

    open() {
        if (this._state === "closed") {
            this.targetCoordOffset = this.blockSize;
            this._state = "moving";

            this.openedTimestamp = Date.now();
            this._selfCloseTimestamp = this.openedTimestamp + this.selfCloseInterval;

            SoundEmitter.instance.play(Sounds.door);
        }
    }

    close() {
        if (this._state === "opened") {
            this.targetCoordOffset = 0;
            this._state = "closed";

            this.openedTimestamp = Number.MAX_SAFE_INTEGER;
            this._selfCloseTimestamp = Number.MAX_SAFE_INTEGER;

            SoundEmitter.instance.play(Sounds.door);
        }
    }

    // toggle() {
    //     if (this._state === "closed") {
    //         this.open();
    //     } else if (this._state === "opened") {
    //         this.close();
    //     }
    // }

    // getBBox2D() {
    //     let pos = this.getPosition();
    //     return this.geometry.collider.getBBox2D().map(v => v.add(pos.x, pos.z));
    // }
}