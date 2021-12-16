import { BoxCollider } from "../collider/BoxCollider";
import { Geometry, TextureCoords } from "./Geometry";

export class BoxGeometry implements Geometry {
    readonly vertices: number[];
    readonly width: number;
    readonly height: number;
    readonly depth: number;
    readonly textureCoords: TextureCoords;
    readonly collider: BoxCollider;

    constructor(x = 1, y = 1, z = 1) {
        // super();

        this.width = x;
        this.height = y;
        this.depth = z;

        this.vertices = [
            -0.5, 0.5, -0.5, // front
            0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,

            0.5, 0.5, -0.5, // right
            0.5, 0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,

            -0.5, 0.5, 0.5, // left
            -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,

            0.5, 0.5, 0.5, // back
            -0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,

            -0.5, 0.5, 0.5, // top
            0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,

            -0.5, -0.5, -0.5, // bottom
            0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
        ].map((v, i) => {
            let a = [x, y, z];
            return v * a[i % a.length];
        });

        this.textureCoords = [
            ...Array(6).fill(0).flatMap(() =>
                [
                    1.0, 0.0,
                    0.0, 0.0,
                    1.0, 1.0,
                    1.0, 1.0,
                    0.0, 0.0,
                    0.0, 1.0,
                ]
            )
        ];

        this.collider = new BoxCollider(x, y, z);
    }
}