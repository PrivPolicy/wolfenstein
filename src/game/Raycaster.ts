import { Mesh } from "../engine/core/Mesh";
import { Scene } from "../engine/core/Scene";
import { BoxGeometry } from "../engine/geometry/BoxGeometry";
import { TextureMaterial } from "../engine/material/TextureMaterial";
import { Vector2 } from "../engine/math/Vector2";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class Raycaster {
    static raycastEnemies(blockSize: number, from: Vector2, direction: Vector2, scene: Scene, maxLength: number = 10 * blockSize, enemy: Enemy | null = null): Enemy | null {
        let raycastTargets: Mesh<BoxGeometry, TextureMaterial>[] = [];
        let enemies: Enemy[] = [];
        let enemyMightHit: Enemy | null = null;

        scene.children.forEach(child => {
            if (child instanceof Enemy) {
                enemies.push(child);
            } else if (child instanceof Mesh) {
                if (child.geometry instanceof BoxGeometry) {
                    if (child.geometry.collider.enabled === true && child.geometry.collider.raycastTarget === true) {
                        raycastTargets.push(child);
                    }
                }
            }
        });

        if (enemy !== null) {
            enemies = [enemy];
        }

        for (const enemy of enemies) {
            let w = enemy.geometry.width;
            let enemyPos = enemy.position.toVector2();
            let enemyFromDirection = from.sub(enemyPos).normalize();

            let dir1 = enemyFromDirection.rotate((-90).toRad()).mul(w / 3);
            let dir2 = enemyFromDirection.rotate((90).toRad()).mul(w / 3);

            let v1 = dir1.add(enemyPos).sub(from);
            let v2 = dir2.add(enemyPos).sub(from);

            let a1 = direction.angle(v1);
            let a2 = v2.angle(direction);

            if (a1 <= 0 && a2 <= 0) {
                enemyMightHit = enemy;
                break;
            }
        };

        if (enemyMightHit === null) {
            return null;
        }

        let enemyDistance = from.sub(enemyMightHit.position.toVector2()).length();

        const [dirXSign, dirYSign] = [Math.sign(direction.x), Math.sign(direction.y)];

        const maxLineX = direction.normalize().mul(maxLength).add(from).x;
        const maxLineY = direction.normalize().mul(maxLength).add(from).y;

        let lineX = Math.ceil((from.x - blockSize / 2) / blockSize) * blockSize + (blockSize / 2 * dirXSign);
        let lineY = Math.ceil((from.y - blockSize / 2) / blockSize) * blockSize + (blockSize / 2 * dirYSign);

        let targetX = Math.ceil((from.x - blockSize / 2) / blockSize) * blockSize;
        let targetY = Math.ceil((from.y - blockSize / 2) / blockSize) * blockSize;

        const a = direction.y / direction.x;
        let distance = 0;

        // console.log("--==≡≡≡≡==--");
        // console.log(from.x, from.y);
        // console.log(`X = ${direction.x}, Z = ${direction.y}`);

        while (distance <= maxLength && distance < enemyDistance && ((maxLineX - lineX) * dirXSign > 0 || (maxLineY - lineY) * dirYSign > 0)) {
            let dx = Math.abs(lineX - from.x);
            let dy = Math.abs(lineY - from.y);

            let dis = Math.abs(a * dx);

            // console.log("--");

            let intersectionX;
            let intersectionY;

            if (dis <= dy) {
                intersectionX = lineX;
                intersectionY = from.y + (a * dx * dirXSign);

                targetX += blockSize * dirXSign;
                lineX += blockSize * dirXSign;
            } else {
                intersectionX = from.x + (dy / a * dirYSign);
                intersectionY = lineY;

                targetY += blockSize * dirYSign;
                lineY += blockSize * dirYSign;
            }

            let target = raycastTargets.find(target => target.position.x === targetX && target.position.z === targetY);

            let intersectionPoint = new Vector2(intersectionX, intersectionY);
            distance = from.sub(intersectionPoint).length();

            if (target !== undefined && distance < enemyDistance) {
                return null;
            }
        }

        if (enemyDistance < maxLength) {
            return enemyMightHit;
        } else {
            return null;
        }
    }

    static raycastPlayer(blockSize: number, from: Vector2, direction: Vector2, scene: Scene, maxLength: number = 10 * blockSize, player: Player): boolean {
        let raycastTargets: Mesh<BoxGeometry, TextureMaterial>[] = [];


        scene.children.forEach(child => {
            if (child instanceof Enemy) {
                // skip
            } else if (child instanceof Mesh) {
                if (child.geometry instanceof BoxGeometry) {
                    if (child.geometry.collider.enabled === true && child.geometry.collider.raycastTarget === true) {
                        raycastTargets.push(child);
                    }
                }
            }
        });

        let enemyDistance = from.sub(player.position.toVector2()).length();

        const [dirXSign, dirYSign] = [Math.sign(direction.x), Math.sign(direction.y)];

        const maxLineX = direction.normalize().mul(maxLength).add(from).x;
        const maxLineY = direction.normalize().mul(maxLength).add(from).y;

        let lineX = Math.ceil((from.x - blockSize / 2) / blockSize) * blockSize + (blockSize / 2 * dirXSign);
        let lineY = Math.ceil((from.y - blockSize / 2) / blockSize) * blockSize + (blockSize / 2 * dirYSign);

        let targetX = Math.ceil((from.x - blockSize / 2) / blockSize) * blockSize;
        let targetY = Math.ceil((from.y - blockSize / 2) / blockSize) * blockSize;

        const a = direction.y / direction.x;
        let distance = 0;

        // console.log("--==≡≡≡≡==--");
        // console.log(from.x, from.y);
        // console.log(`X = ${direction.x}, Z = ${direction.y}`);

        while (distance <= maxLength && distance < enemyDistance && ((maxLineX - lineX) * dirXSign > 0 || (maxLineY - lineY) * dirYSign > 0)) {
            let dx = Math.abs(lineX - from.x);
            let dy = Math.abs(lineY - from.y);

            let dis = Math.abs(a * dx);

            // console.log("--");

            let intersectionX;
            let intersectionY;

            if (dis <= dy) {
                intersectionX = lineX;
                intersectionY = from.y + (a * dx * dirXSign);

                targetX += blockSize * dirXSign;
                lineX += blockSize * dirXSign;
            } else {
                intersectionX = from.x + (dy / a * dirYSign);
                intersectionY = lineY;

                targetY += blockSize * dirYSign;
                lineY += blockSize * dirYSign;
            }

            let target = raycastTargets.find(target => target.position.x === targetX && target.position.z === targetY);

            let intersectionPoint = new Vector2(intersectionX, intersectionY);
            distance = from.sub(intersectionPoint).length();

            if (target !== undefined && distance < enemyDistance) {
                return false;
            }
        }

        return enemyDistance < maxLength
    }
}