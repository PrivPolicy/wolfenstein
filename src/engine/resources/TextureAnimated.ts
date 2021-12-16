import { Resources } from "./Resources";
import { Texture, Textures } from "./Texture";
import { TexturesConditional } from "./TextureConditional";

export enum TexturesAnimated {
    hud_BJBlazkowicz_looking = "hud_BJBlazkowicz_looking",
    weapon_knife_attack = "weapon_knife_attack",
    weapon_pistol_attack = "weapon_pistol_attack",
    weapon_machinegun_begin = "weapon_machinegun_begin",
    weapon_machinegun_attack = "weapon_machinegun_attack",
    weapon_machinegun_end = "weapon_machinegun_end",
    weapon_chaingun_begin = "weapon_chaingun_begin",
    weapon_chaingun_attack = "weapon_chaingun_attack",
    weapon_chaingun_end = "weapon_chaingun_end",
    enemy_ss_run = "enemy_ss_run",
    enemy_shephard_run = "enemy_shephard_run",
    emeny_trooper_run = "enemy_trooper_run",
    enemy_trooper_damaged = "enemy_trooper_damaged",
    enemy_trooper_dying = "enemy_trooper_dying",
    enemy_ss_damaged = "enemy_ss_damaged",
    enemy_ss_dying = "enemy_ss_dying",
    enemy_shephard_dying = "enemy_shephard_dying",
    enemy_ss_attack = "enemy_ss_attack",
    enemy_shephard_attack = "enemy_shephard_attack",
    enemy_trooper_attack = "enemy_trooper_attack",
    hud_option_marker = "hud_option_marker"
}

export type TextureAnimatedRepeat = "once" | "infinite";

export class TextureAnimated {
    private readonly _repeat: TextureAnimatedRepeat;
    private readonly _entries: TextureAnimatedItem[];
    private readonly _sum: number;
    private _lastFrameIndex: number;
    private _currentFrameIndex: number;
    onAnimationEnd: Function;
    onFramePlayed: (index: number, name?: string) => void

    constructor(repeat: TextureAnimatedRepeat, ...entries: TextureAnimatedItem[]) {
        this._repeat = repeat;
        this._entries = entries;
        this._sum = this._entries.reduce((acc, entry) => acc + entry.delay, 0);
        this._lastFrameIndex = -1;
        this._currentFrameIndex = -1;
        this.onAnimationEnd = () => { };
        this.onFramePlayed = () => { };
    }

    get(elapsedTime: number, conditionalVariable = 0): Texture | null {
        let elapsedTimeModulo = elapsedTime % this._sum;
        let item = this._entries.find(entry => { elapsedTimeModulo = elapsedTimeModulo - entry.delay; return elapsedTimeModulo <= 0 }) || null;

        if (this._repeat === "once" && elapsedTime > this._sum) {
            this.onAnimationEnd();
            item = this._entries[this._entries.length - 1];
        }

        if (item !== null) {
            let index = this._entries.indexOf(item);
            this._lastFrameIndex = this._currentFrameIndex;
            this._currentFrameIndex = index;

            if (this._lastFrameIndex !== this._currentFrameIndex && item.name !== undefined) {
                this.onFramePlayed(index, item.name);
            }

            if (item.type === "textureConditional") {
                return Resources.instance.data.texturesConditional[item.texture as TexturesConditional].get(conditionalVariable);
            } else {
                return Resources.instance.data.textures[item.texture as Textures];
            }
        }

        return null;
    }
}

export class TextureAnimatedItem {
    readonly delay: number
    readonly texture: Textures | TexturesConditional
    readonly type: "texture" | "textureConditional"
    readonly name?: string;

    constructor(delay: number, texture: Textures | TexturesConditional, name?: string) {
        this.delay = delay;
        this.texture = texture;

        if (texture in Textures) {
            this.type = "texture";
        } else {
            this.type = "textureConditional";
        }

        this.name = name;
    }
}