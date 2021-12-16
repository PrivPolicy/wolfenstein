import { Resources } from "../engine/resources/Resources";
import { Textures } from "../engine/resources/Texture";
import { PickupType } from "../game/Pickup";
import { Tile } from "./Tile";

export class Controls {
    readonly element: HTMLDivElement;
    private _selectedTile: Tile | null;

    constructor() {
        this.element = document.createElement("div");
        this.element.id = "controls";

        this._selectedTile = null;
    }

    get selectedTile() { return this._selectedTile; }

    set selectedTile(v: Tile | null) {
        if (this._selectedTile !== null) { this._selectedTile.selected = false; }
        this._selectedTile = v;
        if (this._selectedTile !== null) { this._selectedTile.selected = true; }
    }

    generate(
        onGenerate: (n: number) => void,
        onSave: () => void,
        onLoad: () => void,
        onClick: (tile: Tile) => void
    ) {
        let h1 = document.createElement("h1");
        h1.innerText = "Controls";

        this.element.append(h1);

        this.generateSettings(onGenerate, onSave, onLoad);
        this.generateTiles(onClick);
    }

    private generateSettings(
        onGenerate: (n: number) => void,
        onSave: () => void,
        onLoad: () => void,
    ) {
        let div = document.createElement("div");
        div.id = "settings";

        let h2 = document.createElement("h2");
        h2.innerText = "Settings";

        let input = document.createElement("input");
        input.value = "16";
        input.type = "number";

        let generate = document.createElement("button");
        generate.innerText = "Generate";
        generate.addEventListener("click", () => { onGenerate(input.valueAsNumber) })

        let save = document.createElement("button");
        save.innerText = "Save";
        save.addEventListener("click", () => { onSave() });

        let load = document.createElement("button");
        load.innerText = "Load";
        load.addEventListener("click", () => { onLoad() });

        div.append(h2, input, generate, save, load);
        this.element.append(div);
    }

    private generateTiles(onClick: (tile: Tile) => void) {
        let div = document.createElement("div");
        div.id = "tiles";

        let h2 = document.createElement("h2");
        h2.innerText = "Tiles";

        let walls: Tile[] = [];
        let doors: Tile[] = [];
        let objects: Tile[] = [];
        let pickups: Tile[] = [];
        let enemies: Tile[] = [];

        for (const key in Resources.instance.data.textures) {
            let texture = Resources.instance.data.textures[key as Textures];

            if (key.startsWith("wall_")) { walls.push(new Tile(0, 0, 64, "wall", texture, key)); }
            else if (key.startsWith("door_front")) { doors.push(new Tile(0, 0, 64, "door", texture, key)); }
            else if (key.startsWith("object_")) { objects.push(new Tile(0, 0, 64, "object", texture, key)); }
            else if (key.startsWith("pickup_")) {
                let p = new Tile(0, 0, 64, "pickup", texture, key);
                p.pickupType = PickupType[key.replace("pickup_", "") as keyof typeof PickupType];
                pickups.push(p);
            }
            else if (key.startsWith("enemy_trooper_attack_01")) { enemies.push(new Tile(0, 0, 64, "enemy", texture, key)) }
        }

        div.append(
            this.generateSection(walls, "Walls", onClick),
            this.generateSection(doors, "Doors", onClick),
            this.generateSection(objects, "Objects", onClick),
            this.generateSection(pickups, "Pickups", onClick),
            this.generateSection(enemies, "Enemies", onClick),
        );
        this.element.append(h2, div);
    }

    private generateSection(arr: Tile[], name: string, onClick: (tile: Tile) => void): HTMLDivElement {
        let div = document.createElement("div");
        div.className = "section";

        let h3 = document.createElement("h3");
        h3.innerText = name;

        div.append(h3);

        arr.forEach(tile => {
            div.append(this.generateTile(tile, onClick));
        })

        return div;
    }

    private generateTile(tile: Tile, onClick: (tile: Tile) => void): HTMLDivElement {
        let div = document.createElement("div");

        if (tile.texture !== null) {
            let preview = tile.element;
            preview.className = "preview";
            preview.style.backgroundImage = `url("${Resources.instance.data.texturesData[tile.texture.reference].src}")`;
            preview.style.backgroundPositionX = -tile.texture.u + "px";
            preview.style.backgroundPositionY = -tile.texture.v + "px";

            div.addEventListener("click", (e) => { if (e.target !== e.currentTarget) { onClick(tile) } })

            div.append(preview);
        }

        return div;
    }
}