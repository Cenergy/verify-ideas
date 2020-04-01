/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import Star from './star';

const img = new Image();
img.src = 'http://localhost:8080/star.png';
export default class AniCanvas {
    constructor(options) {
        const { canvas, color = '#ccc' } = options;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    plot() {
        console.log(this);
        this.starsList = [];
        for (let i = 0; i < 1; i += 1) {
            const a = new Star({
                ctx: this.ctx,
                width: this.width,
                height: this.height,
                left: 100,
                top: 100,
                img,
            });
            a.draw();
            this.starsList.push(a);
        }
    }

    tick() {
        const gameLoop = () => {
            this.starsList.forEach(star => {
                console.log(`rdapp: AniCanvas -> gameLoop -> star`, star);
                star.update();
            });
            window.requestAnimationFrame(gameLoop);
        };
        window.requestAnimationFrame(gameLoop);
    }
}
