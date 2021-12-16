import { Collider } from "../collider/Collider";

export type TextureCoords = number[];

export interface Geometry {
    vertices: number[]
    textureCoords: TextureCoords
    collider?: Collider
}