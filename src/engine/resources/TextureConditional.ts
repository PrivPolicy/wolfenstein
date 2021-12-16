import { Texture } from "./Texture";

export enum TexturesConditional {
    enemy_shephard_stand = "enemy_shephard_stand",
    enemy_shephard_run_01 = "enemy_shephard_run_01",
    enemy_shephard_run_02 = "enemy_shephard_run_02",
    enemy_shephard_run_03 = "enemy_shephard_run_03",
    enemy_trooper_stand = "enemy_trooper_stand",
    enemy_trooper_run_01 = "enemy_trooper_run_01",
    enemy_trooper_run_02 = "enemy_trooper_run_02",
    enemy_trooper_run_03 = "enemy_trooper_run_03",
    enemy_trooper_run_04 = "enemy_trooper_run_04",
    enemy_ss_stand = "enemy_ss_stand",
    enemy_ss_run_01 = "enemy_ss_run_01",
    enemy_ss_run_02 = "enemy_ss_run_02",
    enemy_ss_run_03 = "enemy_ss_run_03",
    enemy_ss_run_04 = "enemy_ss_run_04",
    hud_BJBlazkowicz_looking_left = "hud_BJBlazkowicz_looking_left",
    hud_BJBlazkowicz_looking_middle = "hud_BJBlazkowicz_looking_middle",
    hud_BJBlazkowicz_looking_right = "hud_BJBlazkowicz_looking_right",
    hud_numbers = "hud_numbers",
    font_menu = "font_menu",
    font_end = "font_end",
    screen_difficulty_face = "screen_difficulty_face"
}

export class TextureConditional {
    private readonly _entries: TextureConditionalItem[];

    constructor(...entries: TextureConditionalItem[]) {
        this._entries = entries;
    }

    get(value: number) {
        let item = this._entries.find(v => v.from <= value && v.to > value)?.texture || null;
        return item;
    }
}

export class TextureConditionalItem {
    readonly from: number
    readonly to: number
    readonly texture: Texture

    constructor(from: number, to: number, texture: Texture) {
        this.from = from;
        this.to = to;
        this.texture = texture;
    }
}