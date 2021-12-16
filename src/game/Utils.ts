export class Utils {
    static resizeCanvas(canvas: HTMLCanvasElement, ratio: number, downscale = false) {
        if (downscale === false) {
            let width = document.body.clientWidth;
            let height = window.innerHeight;

            let targetAspectRatio = ratio;
            let realAspectRatio = width / height;

            if (realAspectRatio > targetAspectRatio) {
                canvas.height = height;
                canvas.width = height * targetAspectRatio;
            } else if (realAspectRatio < targetAspectRatio) {
                canvas.height = width / targetAspectRatio;
                canvas.width = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }
        } else {
            // canvas.width = 320;
            // canvas.height = 200;
            // canvas.width = 160;
            // canvas.height = 100;
            canvas.width = 80;
            canvas.height = 50;

            let width = document.body.clientWidth;
            let height = window.innerHeight;

            let targetAspectRatio = ratio;
            let realAspectRatio = width / height;

            if (realAspectRatio > targetAspectRatio) {
                canvas.style.width = height * targetAspectRatio + "px";
                canvas.style.height = height + "px";
            } else if (realAspectRatio < targetAspectRatio) {
                canvas.style.width = width + "px";
                canvas.style.height = width / targetAspectRatio + "px";
            } else {
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
            }
        }
    }
}