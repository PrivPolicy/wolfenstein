import { Scene } from "../engine/core/Scene";
import { BoxGeometry } from "../engine/geometry/BoxGeometry";
import { PlaneGeometry } from "../engine/geometry/PlaneGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";
import { Resources } from "../engine/resources/Resources";
import { Textures } from "../engine/resources/Texture";
import { TexturesVariant } from "../engine/resources/Variant";
import { Pickup, PickupType } from "./Pickup";
import { Plane } from "./Plane";
import { Wall } from "./Wall";
import { StaticObject } from "./StaticObject";
import { Enemies, Enemy, EnemyType } from "./Enemy";
import { Vector3 } from "../engine/math/Vector3";
import { Door } from "./Door";
import { Elevator } from "./Elevator";

export type LevelData = Tile[];

export type TileJSON = IWall & IPickup & IObject & IDoor & IEnemy & IElevator;
export type Tile = IWall | IPickup | IObject | IDoor | IEnemy | IElevator;

export interface ITile {
    type: string
    posX: number
    posY: number
    posZ: number
    texture: Texture | Texture[]
}

export type Texture = ITextureNormal | ITextureVariant;

export interface ITexure {
    type: string
}

export interface ITextureNormal extends ITexure {
    type: "normal"
    texture: keyof typeof Textures
}

export interface ITextureVariant extends ITexure {
    type: "variant"
    texture: keyof typeof TexturesVariant
}

export interface IWall extends ITile {
    type: "wall"
}

export interface IObject extends ITile {
    type: "object"
    colliderEnabled: boolean,
    raycastTarget: boolean
}

export interface IPickup extends ITile {
    type: "pickup"
    pickupType: PickupType
}

export interface IEnemy extends ITile {
    type: "enemy"
    enemyType: EnemyType
}

export interface IElevator extends ITile {
    type: "elevator"
}

export interface IDoor extends ITile {
    type: "door"
    rotY: number
    special?: boolean
}

export class Builder {
    private constructor() { }

    static build(data: LevelData, size: number): Scene {
        let scene = new Scene();
        let maxX = 0;
        let maxZ = 0

        data.forEach(tile => {
            if (tile.posX > maxX) { maxX = tile.posX; }
            if (tile.posZ > maxZ) { maxZ = tile.posZ; }

            try {
                if (tile.type === "wall") {
                    let geometry = new BoxGeometry(size, size, size);
                    let material = Builder.getMaterial(tile);

                    let wall = new Wall(geometry, material);
                    wall.position.set(tile.posX * size, tile.posY * size, tile.posZ * size);
                    scene.add(wall);
                } else if (tile.type === "pickup") {
                    let pickup = new Pickup(size, tile.pickupType);
                    pickup.position.set(tile.posX * size, tile.posY * size, tile.posZ * size);
                    pickup.rotation.set((90).toRad(), (180).toRad(), 0);

                    scene.add(pickup);
                } else if (tile.type === "object") {
                    let material = Builder.getMaterial(tile);

                    let object = new StaticObject(size, material);
                    object.position.set(tile.posX * size, tile.posY * size, tile.posZ * size);
                    object.rotation.set((90).toRad(), (180).toRad(), 0);

                    let dummyWallGeometry = new BoxGeometry(size, size, size);
                    dummyWallGeometry.collider.enabled = tile.colliderEnabled;
                    dummyWallGeometry.collider.raycastTarget = tile.raycastTarget;
                    let dummyWallMaterial = new TextureMaterial(Resources.instance.data.textures.transparent);
                    let dummyWall = new Wall(dummyWallGeometry, dummyWallMaterial);
                    dummyWall.position.set(tile.posX * size, tile.posY * size, tile.posZ * size);

                    scene.add(object, dummyWall);
                } else if (tile.type === "enemy") {
                    let enemy = new Enemy(size, Enemies.trooperStateMachine, 25, 100);
                    enemy.moveTo(new Vector3(tile.posX * size, tile.posY * size, tile.posZ * size), true);
                    enemy.lookVector.set(0, 1);
                    enemy.rotation.set((90).toRad(), (180).toRad(), 0);

                    scene.add(enemy);
                } else if (tile.type === "door") {
                    let door = new Door(size, size, tile.special);
                    door.position.set(tile.posX * size, tile.posY * size, tile.posZ * size);
                    door.rotation.set(undefined, tile.rotY.toRad(), undefined);

                    scene.add(door);
                } else if (tile.type === "elevator") {
                    let elevator = new Elevator(size);
                    elevator.position.set(tile.posX * size, tile.posY * size, tile.posZ * size);

                    scene.add(elevator);
                }
            } catch {
                console.warn("Could not build object:", tile);
            }
        });

        let w = (maxX + 1) * size;
        let h = (maxZ + 1) * size;

        let floor = new Plane(new PlaneGeometry(w, h), new TextureMaterial(Resources.instance.data.textures.floor));
        floor.position.set((w - size) / 2, -size / 2, (h - size) / 2);
        scene.add(floor);

        return scene;
    }

    static getMaterial(tile: Tile) {
        if (Array.isArray(tile.texture)) {
            let materials = [];

            for (const texture of tile.texture) {
                if (texture.type === "normal") {
                    materials.push(Resources.instance.data.textures[texture.texture]);
                } else {
                    materials.push(Resources.instance.data.texturesVariant[texture.texture].random());
                }
            }

            return new TextureMaterial(materials);
        } else {
            if (tile.texture.type === "normal") {
                return new TextureMaterial(Resources.instance.data.textures[tile.texture.texture]);
            } else {
                return new TextureMaterial(Resources.instance.data.texturesVariant[tile.texture.texture].random());
            }
        }
    }
}