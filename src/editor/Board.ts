import { Tile } from "./Tile";
import { Tile as LevelTile } from "../game/Builder";
import { Textures } from "../engine/resources/Texture";
import { Resources } from "../engine/resources/Resources";

export class Board {
    private readonly tiles: Tile[];
    readonly element: HTMLDivElement;
    // private tileSize: number;
    // private gridCount: number;
    private _selectedTile: Tile | null = null;

    // private readonly padding: number = 20;

    constructor() {
        this.tiles = [];
        // this.tileSize = 1;
        // this.gridCount = 1;
        this._selectedTile = null;

        this.element = document.createElement("div");
        this.element.id = "board";

        // window.addEventListener("resize", () => { this.resize() });
        this.element.addEventListener("click", (e) => { this.handleClick(e); });
        this.element.addEventListener("contextmenu", (e) => { this.handleContextMenu(e); });
    }

    get selectedTile() { return this._selectedTile; }

    set selectedTile(v: Tile | null) {
        this._selectedTile = v;
    }

    generateTiles(size: number) {
        this.element.style.width = 64 * size + "px";
        this.element.style.height = 64 * size + "px";

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                let tile = new Tile(x, y, 64);
                this.tiles.push(tile);
                this.element.append(tile.element);
            }
        }
    }

    clearTiles() {
        this.tiles.forEach(tile => {
            this.element.removeChild(tile.element);
        });

        this.tiles.length = 0;
    }

    // resize(parent = this.element.parentElement!) {
    //     let w = parent.clientWidth;
    //     let h = parent.clientHeight;

    //     let d = Math.min(w, h) - 2 * this.padding;

    //     this.element.style.width = d + "px";
    //     this.element.style.height = d + "px";

    //     this.tileSize = d / this.gridCount;
    // }

    handleClick(e: MouseEvent) {
        if (e.target !== e.currentTarget) {
            let tile = this.findTile(e.target as HTMLDivElement);

            if (tile !== null && this._selectedTile !== null) {
                tile.texture = this._selectedTile.texture;
                tile.type = this._selectedTile.type;
                tile.textureName = this._selectedTile.textureName;
                tile.pickupType = this._selectedTile.pickupType;
                tile.enemyType = this._selectedTile.enemyType;
            }
        }
    }

    handleContextMenu(e: MouseEvent) {
        if (e.target !== e.currentTarget) {
            e.preventDefault();

            let tile = this.findTile(e.target as HTMLDivElement);

            if (tile !== null) {
                tile.texture = null;
                tile.type = null;
                tile.textureName = null;
                tile.pickupType = null;
                tile.enemyType = null;
            }
        }
    }

    setTile(data: LevelTile) {
        if (data.type === "enemy")
            console.log(data);

        let tile = this.tiles.find(t => t.x === data.posX && t.y === data.posZ);

        if (tile !== undefined) {
            tile.type = data.type;

            if (Array.isArray(data.texture)) {
                tile.textureName = data.texture[0].texture;
            } else {
                tile.textureName = data.texture.texture;
            }

            tile.texture = Resources.instance.data.textures[tile.textureName as Textures];

            if (data.type === "pickup") {
                tile.pickupType = data.pickupType;
            } else {
                tile.pickupType = null;
            }

            if (data.type === "enemy") {
                tile.enemyType = data.enemyType;
            } else {
                tile.enemyType = null;
            }


        } else {
            console.warn("Could not load:", tile);
        }
    }

    findTile(element: HTMLDivElement): Tile | null {
        return this.tiles.find(tile => tile.element === element) || null;
    }

    save() {
        let tiles: LevelTile[] = [];

        this.tiles.forEach(tile => {
            if (tile.type !== null) {
                let o: any = {
                    posX: tile.x,
                    posY: 0,
                    posZ: tile.y,
                    type: tile.type,
                    texture: {
                        type: "normal",
                        texture: tile.textureName as Textures
                    },
                }

                if (tile.type === "pickup") { o.pickupType = tile.pickupType; }
                if (tile.type === "object") { o.colliderEnabled = true; o.raycastTarget = false; }
                if (tile.type === "enemy") { o.enemyType = "trooper"; }
                if (tile.type === "door") {
                    let th1 = this.tiles.find(t => t.x === tile.x - 1 && t.y === tile.y && t.type === "wall");
                    let th2 = this.tiles.find(t => t.x === tile.x + 1 && t.y === tile.y && t.type === "wall");
                    let tv1 = this.tiles.find(t => t.x === tile.x && t.y === tile.y - 1 && t.type === "wall");
                    let tv2 = this.tiles.find(t => t.x === tile.x && t.y === tile.y + 1 && t.type === "wall");

                    if (th1 !== undefined && th2 !== undefined) {
                        o.rotY = 0;
                    } else if (tv1 !== undefined && tv2 !== undefined) {
                        o.rotY = 90;
                    }
                }

                tiles.push(o);
            }
        });

        let filename = prompt("Filename:", Date.now().toString()) || Date.now().toString();

        let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tiles));
        let a = document.createElement("a");
        a.setAttribute("href", data);
        a.setAttribute("download", `${filename}.json`);
        a.click();
    }

    load() {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.click();

        input.addEventListener("change", () => {
            if (input.files === null || input.files.length === 0) {
                return alert("No file selected!");
            }

            let name = input.files[0];
            let reader = new FileReader();
            reader.readAsText(name, "utf-8");

            reader.onload = (e) => {
                try {
                    if (e.target === null || e.target.result === null || e.target.result instanceof ArrayBuffer) {
                        throw new Error("Parse error!");
                    }

                    let data: LevelTile[] = JSON.parse(e.target.result);

                    let size = 0;
                    data.forEach(tile => {
                        if (Math.max(tile.posX, tile.posZ) > size) {
                            size = Math.max(tile.posX, tile.posZ);
                        }
                    });

                    this.clearTiles();
                    this.generateTiles(size + 1);

                    data.forEach(tile => {
                        this.setTile(tile);
                    });
                } catch (e) {
                    console.warn(e);
                    alert(`Parse error! ${e}`);
                }
            }
        });
    }
}