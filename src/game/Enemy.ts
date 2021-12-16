import { PlaneGeometry } from "../engine/geometry/PlaneGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";
import { Vector2 } from "../engine/math/Vector2";
import { Vector3 } from "../engine/math/Vector3";
import { Resources } from "../engine/resources/Resources";
import { Sounds } from "../engine/resources/Sound";
import { Plane } from "./Plane";
import { SoundEmitter } from "./SoundEmitter";
import { StateMachine, StateMachineItem } from "./StateMachine";

export type EnemyType = "trooper";

export class Enemies {
    static get trooperStateMachine() {
        return new StateMachine(
            new StateMachineItem("stand", Resources.instance.data.texturesConditional.enemy_trooper_stand),
            new StateMachineItem("run", Resources.instance.data.texturesAnimated.enemy_trooper_run),
            new StateMachineItem("damaged", Resources.instance.data.texturesAnimated.enemy_trooper_damaged, "stand"),
            new StateMachineItem("damagedFirstTime", Resources.instance.data.texturesAnimated.enemy_trooper_damaged, "shooting"),
            new StateMachineItem("dying", Resources.instance.data.texturesAnimated.enemy_trooper_dying),
            new StateMachineItem("shooting", Resources.instance.data.texturesAnimated.enemy_trooper_attack, "stand"),
        )
    }
}

export class Enemy extends Plane {
    readonly lookVector: Vector2
    private readonly _stateMachine: StateMachine
    private _movementTargetVector: Vector3;
    private readonly _movementSpeed: number;
    private _health: number;
    private _score: number;
    private _isAlive: boolean;
    private _alerted: boolean;
    private lastStoppedMoving: number;
    private moveAroundDelayNormal: number;
    private moveAroundDelayAlerted: number;
    private _shootFunction: (index: number, name?: string) => void;

    constructor(blockSize: number, stateMachine: StateMachine, health: number, score: number, movementSpeed: number = blockSize) {
        let geometry = new PlaneGeometry(blockSize, blockSize);
        let material = new TextureMaterial(stateMachine.getTexture()!);

        super(geometry, material);

        this.lookVector = new Vector2();
        this._stateMachine = stateMachine;
        this._movementTargetVector = new Vector3();
        this._movementSpeed = movementSpeed;
        this._health = health;
        this._score = score;
        this._isAlive = true;
        this._alerted = false;
        this.lastStoppedMoving = 0;
        this.moveAroundDelayNormal = 5000;
        this.moveAroundDelayAlerted = 200;
        this._shootFunction = () => { };
    }

    get health() { return this._health }
    get score() { return this._score }
    get isAlive() { return this._isAlive }
    get alerted() { return this._alerted }
    get currentStateName() { return this._stateMachine.currentStateName }

    get shouldMove() {
        if (this._alerted) {
            return Date.now() - this.lastStoppedMoving > this.moveAroundDelayAlerted && this._stateMachine.currentStateName === "stand";
        } else {
            return Date.now() - this.lastStoppedMoving > this.moveAroundDelayNormal && this._stateMachine.currentStateName === "stand";
        }
    }

    set alerted(v: boolean) {
        this._alerted = v;

        if (v === true) {
            this.moveTo(this.position, true);
        }
    }

    update(delta: number, conditionalValue: number) {
        let texture = this._stateMachine.getTexture(delta, conditionalValue);

        if (texture === null) {
            return console.error(this._stateMachine, "does not resolve for value", conditionalValue);
        }

        this.material.setAll(texture);
        this.material.textureType = "single";

        if (this.isAlive === true) {
            if (this.position.x !== this._movementTargetVector.x ||
                this.position.z !== this._movementTargetVector.z) {
                let movementVector = this._movementTargetVector.sub(this.position);
                let newLookVector = new Vector2(movementVector.x, movementVector.z).normalize();

                this.lookVector.set(newLookVector.x, newLookVector.y);

                if (movementVector.length() <= this._movementSpeed * delta) {
                    this.position.set(this._movementTargetVector.x, this._movementTargetVector.y, this._movementTargetVector.z);

                    if (this._stateMachine.currentStateName === "run") {
                        if (this._alerted) {
                            this._stateMachine.changeState("shooting");
                        } else {
                            this._stateMachine.changeState("stand");
                        }
                        this.lastStoppedMoving = Date.now();
                    }
                } else {
                    movementVector = movementVector.normalize().mul(this._movementSpeed).mul(delta);
                    let newPosition = this.position.add(movementVector);

                    this.position.set(newPosition.x, newPosition.y, newPosition.z);

                    if (this._stateMachine.currentStateName === "stand") {
                        this._stateMachine.changeState("run");
                    }
                }
            }
        }
    }

    moveTo(newPosition: Vector3, immediately: boolean = false) {
        if (this._isAlive === true) {
            this._movementTargetVector = newPosition.copy();

            if (immediately === true) {
                this.position.set(newPosition.x, newPosition.y, newPosition.z);
            }
        }
    }

    changeHealth(v: number, onDie?: Function) {
        if (this._isAlive === true) {
            this._health += v;

            if (this._health <= 0) {
                this._isAlive = false;
                this._stateMachine.changeState("dying");

                SoundEmitter.instance.play(Sounds.player_pain_1);

                if (onDie !== undefined) {
                    onDie();
                }
            } else {
                if (this._alerted === true) {
                    this._stateMachine.changeState("damagedFirstTime");
                } else {
                    this._stateMachine.changeState("damaged");
                }
                this.alerted = true;
                SoundEmitter.instance.play(Sounds.oof);
            }
        }
    }

    setShootFunction(f: (index: number, name?: string) => void) {
        this._shootFunction = f;
        this._stateMachine.onFramePlayed = this._shootFunction;
    }
}