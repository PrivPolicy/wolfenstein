import fragBasic from "../../assets/shaders/basic.frag";
import fragMatrix from "../../assets/shaders/matrix.frag";
import fragMatrix3D from "../../assets/shaders/matrix3D.frag";
import fragMatrix3DTextured from "../../assets/shaders/matrix3Dtextured.frag";

import vertBasic from "../../assets/shaders/basic.vert";
import vertMatrix from "../../assets/shaders/matrix.vert";
import vertMatrix3D from "../../assets/shaders/matrix3D.vert";
import vertMatrix3DTextured from "../../assets/shaders/matrix3Dtextured.vert";

import stitched from "../../assets/textures/stitched.png";
import overlay from "../../assets/hud/overlay.png";
import status from "../../assets/hud/status.png";
import screens from "../../assets/hud/screens.png";
import font_menu from "../../assets/hud/menuFont.png";
import font_end from "../../assets/hud/endFont.png";

import all_right from "../../assets/sounds/all_right.wav"
import ammo from "../../assets/sounds/ammo.wav"
import door from "../../assets/sounds/door.wav"
import gatling_gun from "../../assets/sounds/gatling_gun.wav"
import halt_1 from "../../assets/sounds/halt_1.wav"
import halt_2 from "../../assets/sounds/halt_2.wav"
import halten_sie from "../../assets/sounds/halten_sie.wav"
import health from "../../assets/sounds/health.wav"
import key from "../../assets/sounds/key.wav"
import knife from "../../assets/sounds/knife.wav"
import machine_gun from "../../assets/sounds/machine_gun.wav"
import menu_select from "../../assets/sounds/menu_select.wav"
import menu_toggle from "../../assets/sounds/menu_toggle.wav"
import oof from "../../assets/sounds/oof.wav"
import pickup from "../../assets/sounds/pickup.wav"
import pistol from "../../assets/sounds/pistol.wav"
import player_dies from "../../assets/sounds/player_dies.wav"
import player_pain_1 from "../../assets/sounds/player_pain_1.wav"
import player_pain_2 from "../../assets/sounds/player_pain_2.wav"
import shephard from "../../assets/sounds/shephard.wav"
import shephard_death from "../../assets/sounds/shephard_death.wav"
import switch_pull from "../../assets/sounds/switch.wav"
import theme_level from "../../assets/sounds/theme_level.mp3"
import theme_menu from "../../assets/sounds/theme_menu.mp3"
import theme_splash from "../../assets/sounds/theme_splash.mp3"

import { ResourceBranch, TextureAnimatedBranch, TexturesConditionalBranch, VariantBranch } from "./ResourceBranch";
import { Shaders } from "./Shader";
import { Sound, Sounds } from "./Sound";
import { Texture, Textures } from "./Texture";
import { TextureData, TexturesData } from "./TextureData";
import { SoundsVariant, TexturesVariant, Variant } from "./Variant";
import { Resource } from "./Resource";
import { TextureConditional, TextureConditionalItem, TexturesConditional } from "./TextureConditional";
import { TextureAnimated, TextureAnimatedItem } from "./TextureAnimated";

export type TextureLike = Texture | TextureConditional | TextureAnimated;

export interface IResourceData {
    readonly shaders: ResourceBranch<Shaders>
    readonly sounds: ResourceBranch<Sounds>
    readonly textures: ResourceBranch<Textures>
    readonly texturesData: ResourceBranch<TexturesData>
    readonly texturesVariant: VariantBranch<TexturesVariant>
    readonly soundsVariant: VariantBranch<SoundsVariant>
    readonly texturesConditional: TexturesConditionalBranch
    readonly texturesAnimated: TextureAnimatedBranch
}

export class Resources {
    readonly data: IResourceData

    static readonly instance: Resources = new this;

