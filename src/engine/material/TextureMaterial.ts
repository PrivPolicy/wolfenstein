import { Texture } from "../resources/Texture";
import { Material } from "./Material";

export class TextureMaterial extends Material {
    left: Texture;
    right: Texture;
    up: Texture;
    down: Texture;
    front: Texture;
    back: Texture;
    all: Texture[];
    textureType: "single" | "multi";

    /**
     * Textures in order: LEFT, RIGHT, UP, DOWN, FRONT, BACK,
     */
    constructor(textures: Texture[])
    constructor(textures: Texture)
    constructor(textures: Texture | Texture[]) {
        super();

        if (textures instanceof Texture) {
            this.left = textures;
            this.right = textures;
            this.up = textures;
            this.down = textures;
            this.front = textures;
            this.back = textures;
            this.all = [textures];
            this.textureType = "single";
        } else {
            this.left = textures[0];
            this.right = textures[1] || textures[0];
            this.up = textures[2] || textures[0];
            this.down = textures[3] || textures[0];
            this.front = textures[4] || textures[0];
            this.back = textures[5] || textures[0];
            this.all = textures;
            this.textureType = "multi";
        }
    }

    setAll(texture: Texture) {
        this.all = Array(6).fill(texture);
        this.left = texture;
        this.right = texture;
        this.up = texture;
        this.down = texture;
        this.front = texture;
        this.back = texture;
    }
}