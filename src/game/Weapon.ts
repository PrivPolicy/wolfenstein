import { Resources } from "../engine/resources/Resources";
import { Texture } from "../engine/resources/Texture";
import { TextureAnimated } from "../engine/resources/TextureAnimated";
import { StateMachine, StateMachineItem } from "./StateMachine";

export enum WeaponType {
    knife = "knife",
    pistol = "pistol",
    machinegun = "machinegun",
    chaingun = "chaingun"
}

export class Weapon {
    readonly type: WeaponType;
    readonly damage: number;
    readonly textureIcon: Texture;
    readonly textureHUDStand: Texture
    readonly textureHUDAttack: TextureAnimated
    readonly textureHUDBegin?: TextureAnimated
    readonly textureHUDEnd?: TextureAnimated

    constructor(type: WeaponType, damage: number, textureIcon: Texture, textureHUDStand: Texture, textureHUDAttack: TextureAnimated, textureHUDBegin?: TextureAnimated, textureHUDEnd?: TextureAnimated) {
        this.type = type;
        this.damage = damage;
        this.textureIcon = textureIcon;
        this.textureHUDStand = textureHUDStand;
        this.textureHUDAttack = textureHUDAttack;
        this.textureHUDBegin = textureHUDBegin;
        this.textureHUDEnd = textureHUDEnd;
    }
}

export class Weapons {
    static get knife() {
        return new Weapon(
            WeaponType.knife,
            10,
            Resources.instance.data.textures.hud_weapon_knife,
            Resources.instance.data.textures.weapon_knife_01,
            Resources.instance.data.texturesAnimated.weapon_knife_attack
        )
    };

    static get pistol() {
        return new Weapon(
            WeaponType.pistol,
            15,
            Resources.instance.data.textures.hud_weapon_pistol,
            Resources.instance.data.textures.weapon_pistol_01,
            Resources.instance.data.texturesAnimated.weapon_pistol_attack
        );
    }

    static get machinegun() {
        return new Weapon(WeaponType.machinegun,
            15,
            Resources.instance.data.textures.hud_weapon_machinegun,
            Resources.instance.data.textures.weapon_machinegun_01,
            Resources.instance.data.texturesAnimated.weapon_machinegun_attack,
            Resources.instance.data.texturesAnimated.weapon_machinegun_begin,
            Resources.instance.data.texturesAnimated.weapon_machinegun_end,
        );
    }

    static get chaingun() {
        return new Weapon(WeaponType.chaingun,
            15,
            Resources.instance.data.textures.hud_weapon_chaingun,
            Resources.instance.data.textures.weapon_chaingun_01,
            Resources.instance.data.texturesAnimated.weapon_chaingun_attack,
            Resources.instance.data.texturesAnimated.weapon_chaingun_begin,
            Resources.instance.data.texturesAnimated.weapon_chaingun_end,
        );
    }

    static get knifeStateMachine() {
        return new StateMachine(
            new StateMachineItem("stand", Weapons.knife.textureHUDStand),
            new StateMachineItem("attack", Weapons.knife.textureHUDAttack, "stand"),
        )
    }

    static get pistolStateMachine() {
        return new StateMachine(
            new StateMachineItem("stand", Weapons.pistol.textureHUDStand),
            new StateMachineItem("attack", Weapons.pistol.textureHUDAttack, "stand"),
        )
    }

    static get machinegunStateMachine() {
        return new StateMachine(
            new StateMachineItem("stand", Weapons.machinegun.textureHUDStand),
            new StateMachineItem("begin", Weapons.machinegun.textureHUDBegin!, "attack"),
            new StateMachineItem("attack", Weapons.machinegun.textureHUDAttack),
            new StateMachineItem("end", Weapons.machinegun.textureHUDEnd!, "stand"),
        )
    }

    static get chaingunStateMachine() {
        return new StateMachine(
            new StateMachineItem("stand", Weapons.chaingun.textureHUDStand),
            new StateMachineItem("begin", Weapons.chaingun.textureHUDBegin!, "attack"),
            new StateMachineItem("attack", Weapons.chaingun.textureHUDAttack),
            new StateMachineItem("end", Weapons.chaingun.textureHUDEnd!, "stand"),
        )
    }
}