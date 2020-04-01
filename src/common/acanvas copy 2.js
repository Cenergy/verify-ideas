/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

export default class AniCanvas {
    constructor(options) {
        const { canvas, color = '#ccc' } = options;
        this.ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, width, height);
        // this.draw({
        //     src: 'http://localhost:8080/girl.jpg',
        //     postion: [padLeft, padTop, girlWidth, girlHeight],
        // });
        // this.init();
        this.drawStars();
        this.tick();
        this.picNo = 0;
    }

    drawStars() {
        const starPic = new Image();
        starPic.src = 'http://localhost:8080/star.png';
        for (let i = 0; i < 60; i += 1) {
            console.log(`rdapp: AniCanvas -> drawStars ->  i`, i);
        }
        starPic.onload = () => {
            for (let i = 0; i < 60; i += 1) {
                const x = Math.random() * 600 + 100;
                const y = Math.random() * 300 + 150;
                this.ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, x, y, 7, 7);
            }
        };
    }

    update() {
        this.picNo += 1;
        if (this.picNo >= 7) {
            this.picNo = 0;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    tick() {
        const gameLoop = () => {
            // this.drawStars();
            this.update();
            window.requestAnimationFrame(gameLoop);
        };
        window.requestAnimationFrame(gameLoop);
    }
}
