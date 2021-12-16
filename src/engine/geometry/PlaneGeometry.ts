import { Vector2 } from "../math/Vector2";
import { Geometry, TextureCoords } from "./Geometry";

export class PlaneGeometry implements Geometry {
    readonly vertices: number[];
    readonly width: number;
    readonly height: number;
    readonly textureCoords: TextureCoords;

    constructor(width = 1, height = 1) {
        // super();

        this.width = width;
        this.height = height;

        this.vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
        ].map((v, i) => {
            let a = [width, 1, height];
            return v * a[i % a.length];
        });

        this.textureCoords = [
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            0.0, 1.0,
        ];
    }

    getBBox2D() {
        return [
            new Vector2(-this.width / 2, -this.height / 2),
            new Vector2(-this.width / 2, this.height / 2),
            new Vector2(this.width / 2, this.height / 2),
            new Vector2(this.width / 2, -this.height / 2)
        ]
    }
}