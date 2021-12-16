//@ts-ignore
import "./ExtendNative";
import level1_1 from "../assets/levels/1-1-all.json";
// import level1_1 from "../assets/levels/debug.json";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Renderer } from "../engine/core/Renderer";
// import { Utils } from "./Utils";
import { Builder } from "./Builder";
import { Keyboard } from "./Keyboard";
import { Scene } from "../engine/core/Scene";
import { Vector3 } from "../engine/math/Vector3";
import { Mesh } from "../engine/core/Mesh";
import { BoxGeometry } from "../engine/geometry/BoxGeometry";
import { Material } from "../engine/material/Material";
import { Vector2 } from "../engine/math/Vector2";
import { Pickup, PickupType } from "./Pickup";
import { Weapon, WeaponType } from "./Weapon";
import { StateMachine } from "./StateMachine";
import { Door } from "./Door";
import { Raycaster } from "./Raycaster";
import { SoundEmitter } from "./SoundEmitter";
import { Sounds } from "../engine/resources/Sound";
import { StaticObject } from "./StaticObject";
import { Elevator } from "./Elevator";
import { Resources } from "../engine/resources/Resources";

const coords = document.getElementById("coords")!;
// const aspectRatio = 8 / 5;
const BLOCKSIZE = 128;
const BLOCKSIZE_ROOT2 = BLOCKSIZE * Math.sqrt(2);
const DOOR_DOT = 0.92;

export interface GameReturnData {
    score: number
    floor: number
    lives: number
    health: number
    ammo: number,
    hasKeyGolden: boolean,
    hasKeySilver: boolean,
    weapon: Weapon,
    weaponStateMachine: StateMachine
}

export class Game {
    private player: Player;
    // private readonly enemy: Enemy;
    private readonly renderer: Renderer;
    private scene: Scene;
    private readonly keyboard: Keyboard;

    private score: number;
    private floor: number;

    private _won: boolean;

    constructor(lives: number) {
        this._won = false;

        this.player = new Player(5 * BLOCKSIZE, (120).toRad(), lives);
        // this.player.position.set(BLOCKSIZE * 2, 0, BLOCKSIZE * 2);
        // this.player.position.set(BLOCKSIZE * 29, 0, BLOCKSIZE * 57);
        this.player.position.set(BLOCKSIZE * 23, 0, BLOCKSIZE * 47);
        this.player.rotation.set(undefined, (-90).toRad(), undefined);
        this.player.setShootFunction((i, n) => {
            this.shootEnemies(i, n);
        });

        // this.enemy = new Enemy(BLOCKSIZE, Enemies.trooperStateMachine, 25, 100);
        // this.enemy.moveTo(new Vector3(5 * BLOCKSIZE, 0, 5 * BLOCKSIZE), true);
        // this.enemy.lookVector.set(0, 1);
        // this.enemy.rotation.set((90).toRad(), (180).toRad(), 0);

        // let pickup1 = new Pickup(BLOCKSIZE, PickupType.cross);
        // pickup1.position.set(200, 0, 200);
        // pickup1.rotation.set((90).toRad(), (180).toRad(), 0);

        // let door = new Door(BLOCKSIZE, BLOCKSIZE);
        // door.position.set(BLOCKSIZE, 0, 0);

        this.renderer = new Renderer();
        // window.addEventListener("resize", () => {
        //     Utils.resizeCanvas(this.renderer.canvas, aspectRatio);
        // });
        // Utils.resizeCanvas(this.renderer.canvas, aspectRatio);
        this.renderer.canvas.id = "game";
        // this.renderer.canvas.width = 608;
        // this.renderer.canvas.height = 303;
        this.renderer.canvas.width = 406;
        this.renderer.canvas.height = 202;

        this.scene = Builder.build(level1_1, BLOCKSIZE);
        // this.scene.add(this.enemy);

        // this.scene.add(pickup1);
        // this.scene.add(door);

        this.scene.children.forEach(child => {
            if (child instanceof Enemy) {
                child.setShootFunction((i, n) => {
                    this.shootPlayer(i, n, child);
                });
            }
        });

        this.keyboard = new Keyboard();
        this.keyboard.attachEvents();

        this.score = 0;
        this.floor = 1;

        // this.enemy.moveTo(new Vector3(8 * BLOCKSIZE, 0, 2 * BLOCKSIZE));
    }

