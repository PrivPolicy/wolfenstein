import { Vector2 } from "../math/Vector2";
import { Collider } from "./Collider";

export class BoxCollider implements Collider {
    private width: number;
    private depth: number;
    enabled: boolean;
    raycastTarget: boolean;

    constructor(width: number, height: number, depth: number) {
        this.width = width;
        this.depth = depth;

        this.enabled = true;
        this.raycastTarget = true;
    }

    getBBox2D(): Vector2[] {
        return [
            new Vector2(-this.width / 2, -this.depth / 2),
            new Vector2(-this.width / 2, this.depth / 2),
            new Vector2(this.width / 2, this.depth / 2),
            new Vector2(this.width / 2, -this.depth / 2),
        ];
    }

    setSize(width: number, height: number, depth: number) {
        this.width = width;
        this.depth = depth;
    }
}