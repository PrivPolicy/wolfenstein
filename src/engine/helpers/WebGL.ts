import { TextureCoords } from "../geometry/Geometry";
import { TextureMaterial } from "../material/TextureMaterial";
import { Resources } from "../resources/Resources";

export class WebGL {
    private constructor() { }

    static createShader(gl: WebGLRenderingContext, type: GLenum, data: string) {
        let shader = gl.createShader(type);

        if (shader === null) {
            throw new Error("Error while creating shader.");
        }

        gl.shaderSource(shader, data);
        gl.compileShader(shader);

        let result = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

        if (result) {
            return shader;
        }

        let errorInfo = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);

        throw new Error("Error while creating the shader:\n" + errorInfo || "Error while creating the shader.");
    }

    static createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        let program = gl.createProgram();

        if (program === null) {
            throw new Error("Error while creating program.");
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        let result = gl.getProgramParameter(program, gl.LINK_STATUS);

        if (result) {
            return program;
        }

        let errorInfo = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);

        throw new Error("Error while creating the program." + errorInfo || "Error while creating the program.");
    }

    static getColors(material: TextureMaterial, coords: TextureCoords): number[] {
        if (material.textureType === "single") {
            let texture = material.left;
            let textureReference = Resources.instance.data.texturesData[texture.reference];

            return coords.map((n, i) => {
                if (i % 2 === 0) {
                    return (n * texture.width + texture.u) / textureReference.image.naturalWidth;
                } else {
                    return (n * texture.height + texture.v) / textureReference.image.naturalHeight;
                }
            });
        } else {
            let textures = material.all;
            let textureReference = Resources.instance.data.texturesData[textures[0].reference];

            return coords.map((n, i) => {
                const texture = textures[Math.floor(i / 12)];
                if (i % 2 === 0) {
                    return (n * texture.width + texture.u) / textureReference.image.naturalWidth;
                } else {
                    return (n * texture.height + texture.v) / textureReference.image.naturalHeight;
                }
            });
        }
    }
}