    get canvas() { return this.renderer.canvas }
    get won() { return this._won }

    private shootEnemies(index: number, name?: string) {
        if (name !== undefined) {
            if ((this.player.ammo > 0 && this.player.weapon.type !== WeaponType.knife) || this.player.weapon.type === WeaponType.knife) {

                switch (name) {
                    case "shoot_knife": { SoundEmitter.instance.play(Sounds.knife); break; }
                    case "shoot_pistol": { SoundEmitter.instance.play(Sounds.pistol); break; }
                    case "shoot_machinegun": { SoundEmitter.instance.play(Sounds.machine_gun); break; }
                    case "shoot_chaingun": { SoundEmitter.instance.play(Sounds.gatling_gun); break; }
                }

                let maxLength = name === "shoot_knife" ? BLOCKSIZE : undefined;

                if (maxLength === undefined) {
                    this.player.changeAmmo(-1);
                }

                let result = Raycaster.raycastEnemies(
                    BLOCKSIZE,
                    this.player.position.toVector2(),
                    Vector3.backwards.rotateY(this.player.rotation.y).toVector2().normalize(),
                    this.scene,
                    maxLength
                );

                if (result !== null) {
                    result.changeHealth(-this.player.weapon.damage, () => {
                        let p = new Pickup(BLOCKSIZE, PickupType.clip_used);
                        p.position.set(result!.position.x, result!.position.y, result!.position.z);
                        p.rotation.set((90).toRad(), (180).toRad(), 0);
                        this.scene.add(p);
                        this.score += result!.score;
                    });
                }
            } else {
                this.player.attackStop();
            }
        }
    }

    private shootPlayer(index: number, name: string | undefined, enemy: Enemy) {
        if (name === "shoot") {
            let res = Raycaster.raycastPlayer(BLOCKSIZE, enemy.position.toVector2(), this.player.position.sub(enemy.position).toVector2().normalize(), this.scene, undefined, this.player);

            if (res === true) {
                this.player.changeHealth(-Math.round(100 * (Math.random() * 0.8 + 0.6)));
                SoundEmitter.instance.play(Sounds.player_pain_2);
                SoundEmitter.instance.play(Sounds.pistol);
            }
        }
    }

