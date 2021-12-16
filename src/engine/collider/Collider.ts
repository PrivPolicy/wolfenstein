import { Vector2 } from "../math/Vector2";

export interface Collider {
    enabled: boolean;
    raycastTarget: boolean;
    getBBox2D(): Vector2[];
}