    constructor() {
        this.data = {
            shaders: {
                fragBasic: new Resource(fragBasic),
                fragMatrix: new Resource(fragMatrix),
                fragMatrix3D: new Resource(fragMatrix3D),
                fragMatrix3DTextured: new Resource(fragMatrix3DTextured),
                vertBasic: new Resource(vertBasic),
                vertMatrix: new Resource(vertMatrix),
                vertMatrix3D: new Resource(vertMatrix3D),
                vertMatrix3DTextured: new Resource(vertMatrix3DTextured),
            },
            sounds: {
                all_right: new Sound(all_right),
                ammo: new Sound(ammo),
                door: new Sound(door),
                gatling_gun: new Sound(gatling_gun),
                halt_1: new Sound(halt_1),
                halt_2: new Sound(halt_2),
                halten_sie: new Sound(halten_sie),
                health: new Sound(health),
                key: new Sound(key),
                knife: new Sound(knife),
                machine_gun: new Sound(machine_gun),
                menu_select: new Sound(menu_select),
                menu_toggle: new Sound(menu_toggle),
                oof: new Sound(oof),
                pickup: new Sound(pickup),
                pistol: new Sound(pistol),
                player_dies: new Sound(player_dies),
                player_pain_1: new Sound(player_pain_1),
                player_pain_2: new Sound(player_pain_2),
                shephard: new Sound(shephard),
                shephard_death: new Sound(shephard_death),
                switch: new Sound(switch_pull),
                theme_level: new Sound(theme_level),
                theme_menu: new Sound(theme_menu),
                theme_splash: new Sound(theme_splash),
            },
            textures: {
                wall_cobblestone_01: new Texture(TexturesData.stitched, 0, 5),
                wall_cobblestone_02: new Texture(TexturesData.stitched, 1, 5),
                wall_cobblestone_decoration_01: new Texture(TexturesData.stitched, 2, 5),
                wall_cobblestone_decoration_02: new Texture(TexturesData.stitched, 3, 5),
                wall_cobblestone_decoration_03: new Texture(TexturesData.stitched, 4, 5),
                wall_cobblestone_decoration_04: new Texture(TexturesData.stitched, 5, 5),
                wall_purplestone_01: new Texture(TexturesData.stitched, 6, 5),
                wall_purplestone_02: new Texture(TexturesData.stitched, 7, 5),

                wall_bluestone_01: new Texture(TexturesData.stitched, 0, 6),
                wall_bluestone_02: new Texture(TexturesData.stitched, 1, 6),
                wall_bluestone_cell_01: new Texture(TexturesData.stitched, 2, 6),
                wall_bluestone_cell_02: new Texture(TexturesData.stitched, 3, 6),
                wall_bluestone_decoration: new Texture(TexturesData.stitched, 4, 6),
                wall_bluestone_bricks_01: new Texture(TexturesData.stitched, 5, 6),
                wall_bluestone_bricks_02: new Texture(TexturesData.stitched, 6, 6),
                wall_bluestone_bricks_03: new Texture(TexturesData.stitched, 7, 6),

                wall_cobblestone_mossy_01: new Texture(TexturesData.stitched, 0, 7),
                wall_cobblestone_mossy_02: new Texture(TexturesData.stitched, 1, 7),
                wall_cobblestone_mossy_03: new Texture(TexturesData.stitched, 2, 7),
                wall_wood: new Texture(TexturesData.stitched, 3, 7),
                wall_wood_decoration_01: new Texture(TexturesData.stitched, 4, 7),
                wall_wood_decoration_02: new Texture(TexturesData.stitched, 5, 7),
                wall_wood_decoration_03: new Texture(TexturesData.stitched, 6, 7),
                wall_wood_decoration_04: new Texture(TexturesData.stitched, 7, 7),

                wall_cobblestone_bricks_01: new Texture(TexturesData.stitched, 0, 8),
                wall_cobblestone_bricks_02: new Texture(TexturesData.stitched, 1, 8),
                wall_cobblestone_bricks_03: new Texture(TexturesData.stitched, 2, 8),
                wall_cobblestone_bricks_decoration_01: new Texture(TexturesData.stitched, 3, 8),
                wall_cobblestone_bricks_decoration_02: new Texture(TexturesData.stitched, 4, 8),
                wall_cobblestone_bricks_decoration_03: new Texture(TexturesData.stitched, 5, 8),
                wall_outside_01: new Texture(TexturesData.stitched, 6, 8),
                wall_outside_02: new Texture(TexturesData.stitched, 7, 8),

                door_front: new Texture(TexturesData.stitched, 0, 9),
                door_back: new Texture(TexturesData.stitched, 1, 9),
                door_warning: new Texture(TexturesData.stitched, 2, 9),
                door_side: new Texture(TexturesData.stitched, 3, 9),
                door_inside: new Texture(TexturesData.stitched, 4, 9),
                wall_marble_01: new Texture(TexturesData.stitched, 5, 9),
                wall_marble_02: new Texture(TexturesData.stitched, 6, 9),
                wall_marble_decoration: new Texture(TexturesData.stitched, 7, 9),

                wall_bricks: new Texture(TexturesData.stitched, 0, 10),
                wall_bricks_decoration_01: new Texture(TexturesData.stitched, 1, 10),
                wall_bricks_decoration_02: new Texture(TexturesData.stitched, 2, 10),
                wall_bricks_decoration_03: new Texture(TexturesData.stitched, 3, 10),
                wall_playwood: new Texture(TexturesData.stitched, 4, 10),
                wall_playwood_blood_01: new Texture(TexturesData.stitched, 5, 10),
                wall_playwood_blood_02: new Texture(TexturesData.stitched, 6, 10),
                wall_playwood_blood_03: new Texture(TexturesData.stitched, 7, 10),

                door_final_front: new Texture(TexturesData.stitched, 0, 11),
                door_final_elevator_front_01: new Texture(TexturesData.stitched, 1, 11),
                door_final_elevator_front_02: new Texture(TexturesData.stitched, 2, 11),
                door_final_elevator_switch_up: new Texture(TexturesData.stitched, 3, 11),
                door_final_elevator_switch_down: new Texture(TexturesData.stitched, 4, 11),
                door_final_elevator_shelf: new Texture(TexturesData.stitched, 5, 11),
                door_fancystone_01: new Texture(TexturesData.stitched, 6, 11),
                door_fancystone_02: new Texture(TexturesData.stitched, 7, 11),

                pickup_alpo: new Texture(TexturesData.stitched, 0, 12),
                pickup_chickenmeal: new Texture(TexturesData.stitched, 1, 12),
                pickup_firstaidkit: new Texture(TexturesData.stitched, 2, 12),
                pickup_clip: new Texture(TexturesData.stitched, 3, 12),
                pickup_extralife: new Texture(TexturesData.stitched, 4, 12),
                object_cage_empty: new Texture(TexturesData.stitched, 5, 12),
                object_cage_full: new Texture(TexturesData.stitched, 6, 12),
                object_skeleton_hanging: new Texture(TexturesData.stitched, 7, 12),
                object_pot: new Texture(TexturesData.stitched, 9, 12),
                object_barrel: new Texture(TexturesData.stitched, 10, 12),
                object_water: new Texture(TexturesData.stitched, 11, 12),
                object_barrel_radioactive: new Texture(TexturesData.stitched, 12, 12),
                object_bed: new Texture(TexturesData.stitched, 13, 12),
                object_chandelier: new Texture(TexturesData.stitched, 14, 12),
                object_lamp_hanging: new Texture(TexturesData.stitched, 15, 12),

                pickup_cross: new Texture(TexturesData.stitched, 0, 13),
                pickup_chalice: new Texture(TexturesData.stitched, 1, 13),
                pickup_chest: new Texture(TexturesData.stitched, 2, 13),
                pickup_crown: new Texture(TexturesData.stitched, 3, 13),
                pickup_key_golden: new Texture(TexturesData.stitched, 4, 13),
                pickup_key_silver: new Texture(TexturesData.stitched, 5, 13),
                pickup_machinegun: new Texture(TexturesData.stitched, 6, 13),
                pickup_chaingun: new Texture(TexturesData.stitched, 7, 13),
                floor: new Texture(TexturesData.stitched, 8, 13),
                object_lamp_standing: new Texture(TexturesData.stitched, 9, 13),
                object_sapling_golden: new Texture(TexturesData.stitched, 10, 13),
                object_lamp_ancient: new Texture(TexturesData.stitched, 11, 13),
                object_sapling_blue: new Texture(TexturesData.stitched, 12, 13),
                object_pot_blue: new Texture(TexturesData.stitched, 13, 13),

                object_skeleton_laying: new Texture(TexturesData.stitched, 0, 14),
                object_skeleton_pile: new Texture(TexturesData.stitched, 1, 14),
                object_blood: new Texture(TexturesData.stitched, 2, 14),
                object_skeleton_blood: new Texture(TexturesData.stitched, 3, 14),
                object_pillar: new Texture(TexturesData.stitched, 4, 14),
                object_armor: new Texture(TexturesData.stitched, 5, 14),
                object_flag: new Texture(TexturesData.stitched, 6, 14),
                object_weaponrack: new Texture(TexturesData.stitched, 7, 14),
                transparent: new Texture(TexturesData.stitched, 8, 14),
                object_table_chairs: new Texture(TexturesData.stitched, 9, 14),
                object_table: new Texture(TexturesData.stitched, 10, 14),
                object_kitchenutencils_01: new Texture(TexturesData.stitched, 11, 14),
                object_kitchenutencils_02: new Texture(TexturesData.stitched, 12, 14),
                object_furnace: new Texture(TexturesData.stitched, 13, 14),

                hud_weapon_knife: new Texture(TexturesData.status, 0, 0, 48, 24, 1),
                hud_weapon_pistol: new Texture(TexturesData.status, 0, 24, 48, 24, 1),
                hud_weapon_machinegun: new Texture(TexturesData.status, 48, 0, 48, 24, 1),
                hud_weapon_chaingun: new Texture(TexturesData.status, 48, 24, 48, 24, 1),
                hud_key_golden: new Texture(TexturesData.status, 0, 64, 8, 16, 1),
                hud_key_silver: new Texture(TexturesData.status, 8, 64, 8, 16, 1),

                weapon_knife_01: new Texture(TexturesData.stitched, 0, 15),
                weapon_knife_02: new Texture(TexturesData.stitched, 1, 15),
                weapon_knife_03: new Texture(TexturesData.stitched, 2, 15),
                weapon_knife_04: new Texture(TexturesData.stitched, 3, 15),
                weapon_knife_05: new Texture(TexturesData.stitched, 4, 15),
                weapon_pistol_01: new Texture(TexturesData.stitched, 5, 15),
                weapon_pistol_02: new Texture(TexturesData.stitched, 6, 15),
                weapon_pistol_03: new Texture(TexturesData.stitched, 7, 15),
                weapon_pistol_04: new Texture(TexturesData.stitched, 8, 15),
                weapon_pistol_05: new Texture(TexturesData.stitched, 9, 15),
                weapon_machinegun_01: new Texture(TexturesData.stitched, 10, 15),
                weapon_machinegun_02: new Texture(TexturesData.stitched, 11, 15),
                weapon_machinegun_03: new Texture(TexturesData.stitched, 12, 15),
                weapon_machinegun_04: new Texture(TexturesData.stitched, 13, 15),
                weapon_machinegun_05: new Texture(TexturesData.stitched, 14, 15),
                weapon_chaingun_01: new Texture(TexturesData.stitched, 14, 13),
                weapon_chaingun_02: new Texture(TexturesData.stitched, 15, 13),
                weapon_chaingun_03: new Texture(TexturesData.stitched, 14, 14),
                weapon_chaingun_04: new Texture(TexturesData.stitched, 15, 14),
                weapon_chaingun_05: new Texture(TexturesData.stitched, 15, 15),

                enemy_ss_damaged: new Texture(TexturesData.stitched, 7, 4),
                enemy_trooper_damaged: new Texture(TexturesData.stitched, 8, 12),
                enemy_shephard_dying_01: new Texture(TexturesData.stitched, 0, 4),
                enemy_shephard_dying_02: new Texture(TexturesData.stitched, 1, 4),
                enemy_shephard_dying_03: new Texture(TexturesData.stitched, 2, 4),
                enemy_shephard_dying_04: new Texture(TexturesData.stitched, 3, 4),
                enemy_ss_dying_01: new Texture(TexturesData.stitched, 9, 5),
                enemy_ss_dying_02: new Texture(TexturesData.stitched, 10, 5),
                enemy_ss_dying_03: new Texture(TexturesData.stitched, 11, 5),
                enemy_ss_dying_04: new Texture(TexturesData.stitched, 12, 5),
                enemy_trooper_dying_01: new Texture(TexturesData.stitched, 8, 11),
                enemy_trooper_dying_02: new Texture(TexturesData.stitched, 9, 11),
                enemy_trooper_dying_03: new Texture(TexturesData.stitched, 10, 11),
                enemy_trooper_dying_04: new Texture(TexturesData.stitched, 11, 11),
                enemy_trooper_dying_05: new Texture(TexturesData.stitched, 12, 11),
                enemy_ss_attack_01: new Texture(TexturesData.stitched, 13, 5),
                enemy_ss_attack_02: new Texture(TexturesData.stitched, 14, 5),
                enemy_ss_attack_03: new Texture(TexturesData.stitched, 15, 5),
                enemy_shephard_attack_01: new Texture(TexturesData.stitched, 4, 4),
                enemy_shephard_attack_02: new Texture(TexturesData.stitched, 5, 4),
                enemy_shephard_attack_03: new Texture(TexturesData.stitched, 6, 4),
                enemy_trooper_attack_01: new Texture(TexturesData.stitched, 13, 11),
                enemy_trooper_attack_02: new Texture(TexturesData.stitched, 14, 11),
                enemy_trooper_attack_03: new Texture(TexturesData.stitched, 15, 11),

                screen_splash_warning: new Texture(TexturesData.screens, 0, 0, 640, 400, 1),
                screen_splash_wolfenstein: new Texture(TexturesData.screens, 0, 400, 640, 400, 1),
                screen_menu: new Texture(TexturesData.screens, 640, 0, 640, 400, 1),
                screen_difficulty: new Texture(TexturesData.screens, 640, 400, 640, 400, 1),
                screen_highscores: new Texture(TexturesData.screens, 640, 800, 640, 400, 1),

                hud_option_marker_light: new Texture(TexturesData.screens, 0, 800, 19, 11, 1),
                hud_option_marker_dark: new Texture(TexturesData.screens, 19, 800, 19, 11, 1),
            },
            texturesData: {
                stitched: new TextureData(stitched),
                overlay: new TextureData(overlay),
                status: new TextureData(status),
                screens: new TextureData(screens),
                font_menu: new TextureData(font_menu),
                font_end: new TextureData(font_end)
            },
            texturesVariant: {
                wall_cobblestone: new Variant(Textures.wall_cobblestone_01, Textures.wall_cobblestone_02),
                wall_cobblestone_decoration: new Variant(Textures.wall_cobblestone_decoration_01, Textures.wall_cobblestone_decoration_02, Textures.wall_cobblestone_decoration_03)
            },
            soundsVariant: {

            },
            texturesConditional: {
                enemy_shephard_stand: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 0, 0)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 1, 0)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 2, 0)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 3, 0)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 4, 0)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 5, 0)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 6, 0)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 7, 0)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 0, 0)),
                ),
                enemy_shephard_run_01: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 0, 1)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 1, 1)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 2, 1)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 3, 1)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 4, 1)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 5, 1)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 6, 1)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 7, 1)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 0, 1)),
                ),
                enemy_shephard_run_02: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 0, 2)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 1, 2)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 2, 2)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 3, 2)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 4, 2)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 5, 2)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 6, 2)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 7, 2)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 0, 2)),
                ),
                enemy_shephard_run_03: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 0, 3)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 1, 3)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 2, 3)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 3, 3)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 4, 3)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 5, 3)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 6, 3)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 7, 3)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 0, 3)),
                ),
                enemy_ss_stand: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 0)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 0)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 0)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 0)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 0)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 0)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 0)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 0)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 0)),
                ),
                enemy_ss_run_01: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 1)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 1)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 1)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 1)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 1)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 1)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 1)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 1)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 1)),
                ),
                enemy_ss_run_02: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 2)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 2)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 2)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 2)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 2)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 2)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 2)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 2)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 2)),
                ),
                enemy_ss_run_03: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 3)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 3)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 3)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 3)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 3)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 3)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 3)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 3)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 3)),
                ),
                enemy_ss_run_04: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 4)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 4)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 4)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 4)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 4)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 4)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 4)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 4)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 4)),
                ),
                enemy_trooper_stand: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 6)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 6)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 6)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 6)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 6)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 6)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 6)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 6)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 6)),
                ),
                enemy_trooper_run_01: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 7)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 7)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 7)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 7)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 7)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 7)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 7)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 7)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 7)),
                ),
                enemy_trooper_run_02: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 9, 8)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 8)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 8)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 8)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 8)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 8)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 8)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 8)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 8)),
                ),
                enemy_trooper_run_03: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 9)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 9)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 9)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 9)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 9)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 9)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 9)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 9)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 9)),
                ),
                enemy_trooper_run_04: new TextureConditional(
                    new TextureConditionalItem((-180.01).toRad(), (-157.5).toRad(), new Texture(TexturesData.stitched, 8, 10)),
                    new TextureConditionalItem((-157.5).toRad(), (-112.5).toRad(), new Texture(TexturesData.stitched, 9, 10)),
                    new TextureConditionalItem((-112.5).toRad(), (-67.5).toRad(), new Texture(TexturesData.stitched, 10, 10)),
                    new TextureConditionalItem((-67.5).toRad(), (-22.5).toRad(), new Texture(TexturesData.stitched, 11, 10)),
                    new TextureConditionalItem((-22.5).toRad(), (22.5).toRad(), new Texture(TexturesData.stitched, 12, 10)),
                    new TextureConditionalItem((22.5).toRad(), (67.5).toRad(), new Texture(TexturesData.stitched, 13, 10)),
                    new TextureConditionalItem((67.5).toRad(), (112.5).toRad(), new Texture(TexturesData.stitched, 14, 10)),
                    new TextureConditionalItem((112.5).toRad(), (157.5).toRad(), new Texture(TexturesData.stitched, 15, 10)),
                    new TextureConditionalItem((157.5).toRad(), (180.01).toRad(), new Texture(TexturesData.stitched, 8, 10)),
                ),
                hud_BJBlazkowicz_looking_left: new TextureConditional(
                    new TextureConditionalItem(0, 0.1, new Texture(TexturesData.status, 96 + 4 * 24, 0 + 3 * 31, 24, 31, 1)),
                    new TextureConditionalItem(0.1, 13, new Texture(TexturesData.status, 96 + 3 * 24, 0 + 2 * 31, 24, 31, 1)),
                    new TextureConditionalItem(13, 29, new Texture(TexturesData.status, 96 + 3 * 24, 0 + 1 * 31, 24, 31, 1)),
                    new TextureConditionalItem(29, 42, new Texture(TexturesData.status, 96 + 3 * 24, 0 + 0 * 31, 24, 31, 1)),
                    new TextureConditionalItem(42, 57, new Texture(TexturesData.status, 96 + 0 * 24, 0 + 3 * 31, 24, 31, 1)),
                    new TextureConditionalItem(57, 72, new Texture(TexturesData.status, 96 + 0 * 24, 0 + 2 * 31, 24, 31, 1)),
                    new TextureConditionalItem(72, 86, new Texture(TexturesData.status, 96 + 0 * 24, 0 + 1 * 31, 24, 31, 1)),
                    new TextureConditionalItem(86, 100.1, new Texture(TexturesData.status, 96 + 0 * 24, 0 + 0 * 31, 24, 31, 1)),
                ),
                hud_BJBlazkowicz_looking_middle: new TextureConditional(
                    new TextureConditionalItem(0, 0.1, new Texture(TexturesData.status, 96 + 4 * 24, 0 + 3 * 31, 24, 31, 1)),
                    new TextureConditionalItem(0.1, 13, new Texture(TexturesData.status, 96 + 4 * 24, 0 + 2 * 31, 24, 31, 1)),
                    new TextureConditionalItem(13, 29, new Texture(TexturesData.status, 96 + 4 * 24, 0 + 1 * 31, 24, 31, 1)),
                    new TextureConditionalItem(29, 42, new Texture(TexturesData.status, 96 + 4 * 24, 0 + 0 * 31, 24, 31, 1)),
                    new TextureConditionalItem(42, 57, new Texture(TexturesData.status, 96 + 1 * 24, 0 + 3 * 31, 24, 31, 1)),
                    new TextureConditionalItem(57, 72, new Texture(TexturesData.status, 96 + 1 * 24, 0 + 2 * 31, 24, 31, 1)),
                    new TextureConditionalItem(72, 86, new Texture(TexturesData.status, 96 + 1 * 24, 0 + 1 * 31, 24, 31, 1)),
                    new TextureConditionalItem(86, 100.1, new Texture(TexturesData.status, 96 + 1 * 24, 0 + 0 * 31, 24, 31, 1)),
                ),
                hud_BJBlazkowicz_looking_right: new TextureConditional(
                    new TextureConditionalItem(0, 0.1, new Texture(TexturesData.status, 96 + 4 * 24, 0 + 3 * 31, 24, 31, 1)),
                    new TextureConditionalItem(0.1, 13, new Texture(TexturesData.status, 96 + 5 * 24, 0 + 2 * 31, 24, 31, 1)),
                    new TextureConditionalItem(13, 29, new Texture(TexturesData.status, 96 + 5 * 24, 0 + 1 * 31, 24, 31, 1)),
                    new TextureConditionalItem(29, 42, new Texture(TexturesData.status, 96 + 5 * 24, 0 + 0 * 31, 24, 31, 1)),
                    new TextureConditionalItem(42, 57, new Texture(TexturesData.status, 96 + 2 * 24, 0 + 3 * 31, 24, 31, 1)),
                    new TextureConditionalItem(57, 72, new Texture(TexturesData.status, 96 + 2 * 24, 0 + 2 * 31, 24, 31, 1)),
                    new TextureConditionalItem(72, 86, new Texture(TexturesData.status, 96 + 2 * 24, 0 + 1 * 31, 24, 31, 1)),
                    new TextureConditionalItem(86, 100.1, new Texture(TexturesData.status, 96 + 2 * 24, 0 + 0 * 31, 24, 31, 1)),
                ),
                hud_numbers: new TextureConditional(
                    new TextureConditionalItem(0, 1, new Texture(TexturesData.status, 0 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(1, 2, new Texture(TexturesData.status, 1 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(2, 3, new Texture(TexturesData.status, 2 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(3, 4, new Texture(TexturesData.status, 3 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(4, 5, new Texture(TexturesData.status, 4 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(5, 6, new Texture(TexturesData.status, 5 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(6, 7, new Texture(TexturesData.status, 6 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(7, 8, new Texture(TexturesData.status, 7 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(8, 9, new Texture(TexturesData.status, 8 * 8, 48, 8, 16, 1)),
                    new TextureConditionalItem(9, 9.1, new Texture(TexturesData.status, 9 * 8, 48, 8, 16, 1)),
                ),
                font_menu: new TextureConditional(
                    new TextureConditionalItem(100, 101, new Texture(TexturesData.font_menu, 60, 26, 20, 26, 1)),
                    new TextureConditionalItem(101, 102, new Texture(TexturesData.font_menu, 80, 26, 20, 26, 1)),
                    new TextureConditionalItem(102, 103, new Texture(TexturesData.font_menu, 100, 26, 16, 26, 1)),
                    new TextureConditionalItem(103, 104, new Texture(TexturesData.font_menu, 116, 26, 20, 26, 1)),
                    new TextureConditionalItem(104, 105, new Texture(TexturesData.font_menu, 136, 26, 20, 26, 1)),
                    new TextureConditionalItem(105, 106, new Texture(TexturesData.font_menu, 156, 26, 8, 26, 1)),
                    new TextureConditionalItem(106, 107, new Texture(TexturesData.font_menu, 164, 26, 12, 26, 1)),
                    new TextureConditionalItem(107, 108, new Texture(TexturesData.font_menu, 176, 26, 20, 26, 1)),
                    new TextureConditionalItem(108, 109, new Texture(TexturesData.font_menu, 196, 26, 8, 26, 1)),
                    new TextureConditionalItem(109, 110, new Texture(TexturesData.font_menu, 204, 26, 24, 26, 1)),
                    new TextureConditionalItem(110, 111, new Texture(TexturesData.font_menu, 228, 26, 20, 26, 1)),
                    new TextureConditionalItem(111, 112, new Texture(TexturesData.font_menu, 248, 26, 20, 26, 1)),
                    new TextureConditionalItem(112, 113, new Texture(TexturesData.font_menu, 268, 26, 20, 26, 1)),
                    new TextureConditionalItem(113, 114, new Texture(TexturesData.font_menu, 288, 26, 20, 26, 1)),
                    new TextureConditionalItem(114, 115, new Texture(TexturesData.font_menu, 308, 26, 20, 26, 1)),
                    new TextureConditionalItem(115, 116, new Texture(TexturesData.font_menu, 328, 26, 20, 26, 1)),
                    new TextureConditionalItem(116, 117, new Texture(TexturesData.font_menu, 348, 26, 20, 26, 1)),
                    new TextureConditionalItem(117, 118, new Texture(TexturesData.font_menu, 368, 26, 20, 26, 1)),
                    new TextureConditionalItem(118, 119, new Texture(TexturesData.font_menu, 388, 26, 20, 26, 1)),
                    new TextureConditionalItem(119, 120, new Texture(TexturesData.font_menu, 408, 26, 24, 26, 1)),
                    new TextureConditionalItem(120, 121, new Texture(TexturesData.font_menu, 432, 26, 20, 26, 1)),
                    new TextureConditionalItem(121, 122, new Texture(TexturesData.font_menu, 452, 26, 20, 26, 1)),
                    new TextureConditionalItem(122, 123, new Texture(TexturesData.font_menu, 472, 26, 20, 26, 1)),
                    new TextureConditionalItem(33, 34, new Texture(TexturesData.font_menu, 112, 52, 8, 26, 1)),
                    new TextureConditionalItem(39, 40, new Texture(TexturesData.font_menu, 120, 52, 8, 26, 1)),
                    new TextureConditionalItem(44, 45, new Texture(TexturesData.font_menu, 128, 52, 8, 26, 1)),
                    new TextureConditionalItem(45, 46, new Texture(TexturesData.font_menu, 136, 52, 16, 26, 1)),
                    new TextureConditionalItem(46, 47, new Texture(TexturesData.font_menu, 152, 52, 8, 26, 1)),
                    new TextureConditionalItem(49, 50, new Texture(TexturesData.font_menu, 0, 52, 12, 26, 1)),
                    new TextureConditionalItem(50, 51, new Texture(TexturesData.font_menu, 12, 52, 20, 26, 1)),
                    new TextureConditionalItem(51, 52, new Texture(TexturesData.font_menu, 32, 52, 20, 26, 1)),
                    new TextureConditionalItem(52, 53, new Texture(TexturesData.font_menu, 52, 52, 20, 26, 1)),
                    new TextureConditionalItem(53, 54, new Texture(TexturesData.font_menu, 72, 52, 20, 26, 1)),
                    new TextureConditionalItem(54, 55, new Texture(TexturesData.font_menu, 92, 52, 20, 26, 1)),
                    new TextureConditionalItem(58, 59, new Texture(TexturesData.font_menu, 160, 52, 8, 26, 1)),
                    new TextureConditionalItem(63, 64, new Texture(TexturesData.font_menu, 168, 52, 20, 26, 1)),
                    new TextureConditionalItem(65, 66, new Texture(TexturesData.font_menu, 0, 0, 20, 26, 1)),
                    new TextureConditionalItem(66, 67, new Texture(TexturesData.font_menu, 20, 0, 20, 26, 1)),
                    new TextureConditionalItem(67, 68, new Texture(TexturesData.font_menu, 40, 0, 20, 26, 1)),
                    new TextureConditionalItem(68, 69, new Texture(TexturesData.font_menu, 60, 0, 20, 26, 1)),
                    new TextureConditionalItem(69, 70, new Texture(TexturesData.font_menu, 80, 0, 20, 26, 1)),
                    new TextureConditionalItem(70, 71, new Texture(TexturesData.font_menu, 100, 0, 20, 26, 1)),
                    new TextureConditionalItem(71, 72, new Texture(TexturesData.font_menu, 120, 0, 20, 26, 1)),
                    new TextureConditionalItem(72, 73, new Texture(TexturesData.font_menu, 140, 0, 20, 26, 1)),
                    new TextureConditionalItem(73, 74, new Texture(TexturesData.font_menu, 160, 0, 8, 26, 1)),
                    new TextureConditionalItem(74, 75, new Texture(TexturesData.font_menu, 168, 0, 20, 26, 1)),
                    new TextureConditionalItem(75, 76, new Texture(TexturesData.font_menu, 188, 0, 22, 26, 1)),
                    new TextureConditionalItem(76, 77, new Texture(TexturesData.font_menu, 210, 0, 20, 26, 1)),
                    new TextureConditionalItem(77, 78, new Texture(TexturesData.font_menu, 230, 0, 24, 26, 1)),
                    new TextureConditionalItem(78, 79, new Texture(TexturesData.font_menu, 254, 0, 20, 26, 1)),
                    new TextureConditionalItem(79, 80, new Texture(TexturesData.font_menu, 274, 0, 20, 26, 1)),
                    new TextureConditionalItem(80, 81, new Texture(TexturesData.font_menu, 294, 0, 20, 26, 1)),
                    new TextureConditionalItem(81, 82, new Texture(TexturesData.font_menu, 314, 0, 20, 26, 1)),
                    new TextureConditionalItem(82, 83, new Texture(TexturesData.font_menu, 334, 0, 20, 26, 1)),
                    new TextureConditionalItem(83, 84, new Texture(TexturesData.font_menu, 354, 0, 20, 26, 1)),
                    new TextureConditionalItem(84, 85, new Texture(TexturesData.font_menu, 374, 0, 20, 26, 1)),
                    new TextureConditionalItem(85, 86, new Texture(TexturesData.font_menu, 394, 0, 20, 26, 1)),
                    new TextureConditionalItem(86, 87, new Texture(TexturesData.font_menu, 414, 0, 20, 26, 1)),
                    new TextureConditionalItem(87, 88, new Texture(TexturesData.font_menu, 434, 0, 24, 26, 1)),
                    new TextureConditionalItem(88, 89, new Texture(TexturesData.font_menu, 458, 0, 20, 26, 1)),
                    new TextureConditionalItem(89, 90, new Texture(TexturesData.font_menu, 478, 0, 20, 26, 1)),
                    new TextureConditionalItem(90, 91, new Texture(TexturesData.font_menu, 498, 0, 20, 26, 1)),
                    new TextureConditionalItem(97, 98, new Texture(TexturesData.font_menu, 0, 26, 20, 26, 1)),
                    new TextureConditionalItem(98, 99, new Texture(TexturesData.font_menu, 20, 26, 20, 26, 1)),
                    new TextureConditionalItem(99, 100, new Texture(TexturesData.font_menu, 40, 26, 20, 26, 1)),
                ),
                font_end: new TextureConditional(
                    new TextureConditionalItem(33, 34, new Texture(TexturesData.font_end, 120, 48, 8, 16, 1)),
                    new TextureConditionalItem(37, 38, new Texture(TexturesData.font_end, 104, 48, 16, 16, 1)),
                    new TextureConditionalItem(39, 40, new Texture(TexturesData.font_end, 128, 48, 8, 16, 1)),
                    new TextureConditionalItem(48, 49, new Texture(TexturesData.font_end, 0, 0, 16, 16, 1)),
                    new TextureConditionalItem(49, 50, new Texture(TexturesData.font_end, 16, 0, 16, 16, 1)),
                    new TextureConditionalItem(50, 51, new Texture(TexturesData.font_end, 32, 0, 16, 16, 1)),
                    new TextureConditionalItem(51, 52, new Texture(TexturesData.font_end, 48, 0, 16, 16, 1)),
                    new TextureConditionalItem(52, 53, new Texture(TexturesData.font_end, 64, 0, 16, 16, 1)),
                    new TextureConditionalItem(53, 54, new Texture(TexturesData.font_end, 80, 0, 16, 16, 1)),
                    new TextureConditionalItem(54, 55, new Texture(TexturesData.font_end, 96, 0, 16, 16, 1)),
                    new TextureConditionalItem(55, 56, new Texture(TexturesData.font_end, 112, 0, 16, 16, 1)),
                    new TextureConditionalItem(56, 57, new Texture(TexturesData.font_end, 128, 0, 16, 16, 1)),
                    new TextureConditionalItem(57, 58, new Texture(TexturesData.font_end, 144, 0, 16, 16, 1)),
                    new TextureConditionalItem(58, 59, new Texture(TexturesData.font_end, 96, 48, 8, 16, 1)),
                    new TextureConditionalItem(65, 66, new Texture(TexturesData.font_end, 0, 16, 16, 16, 1)),
                    new TextureConditionalItem(66, 67, new Texture(TexturesData.font_end, 16, 16, 16, 16, 1)),
                    new TextureConditionalItem(67, 68, new Texture(TexturesData.font_end, 32, 16, 16, 16, 1)),
                    new TextureConditionalItem(68, 69, new Texture(TexturesData.font_end, 48, 16, 16, 16, 1)),
                    new TextureConditionalItem(69, 70, new Texture(TexturesData.font_end, 64, 16, 16, 16, 1)),
                    new TextureConditionalItem(70, 71, new Texture(TexturesData.font_end, 80, 16, 16, 16, 1)),
                    new TextureConditionalItem(71, 72, new Texture(TexturesData.font_end, 96, 16, 16, 16, 1)),
                    new TextureConditionalItem(72, 73, new Texture(TexturesData.font_end, 112, 16, 16, 16, 1)),
                    new TextureConditionalItem(73, 74, new Texture(TexturesData.font_end, 128, 16, 16, 16, 1)),
                    new TextureConditionalItem(74, 75, new Texture(TexturesData.font_end, 144, 16, 16, 16, 1)),
                    new TextureConditionalItem(75, 76, new Texture(TexturesData.font_end, 0, 32, 16, 16, 1)),
                    new TextureConditionalItem(76, 77, new Texture(TexturesData.font_end, 16, 32, 16, 16, 1)),
                    new TextureConditionalItem(77, 78, new Texture(TexturesData.font_end, 32, 32, 16, 16, 1)),
                    new TextureConditionalItem(78, 79, new Texture(TexturesData.font_end, 48, 32, 16, 16, 1)),
                    new TextureConditionalItem(79, 80, new Texture(TexturesData.font_end, 64, 32, 16, 16, 1)),
                    new TextureConditionalItem(80, 81, new Texture(TexturesData.font_end, 80, 32, 16, 16, 1)),
                    new TextureConditionalItem(81, 82, new Texture(TexturesData.font_end, 96, 32, 16, 16, 1)),
                    new TextureConditionalItem(82, 83, new Texture(TexturesData.font_end, 112, 32, 16, 16, 1)),
                    new TextureConditionalItem(83, 84, new Texture(TexturesData.font_end, 128, 32, 16, 16, 1)),
                    new TextureConditionalItem(84, 85, new Texture(TexturesData.font_end, 144, 32, 16, 16, 1)),
                    new TextureConditionalItem(85, 86, new Texture(TexturesData.font_end, 0, 48, 16, 16, 1)),
                    new TextureConditionalItem(86, 87, new Texture(TexturesData.font_end, 16, 48, 16, 16, 1)),
                    new TextureConditionalItem(87, 88, new Texture(TexturesData.font_end, 32, 48, 16, 16, 1)),
                    new TextureConditionalItem(88, 89, new Texture(TexturesData.font_end, 48, 48, 16, 16, 1)),
                    new TextureConditionalItem(89, 90, new Texture(TexturesData.font_end, 64, 48, 16, 16, 1)),
                    new TextureConditionalItem(90, 91, new Texture(TexturesData.font_end, 80, 48, 16, 16, 1))
                ),
                screen_difficulty_face: new TextureConditional(
                    new TextureConditionalItem(0, 1, new Texture(TexturesData.screens, 0, 811, 24, 32, 1)),
                    new TextureConditionalItem(1, 2, new Texture(TexturesData.screens, 24, 811, 24, 32, 1)),
                    new TextureConditionalItem(2, 3, new Texture(TexturesData.screens, 48, 811, 24, 32, 1)),
                    new TextureConditionalItem(3, 4, new Texture(TexturesData.screens, 72, 811, 24, 32, 1)),
                )
            },
            texturesAnimated: {
                hud_BJBlazkowicz_looking: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(0.25, TexturesConditional.hud_BJBlazkowicz_looking_left),
                    new TextureAnimatedItem(0.25, TexturesConditional.hud_BJBlazkowicz_looking_right),
                    new TextureAnimatedItem(0.25, TexturesConditional.hud_BJBlazkowicz_looking_left),
                    new TextureAnimatedItem(1.7, TexturesConditional.hud_BJBlazkowicz_looking_middle),
                ),
                weapon_knife_attack: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.weapon_knife_02),
                    new TextureAnimatedItem(0.125, Textures.weapon_knife_03),
                    new TextureAnimatedItem(0.125, Textures.weapon_knife_04, "shoot_knife"),
                    new TextureAnimatedItem(0.125, Textures.weapon_knife_05),
                ),
                weapon_pistol_attack: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.weapon_pistol_02),
                    new TextureAnimatedItem(0.125, Textures.weapon_pistol_03),
                    new TextureAnimatedItem(0.125, Textures.weapon_pistol_04, "shoot_pistol"),
                    new TextureAnimatedItem(0.125, Textures.weapon_pistol_05),
                ),
                weapon_machinegun_begin: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.weapon_machinegun_02),
                ),
                weapon_machinegun_attack: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(0.125, Textures.weapon_machinegun_03, "shoot_machinegun"),
                    new TextureAnimatedItem(0.125, Textures.weapon_machinegun_04),
                ),
                weapon_machinegun_end: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.weapon_machinegun_05),
                ),
                weapon_chaingun_begin: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.weapon_chaingun_02),
                ),
                weapon_chaingun_attack: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(0.125, Textures.weapon_chaingun_03, "shoot_chaingun"),
                    new TextureAnimatedItem(0.125, Textures.weapon_chaingun_04, "shoot_chaingun"),
                ),
                weapon_chaingun_end: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.weapon_chaingun_05),
                ),
                enemy_shephard_run: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_shephard_run_01),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_shephard_run_02),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_shephard_run_03),
                ),
                enemy_ss_run: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_ss_run_01),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_ss_run_02),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_ss_run_03),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_ss_run_04),
                ),
                enemy_trooper_run: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_trooper_run_01),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_trooper_run_02),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_trooper_run_03),
                    new TextureAnimatedItem(0.125, TexturesConditional.enemy_trooper_run_04),
                ),
                enemy_trooper_damaged: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.25, Textures.enemy_trooper_damaged)
                ),
                enemy_ss_damaged: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.25, Textures.enemy_ss_damaged)
                ),
                enemy_shephard_dying: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.enemy_shephard_dying_01),
                    new TextureAnimatedItem(0.125, Textures.enemy_shephard_dying_02),
                    new TextureAnimatedItem(0.125, Textures.enemy_shephard_dying_03),
                    new TextureAnimatedItem(0.125, Textures.enemy_shephard_dying_04),
                ),
                enemy_trooper_dying: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_dying_01),
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_dying_02),
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_dying_03),
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_dying_04),
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_dying_05),
                ),
                enemy_ss_dying: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.enemy_ss_dying_01),
                    new TextureAnimatedItem(0.125, Textures.enemy_ss_dying_02),
                    new TextureAnimatedItem(0.125, Textures.enemy_ss_dying_03),
                    new TextureAnimatedItem(0.125, Textures.enemy_ss_dying_04),
                ),
                enemy_ss_attack: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.enemy_ss_attack_01),
                    new TextureAnimatedItem(0.125, Textures.enemy_ss_attack_02),
                    new TextureAnimatedItem(0.175, Textures.enemy_ss_attack_03),
                ),
                enemy_shephard_attack: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.enemy_shephard_attack_01),
                    new TextureAnimatedItem(0.125, Textures.enemy_shephard_attack_02),
                    new TextureAnimatedItem(0.175, Textures.enemy_shephard_attack_03),
                ),
                enemy_trooper_attack: new TextureAnimated(
                    "once",
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_attack_01),
                    new TextureAnimatedItem(0.125, Textures.enemy_trooper_attack_02),
                    new TextureAnimatedItem(0.175, Textures.enemy_trooper_attack_03, "shoot"),
                ),
                hud_option_marker: new TextureAnimated(
                    "infinite",
                    new TextureAnimatedItem(2, Textures.hud_option_marker_light),
                    new TextureAnimatedItem(0.175, Textures.hud_option_marker_dark),
                )
            }
        }
    }

    load(): Promise<void> {
        return new Promise((resolve, reject) => {
            let toLoad = 0;
            toLoad += Object.keys(Shaders).length;
            toLoad += Object.keys(Sounds).length;
            toLoad += Object.keys(TexturesData).length;

            console.log("Initial to load:", toLoad);

            //! Load SYNC
            // Load variants
            Object.values(this.data.texturesVariant).forEach(variant => {
                variant.load();
            });

            Object.values(this.data.soundsVariant).forEach(variant => {
                variant.load();
            });

            //! Load ASYNC
            // Load shaders
            for (const resourceName in this.data.shaders) {
                let resource = this.data.shaders[resourceName as keyof ResourceBranch<Shaders>];

                this.loadAsset(resource.src)
                    .then(data => {
                        resource.data = data;
                        if (--toLoad === 0) { resolve() }
                        console.log("To load:", toLoad, resourceName);
                    });
            }

            // Load sounds
            for (const resourceName in this.data.sounds) {
                let resource = this.data.sounds[resourceName as keyof ResourceBranch<Sounds>];

                resource.data.onloadeddata = () => {
                    if (--toLoad === 0) { resolve() }
                    console.log("To load:", toLoad, resourceName);
                }
            }

            // Load textures data
            for (const resourceName in this.data.texturesData) {
                let texture = this.data.texturesData[resourceName as keyof ResourceBranch<TexturesData>];

                texture.image.src = texture.src;
                texture.image.onload = () => {
                    if (--toLoad === 0) { resolve() }
                    console.log("To load:", toLoad, resourceName);
                }
            }
        });
    }

    private loadAsset(src: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(src)
                .then(res => res.status !== 200 ? "" : res.text())
                .then(data => resolve(data))
        });
    }
}