import { PlaneGeometry } from "../engine/geometry/PlaneGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";
import { Resources } from "../engine/resources/Resources";
import { Texture } from "../engine/resources/Texture";
import { Plane } from "./Plane";

export enum PickupType {
    alpo = 0,
    clip = 1,
    clip_used = 2,
    blood = 3,
    cross = 4,
    chalice = 5,
    chest = 6,
    crown = 7,
    chickenmeal = 8,
    extralife = 9,
    skeleton_bloody = 10,
    key_golden = 11,
    key_silver = 12,
    firstaidkit = 13,
    machinegun = 14,
    chaingun = 15
}

const textureMap: { [key in PickupType]: Texture } = {
    [PickupType.alpo]: Resources.instance.data.textures.pickup_alpo,
    [PickupType.clip]: Resources.instance.data.textures.pickup_clip,
    [PickupType.clip_used]: Resources.instance.data.textures.pickup_clip,
    [PickupType.blood]: Resources.instance.data.textures.object_blood,
    [PickupType.cross]: Resources.instance.data.textures.pickup_cross,
    [PickupType.chalice]: Resources.instance.data.textures.pickup_chalice,
    [PickupType.chest]: Resources.instance.data.textures.pickup_chest,
    [PickupType.crown]: Resources.instance.data.textures.pickup_crown,
    [PickupType.chickenmeal]: Resources.instance.data.textures.pickup_chickenmeal,
    [PickupType.extralife]: Resources.instance.data.textures.pickup_extralife,
    [PickupType.skeleton_bloody]: Resources.instance.data.textures.object_skeleton_blood,
    [PickupType.key_golden]: Resources.instance.data.textures.pickup_key_golden,
    [PickupType.key_silver]: Resources.instance.data.textures.pickup_key_silver,
    [PickupType.firstaidkit]: Resources.instance.data.textures.pickup_firstaidkit,
    [PickupType.machinegun]: Resources.instance.data.textures.pickup_machinegun,
    [PickupType.chaingun]: Resources.instance.data.textures.pickup_chaingun,
}

export class Pickup extends Plane {
    type: PickupType

    constructor(size: number, type: PickupType) {
        let geometry = new PlaneGeometry(size, size);
        let material = new TextureMaterial(textureMap[type]);

        super(geometry, material);

        this.type = type;
    }
}