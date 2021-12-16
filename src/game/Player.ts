import { Camera } from "../engine/core/Camera";
import { StateMachine } from "./StateMachine";
import { Weapon, Weapons, WeaponType } from "./Weapon";

export class Player extends Camera {
    readonly walkingSpeed: number;
    readonly rotationSpeed: number;
    readonly collisionRadius: number;
    readonly pickupRadius: number;
    private _lives: number;
    private _health: number;
    private _ammo: number;
    private _hasKeyGolden: boolean;
    private _hasKeySilver: boolean;
    private _weapon: Weapon;
    private _weaponsUnlocked: { [key in WeaponType]: boolean };
    private _weaponStateMachine: StateMachine;
    private _shootFunction: (index: number, name?: string) => void

    constructor(walkingSpeed: number, rotationSpeed: number, lives = 3) {
        super();

        this.walkingSpeed = walkingSpeed;
        this.rotationSpeed = rotationSpeed;
        this.collisionRadius = 32;
        this.pickupRadius = 64;

        this._lives = lives;
        this._health = 100;
        this._ammo = 8;
        this._hasKeyGolden = false;
        this._hasKeySilver = false;
        this._weapon = Weapons.knife;

        this._weaponsUnlocked = {
            knife: true,
            pistol: true,
            machinegun: false,
            chaingun: false
        }

        this._weaponStateMachine = Weapons.knifeStateMachine;

        this._shootFunction = () => { };
    }

    get lives() {
        return this._lives;
    }

    get health() {
        return this._health;
    }

    get ammo() {
        return this._ammo;
    }

    get hasKeyGolden() {
        return this._hasKeyGolden;
    }

    get hasKeySilver() {
        return this._hasKeySilver;
    }

    get weapon() {
        return this._weapon;
    }

    get weaponStateMachine() {
        return this._weaponStateMachine;
    }

    changeAmmo(v: number) {
        this._ammo = Math.clamp(0, 99, this._ammo + v);
    }

    changeHealth(v: number) {
        this._health = Math.clamp(0, 100, this._health + v);
    }

    changeLives(v: number) {
        this._lives = Math.clamp(0, 99, this._lives + v);
    }

    changeKeyGolden(v: boolean) {
        this._hasKeyGolden = v;
    }

    changeKeySilver(v: boolean) {
        this._hasKeySilver = v;
    }

    changeWeapon(v: WeaponType) {
        if (this._weaponsUnlocked[v] === true && this._weapon.type !== v && this._weaponStateMachine.currentStateName === "stand" && ((v !== WeaponType.knife && this._ammo > 0) || v === WeaponType.knife)) {
            this._weapon = Weapons[v];
            this._weaponStateMachine = Weapons[`${v}StateMachine`];
            this._weaponStateMachine.onFramePlayed = this._shootFunction;
        }
    }

    unlockWeapon(v: WeaponType) {
        if (this._weaponsUnlocked[v] === false) {
            this._weaponsUnlocked[v] = true;
        }
    }

    attackStart() {
        if (this._weaponStateMachine.currentStateName === "stand") {
            if (this._weaponStateMachine.hasState("begin")) {
                this._weaponStateMachine.changeState("begin");
            } else {
                this._weaponStateMachine.changeState("attack");
            }
        }
    }

    attackStop() {
        if (this._weaponStateMachine.currentStateName === "attack" && this._weaponStateMachine.hasState("end")) {
            this._weaponStateMachine.changeState("end");
        }
    }

    setShootFunction(f: (index: number, name?: string) => void) {
        this._shootFunction = f;
        this._weaponStateMachine.onFramePlayed = this._shootFunction;
    }
}