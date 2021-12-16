import { Door } from "../../game/Door";
import { BoxGeometry } from "../geometry/BoxGeometry";
import { PlaneGeometry } from "../geometry/PlaneGeometry";
import { WebGL } from "../helpers/WebGL";
import { TextureMaterial } from "../material/TextureMaterial";
import { Matrix4 } from "../math/Matrix4";
// import { Vector3 } from "../math/Vector3";
import { Resources } from "../resources/Resources";
import { Camera } from "./Camera";
import { Mesh } from "./Mesh";
import { Scene } from "./Scene";

export enum RendererAttributes {
    a_position = "a_position",
    a_color = "a_color",
    a_texCoord = "a_texCoord",
}

export enum RendererUniforms {
    u_matrix = "u_matrix",
}

export interface RendererData {
    readonly attributes: { [key in RendererAttributes]: number }
    readonly uniforms: { [key in RendererUniforms]: WebGLUniformLocation }
}

export class Renderer {
    readonly canvas: HTMLCanvasElement;
    private readonly context: WebGLRenderingContext;
    private readonly data: RendererData;

    private program: WebGLProgram;

    private readonly positionBuffer: WebGLBuffer;
    // private readonly colorBuffer: WebGLBuffer;
    private readonly texCoordBuffer: WebGLBuffer;

    constructor() {
        this.canvas = document.createElement("canvas");

        let c = this.canvas.getContext("webgl", { antialias: false });

        if (c === null) {
            throw new Error("WebGL is not supported");
        }

        this.context = c;
        let gl = this.context;

        this.data = {
            attributes: {
                a_position: 0,
                a_color: 0,
                a_texCoord: 0
            },
            uniforms: {
                u_matrix: 0,
            }
        }

        let vertexShader = WebGL.createShader(gl, gl.VERTEX_SHADER, Resources.instance.data.shaders.vertMatrix3DTextured.data);
        let fragmentShader = WebGL.createShader(gl, gl.FRAGMENT_SHADER, Resources.instance.data.shaders.fragMatrix3DTextured.data);

        this.program = WebGL.createProgram(gl, vertexShader, fragmentShader);

        this.linkData(this.program);

        this.positionBuffer = this.context.createBuffer()!;
        // this.colorBuffer = this.context.createBuffer()!;
        this.texCoordBuffer = this.context.createBuffer()!;

        this.init();
    }

    private init(gl = this.context) {
        gl.enableVertexAttribArray(0);

        gl.enableVertexAttribArray(this.data.attributes.a_position);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        // Position buffer
        let options = {
            size: 3,
            type: gl.FLOAT,
            normalize: false,
            stride: 0,
            offset: 0
        };

        gl.vertexAttribPointer(this.data.attributes.a_position, options.size, options.type, options.normalize, options.stride, options.offset);


        // gl.enableVertexAttribArray(this.data.attributes.a_color);
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

        // options = {
        //     size: 3,
        //     type: gl.UNSIGNED_BYTE,
        //     normalize: true,
        //     stride: 0,
        //     offset: 0,
        // };

        // gl.vertexAttribPointer(this.data.attributes.a_color, options.size, options.type, options.normalize, options.stride, options.offset);


        gl.enableVertexAttribArray(this.data.attributes.a_texCoord);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);

        options = {
            size: 2,
            type: gl.FLOAT,
            normalize: false,
            stride: 0,
            offset: 0,
        };

        gl.vertexAttribPointer(this.data.attributes.a_texCoord, options.size, options.type, options.normalize, options.stride, options.offset);


        let texture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Resources.instance.data.texturesData.stitched.image);
        gl.generateMipmap(gl.TEXTURE_2D);
    }

    private linkData(program: WebGLProgram, gl = this.context) {
        //! Link attributes
        for (const attribute in this.data.attributes) {
            this.data.attributes[attribute as keyof RendererData['attributes']] = gl.getAttribLocation(program, attribute);
        }

        //! Link uniforms
        for (const uniform in this.data.uniforms) {
            this.data.uniforms[uniform as keyof RendererData['uniforms']] = gl.getUniformLocation(program, uniform)!;
        }
    }

    render(scene: Scene, camera: Camera, gl = this.context) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(56 / 255, 56 / 255, 56 / 255, 1);
        // gl.clearColor(18 / 255, 18 / 255, 18 / 255, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(this.program);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        //! Drawing geometry
        let children = scene.children;

        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let near = 1;
        let far = 20 * 128;
        let projectionMatrix = Matrix4.perspective((60).toRad(), aspect, near, far);

        // let cameraMatrix = Matrix4.rotationY(camera.rotation.y);
        // cameraMatrix = Matrix4.translate(cameraMatrix, camera.position.x, camera.position.y, camera.position.z);
        // let cameraNewPosition = new Vector3(cameraMatrix.values[12], cameraMatrix.values[13], cameraMatrix.values[14]);

        // let viewMatrix = Matrix4.inverse(Matrix4.lookAt(cameraNewPosition, new Vector3(100, 0, 100)));
        // let viewProjectionMatrix = Matrix4.multiply(projectionMatrix, viewMatrix);

        let viewProjectionMatrix = Matrix4.multiply(projectionMatrix, camera.getViewInverseMatrix());

        for (const child of children) {
            let render = false;
            let resultMatrix = viewProjectionMatrix.copy();
            let colors: number[] = [];

            if (child instanceof Mesh) {
                if (child.geometry instanceof BoxGeometry && child.material instanceof TextureMaterial) {
                    render = true;

                    if (child instanceof Door) {
                        let pos = child.getPosition();
                        resultMatrix = Matrix4.translate(resultMatrix, pos.x, pos.y, pos.z);
                    } else {
                        resultMatrix = Matrix4.translate(resultMatrix, child.position.x, child.position.y, child.position.z);
                    }

                    // resultMatrix = Matrix4.rotateX(resultMatrix, child.rotation.x);
                    resultMatrix = Matrix4.rotateY(resultMatrix, child.rotation.y);
                    // resultMatrix = Matrix4.rotateZ(resultMatrix, child.rotation.z);
                    // resultMatrix = Matrix4.scale(resultMatrix, child.scale.x, child.scale.y, child.scale.z);

                    colors = WebGL.getColors(child.material, child.geometry.textureCoords);

                } else if (child.geometry instanceof PlaneGeometry && child.material instanceof TextureMaterial) {
                    render = true;

                    resultMatrix = Matrix4.translate(resultMatrix, child.position.x, child.position.y, child.position.z);
                    resultMatrix = Matrix4.rotateX(resultMatrix, child.rotation.x);
                    resultMatrix = Matrix4.rotateY(resultMatrix, child.rotation.y);
                    resultMatrix = Matrix4.rotateZ(resultMatrix, child.rotation.z);

                    colors = WebGL.getColors(child.material, child.geometry.textureCoords);
                }

                if (render === true) {
                    gl.uniformMatrix4fv(this.data.uniforms.u_matrix, false, resultMatrix.values);

                    //! Bind vertices
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(child.geometry.vertices), gl.STATIC_DRAW);

                    //! Bind textures
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

                    gl.drawArrays(gl.TRIANGLES, 0, child.geometry.vertices.length / 3);
                }
            }
        }
    }
}