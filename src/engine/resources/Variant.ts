import { Sound, Sounds } from "./Sound";
import { Texture, Textures } from "./Texture";
import { Resources } from "./Resources";

export enum TexturesVariant {
    wall_cobblestone = "wall_cobblestone",
    wall_cobblestone_decoration = "wall_cobblestone_decoration"
}

export enum SoundsVariant {

}

export class Variant<T extends Sounds | Textures> {
    private readonly _entries: T[]
    private _items: (T extends Sounds ? Sound : Texture)[]
    readonly type: "sounds" | "textures"

    constructor(...entries: T[]) {
        this._entries = entries;
        this._items = [];

        if (entries[0] in Sounds) {
            this.type = "sounds";
        } else {
            this.type = "textures";
        }
    }

    load() {
        this._items = [];

        for (const entry of this._entries) {
            // @ts-ignore
            this._items.push(Resources.instance.data[this.type][entry]);
        }
    }

    random() {
        return this._items.random();
    }
}