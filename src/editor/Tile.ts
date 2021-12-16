import { Resources } from "../engine/resources/Resources";
import { Texture } from "../engine/resources/Texture";
import { EnemyType } from "../game/Enemy";
import { PickupType } from "../game/Pickup";

export type TileType = "wall" | "door" | "object" | "pickup" | "enemy" | null;

export class Tile {
    readonly x: number;
    readonly y: number;
    private _size: number;
    private _texture: Texture | null;
    private _textureName: string | null;
    private _selected: boolean;
    private _pickupType: PickupType | null;
    private _enemyType: EnemyType | null;
    type: TileType;
    readonly element: HTMLDivElement;

    constructor(x: number, y: number, size: number, type: TileType = null, texture: Texture | null = null, textureName: string | null = null) {
        this.x = x;
        this.y = y;
        this._size = size;
        this.type = type;
        this._texture = texture;
        this._textureName = textureName;
        this._pickupType = null;
        this._enemyType = null;

        this._selected = false;

        this.element = document.createElement("div");
        this.element.className = "tile";
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";
        this.element.setAttribute("title", `${x}, ${y}`);

        if (texture !== null) {
            this.element.style.backgroundImage = `url("${Resources.instance.data.texturesData[texture.reference]}")`;
            this.element.style.backgroundPositionX = -texture.u + "px";
            this.element.style.backgroundPositionY = -texture.v + "px";
        }
    }

    get selected() { return this._selected; }

    set selected(v: boolean) {
        this._selected = v;

        if (v === true) {
            this.element.classList.add("selected");
        } else {
            this.element.classList.remove("selected");
        }
    }

    get size() { return this._size; }
    set size(size: number) {
        this._size = size;
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";
    }

    get texture() { return this._texture; }
    set texture(v: Texture | null) {
        this._texture = v;

        if (v !== null) {
            let textureData = Resources.instance.data.texturesData[v.reference];
            let texW = textureData.image.naturalWidth;
            let texH = textureData.image.naturalHeight;
            let w = this.element.clientWidth;
            let h = this.element.clientHeight;

            let mulW = w / v.width;
            let mulH = h / v.height;

            this.element.style.backgroundImage = `url("${textureData.src}")`;
            this.element.style.backgroundPositionX = -v.u * mulW + "px";
            this.element.style.backgroundPositionY = -v.v * mulH + "px";
            this.element.style.backgroundSize = `${texW * mulW}px ${texH * mulH}px`;
        } else {
            this.element.style.backgroundImage = "";
        }
    }

    get textureName() { return this._textureName; }
    set textureName(v: string | null) { this._textureName = v; }

    get pickupType() { return this._pickupType; }
    set pickupType(v: PickupType | null) { this._pickupType = v; }

    get enemyType() { return this._enemyType; }
    set enemyType(v: EnemyType | null) { this._enemyType = v; }
}