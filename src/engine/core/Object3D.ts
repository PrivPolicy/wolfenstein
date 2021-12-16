import { Euler } from "../math/Euler";
import { Vector3 } from "../math/Vector3"

export class Object3D {
    private _parent?: Object3D
    private _children: Set<Object3D>
    readonly position: Vector3;
    readonly rotation: Euler;
    readonly scale: Vector3;

    constructor() {
        this._parent = undefined;
        this._children = new Set();
        this.position = new Vector3();
        this.rotation = new Euler();
        this.scale = new Vector3(1, 1, 1);
    }

    get parent() {
        return this._parent;
    }

    get children() {
        return Array.from(this._children);
    }

    add(...children: Object3D[]) {
        if (Array.isArray(children)) {
            for (const child of children) {
                this._children.add(child);
                child._parent = this;
            }
        }
    }

    remove(child: Object3D) {
        this._children.delete(child);
        child._parent = undefined;
    }
}