    render(delta: number): GameReturnData | "GAME_OVER" | "DEAD" {
        if (this.player.lives === 0 && this.player.health === 0) {
            // game over
            return "GAME_OVER";
        } else if (this.player.health === 0) {
            // die
            return "DEAD";
        }

        if (this.keyboard.data.weapon_knife) { this.player.changeWeapon(WeaponType.knife) }
        if (this.keyboard.data.weapon_pistol) { this.player.changeWeapon(WeaponType.pistol) }
        if (this.keyboard.data.weapon_machinegun) { this.player.changeWeapon(WeaponType.machinegun) }
        if (this.keyboard.data.weapon_chaingun) { this.player.changeWeapon(WeaponType.chaingun) }
        if (this.keyboard.data.attack === true) {
            if ((this.player.ammo > 0 && this.player.weapon.type !== WeaponType.knife) || this.player.weapon.type === WeaponType.knife) {
                this.player.attackStart();
            }
        }
        if (this.keyboard.data.attack === false) { this.player.attackStop() }
        // if (this.keyboard.data.raycast === true) {
        //     let result = Raycaster.raycastEnemies(
        //         BLOCKSIZE,
        //         this.player.position.toVector2(),
        //         Vector3.backwards.rotateY(this.player.rotation.y).toVector2().normalize(),
        //         // Vector2.down.rotate(this.player.rotation.y),
        //         this.scene
        //     );

        //     if (result === null) {
        //         console.log("Hit nothing!");
        //     } else {
        //         console.log("Hit an enemy!");
        //     }
        // }

        let playerMoveVector = new Vector3();

        if (this.keyboard.data.forwards) {
            let movementVector = Vector3.forwards.rotateY(this.player.rotation.y).mul(-this.player.walkingSpeed * delta);
            playerMoveVector = playerMoveVector.add(movementVector);
        }
        if (this.keyboard.data.backwards) {
            let movementVector = Vector3.backwards.rotateY(this.player.rotation.y).mul(-this.player.walkingSpeed * delta);
            playerMoveVector = playerMoveVector.add(movementVector);
        }

        let finalPosition = this.player.position.add(playerMoveVector);

        const DIVFACTOR = 1;
        let playerCollisionRadiusDivided = this.player.collisionRadius / DIVFACTOR;

        let boxColliders: Mesh<BoxGeometry, Material>[] = [];
        let pickups: Pickup[] = [];
        let objects: StaticObject[] = [];
        let doors: Door[] = [];
        let enemies: Enemy[] = [];
        let elevators: Elevator[] = [];

        this.scene.children.forEach(child => {
            if (child instanceof Pickup) {
                pickups.push(child);
            }

            if (child instanceof Door) {
                doors.push(child);
            }

            if (child instanceof StaticObject) {
                objects.push(child);
            }

            if (child instanceof Enemy) {
                enemies.push(child);
            }

            if (child instanceof Elevator) {
                elevators.push(child);
            }

            if (child instanceof Mesh) {
                if (child.geometry instanceof BoxGeometry) {
                    boxColliders.push(child);
                }
            }
        });

        boxColliders.sort((a, b) => {
            return a.position.distanceTo(finalPosition) - b.position.distanceTo(finalPosition);
        });

        boxColliders.forEach(child => {
            if (child.geometry.collider.enabled === true && this.player.position.distanceTo(child.position) < BLOCKSIZE * 2.5) {
                let bbox = child.getBBox2D()!;

                let lines: { readonly a: Vector2, readonly b: Vector2 }[] = [
                    { a: bbox[0], b: bbox[1] },
                    { a: bbox[1], b: bbox[2] },
                    { a: bbox[2], b: bbox[3] },
                    { a: bbox[3], b: bbox[0] },
                ];

                let closestCorner = child.getClosestCorner2D(new Vector2(finalPosition.x, finalPosition.z))!;
                let isEdge = false;

                lines.forEach(line => {
                    //https://mathworld.wolfram.com/Circle-LineIntersection.html
                    let relA = line.a.sub(finalPosition.x, finalPosition.z).div(DIVFACTOR);
                    let relB = line.b.sub(finalPosition.x, finalPosition.z).div(DIVFACTOR);
                    let relLine = { a: relA, b: relB };

                    let dx = relLine.a.x - relLine.b.x;
                    let dy = relLine.a.y - relLine.b.y;
                    let dr = Math.sqrt(dx * dx + dy * dy);
                    let dr2 = dr ** 2;
                    let det = relLine.a.x * relLine.b.y - relLine.b.x * relLine.a.y;

                    let dis = (playerCollisionRadiusDivided ** 2) * (dr2) - (det ** 2);

                    if (dis >= 0) {
                        let approachX = line.a.x === line.b.x && finalPosition.z.isBetween(line.a.y, line.b.y);
                        let approachZ = line.a.y === line.b.y && finalPosition.x.isBetween(line.a.x, line.b.x);

                        isEdge = approachX || approachZ;

                        let cornerCollision = false;

                        let diff = new Vector2(finalPosition.x, finalPosition.z).sub(closestCorner);

                        if (diff.length() < playerCollisionRadiusDivided
                            && finalPosition.z.isBetween(line.a.y, line.b.y) === false
                            && finalPosition.x.isBetween(line.a.x, line.b.x) === false
                            && isEdge === false) {

                            if (line.a.x === line.b.x && Math.abs(diff.x) < Math.abs(diff.y)) {
                                cornerCollision = true;
                                approachX = true;
                            } else if (line.a.y === line.b.y && Math.abs(diff.x) >= Math.abs(diff.y)) {
                                cornerCollision = true;
                                approachZ = true;
                            }
                        }

                        if (approachX || approachZ) {
                            if (approachX) {
                                if (cornerCollision) {
                                    let a = playerCollisionRadiusDivided - Math.abs(diff.y);
                                    let v = Math.abs(a) * Math.sign(diff.y);

                                    playerMoveVector = playerMoveVector.add(0, 0, v);
                                } else {
                                    playerMoveVector.set(0, 0, playerMoveVector.z);
                                }
                            } else if (approachZ) {
                                if (cornerCollision) {
                                    let a = playerCollisionRadiusDivided - Math.abs(diff.x);
                                    let v = Math.abs(a) * Math.sign(diff.x);

                                    playerMoveVector = playerMoveVector.add(v, 0, 0);
                                } else {
                                    playerMoveVector.set(playerMoveVector.x, 0, 0);
                                }
                            }

                            finalPosition = this.player.position.add(playerMoveVector);
                        }
                    }
                });
            }
        });

        pickups.forEach(pickup => {
            pickup.rotation.set(undefined, undefined, this.player.rotation.y);

            let distance = this.player.position.toVector2().sub(pickup.position.toVector2()).length();

            if (distance < this.player.pickupRadius) {
                this.scene.remove(pickup);

                //! do something
                switch (pickup.type) {
                    case PickupType.alpo: {
                        this.player.changeHealth(4);
                        SoundEmitter.instance.play(Sounds.health);
                        break;
                    }
                    case PickupType.clip: {
                        this.player.changeAmmo(8);
                        SoundEmitter.instance.play(Sounds.ammo);
                        break;
                    }
                    case PickupType.clip_used: {
                        this.player.changeAmmo(4);
                        SoundEmitter.instance.play(Sounds.ammo);
                        break;
                    }
                    case PickupType.blood: {
                        if (this.player.health < 10) {
                            this.player.changeHealth(1);
                            SoundEmitter.instance.play(Sounds.health);
                        }
                        break;
                    }
                    case PickupType.cross: {
                        this.score += 100;
                        SoundEmitter.instance.play(Sounds.pickup);
                        break;
                    }
                    case PickupType.chalice: {
                        this.score += 500;
                        SoundEmitter.instance.play(Sounds.pickup);
                        break;
                    }
                    case PickupType.chest: {
                        this.score += 1000;
                        SoundEmitter.instance.play(Sounds.pickup);
                        break;
                    }
                    case PickupType.crown: {
                        this.score += 5000;
                        SoundEmitter.instance.play(Sounds.pickup);
                        break;
                    }
                    case PickupType.chickenmeal: {
                        this.player.changeHealth(10);
                        SoundEmitter.instance.play(Sounds.health);
                        break;
                    }
                    case PickupType.extralife: {
                        this.player.changeLives(1);
                        this.player.changeAmmo(25);
                        this.player.changeHealth(100);
                        SoundEmitter.instance.play(Sounds.health);
                        break;
                    }
                    case PickupType.skeleton_bloody: {
                        if (this.player.health < 10) {
                            this.player.changeHealth(1);
                            SoundEmitter.instance.play(Sounds.health);
                        }
                        break;
                    }
                    case PickupType.key_golden: {
                        this.player.changeKeyGolden(true);
                        SoundEmitter.instance.play(Sounds.pickup);
                        break;
                    }
                    case PickupType.key_silver: {
                        this.player.changeKeySilver(true);
                        SoundEmitter.instance.play(Sounds.pickup);
                        break;
                    }
                    case PickupType.firstaidkit: {
                        this.player.changeHealth(25);
                        SoundEmitter.instance.play(Sounds.health);
                        break;
                    }
                    case PickupType.machinegun: {
                        this.player.unlockWeapon(WeaponType.machinegun);
                        break;
                    }
                    case PickupType.chaingun: {
                        this.player.unlockWeapon(WeaponType.chaingun);
                        break;
                    }
                }
            }
        });

        objects.forEach(object => {
            object.rotation.set(undefined, undefined, this.player.rotation.y);
        });

        doors.forEach(door => {
            let playerDoor = door.getPosition().sub(this.player.position).toVector2();

            let off = BLOCKSIZE / 2 + this.player.collisionRadius;

            if (
                door.selfCloseTimestamp <= Date.now() &&
                (
                    this.player.position.x.isBetween(door.position.x - off, door.position.x + off) === false ||
                    this.player.position.z.isBetween(door.position.z - off, door.position.z + off) === false
                )
            ) {
                door.close();
            }

            door.update(delta);

            if (playerDoor.length() <= BLOCKSIZE_ROOT2) {
                playerDoor = playerDoor.normalize();
                let playerLook = Vector3.backwards.rotateY(this.player.rotation.y).toVector2().normalize();
                let dot = playerDoor.dot(playerLook);

                if (dot >= DOOR_DOT && this.keyboard.data.interact_door === true) {
                    door.open();
                }
            }
        });

        elevators.forEach(elevator => {
            let playerElevator = elevator.position.sub(this.player.position).toVector2();

            if (playerElevator.length() <= BLOCKSIZE_ROOT2) {
                playerElevator = playerElevator.normalize();
                let playerLook = Vector3.backwards.rotateY(this.player.rotation.y).toVector2().normalize();
                let dot = playerElevator.dot(playerLook);

                if (dot >= DOOR_DOT && this.keyboard.data.interact_door === true && elevator.active === false) {
                    elevator.switch();
                    elevator.material.setAll(Resources.instance.data.textures.door_final_elevator_switch_up);
                    setTimeout(() => { this._won = true }, 500);
                }
            }
        });

        this.player.position.set(this.player.position.x + playerMoveVector.x, undefined, this.player.position.z + playerMoveVector.z);

        if (this.keyboard.data.turnLeft) { this.player.rotation.set(undefined, this.player.rotation.y + this.player.rotationSpeed * delta) }
        if (this.keyboard.data.turnRight) { this.player.rotation.set(undefined, this.player.rotation.y - this.player.rotationSpeed * delta) }

        enemies.forEach(enemy => {
            let playerEnemyVector = enemy.position.sub(this.player.position).toVector2().normalize();
            let enemyPlayerAngle = playerEnemyVector.angle(enemy.lookVector);

            if (enemy.alerted === false) {
                if (Math.abs(enemyPlayerAngle.toDeg()) > 135) {
                    if (Raycaster.raycastPlayer(BLOCKSIZE, enemy.position.toVector2(), playerEnemyVector, this.scene, undefined, this.player) === true) {
                        enemy.alerted = true;
                    }
                }
            }

            enemy.update(delta, enemyPlayerAngle);
            enemy.rotation.set(undefined, undefined, this.player.rotation.y);
            // this.enemy.lookVector.set(this.enemy.lookVector.rotate((0.5).toRad()));

            let enemyWalkDistance = enemy.alerted ? 1 : 5;

            if (enemy.isAlive && enemy.shouldMove) {
                let safetyCounter = 10;
                let newPos = null;

                while (safetyCounter > 0) {
                    newPos = Vector3.forwards.rotateY((Math.random() * 360).toRad()).mul(Math.pow(Math.random(), 1 / 2) * enemyWalkDistance * BLOCKSIZE + BLOCKSIZE).add(enemy.position);
                    let newPosBlockX = Math.floor((newPos.x + BLOCKSIZE / 2) / BLOCKSIZE);
                    let newPosBlockZ = Math.floor((newPos.z + BLOCKSIZE / 2) / BLOCKSIZE);

                    let result = boxColliders.find(c => Math.floor((c.position.x + BLOCKSIZE / 2) / BLOCKSIZE) === newPosBlockX && Math.floor((c.position.z + BLOCKSIZE / 2) / BLOCKSIZE) === newPosBlockZ);
                    if (result !== undefined) {
                        safetyCounter--;
                        continue;
                    }

                    let dir = enemy.position.sub(newPos).toVector2().normalize();

                    if (Raycaster.raycastEnemies(BLOCKSIZE, newPos.toVector2(), dir, this.scene, undefined, enemy) !== null) {
                        break;
                    }

                    safetyCounter--;
                }

                if (safetyCounter > 0 && newPos !== null) {
                    enemy.moveTo(newPos);
                }
            }

            if (enemy.currentStateName === "shooting") {
                let enemyPlayerDirection = this.player.position.sub(enemy.position).normalize().toVector2();
                enemy.lookVector.set(enemyPlayerDirection.x, enemyPlayerDirection.y);
            }
        });

        coords.innerText = `
        POS: ${this.player.position.x.toFixed(2)} / ${this.player.position.y.toFixed(2)} / ${this.player.position.z.toFixed(2)}\n
        ROT: ${this.player.rotation.x.toDeg().toFixed(2)} / ${this.player.rotation.y.toDeg().toFixed(2)} / ${this.player.rotation.z.toDeg().toFixed(2)}\n
        DELTA: ${delta.toFixed(3)}`;

        this.renderer.render(this.scene, this.player);

        return {
            score: this.score,
            floor: this.floor,
            lives: this.player.lives,
            health: this.player.health,
            ammo: this.player.ammo,
            hasKeyGolden: this.player.hasKeyGolden,
            hasKeySilver: this.player.hasKeySilver,
            weapon: this.player.weapon,
            weaponStateMachine: this.player.weaponStateMachine
        }
    }
}