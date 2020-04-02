export default class Star {
    constructor(options) {
        const { ctx, width, height, left, top, img } = options;
        this.ctx = ctx;
        this.x = Math.random() * width + left;
        this.y = Math.random() * height + top;
        this.img = img;
        this.picNo = 0;
    }

    draw() {
        // this.ctx.clearRect(0, 0, 800, 600);
        const ctx = this.ctx;
        const img = this.img;
        console.log(`rdapp: Star -> draw -> img`, img.width);
        // this.ctx.drawImage(this.img, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
        let i = 0;
        let j = 0;

        const gameLoop = () => {
            // 绘制新的图像时，需要先清除画布
            ctx.clearRect(0, 0, 800, 600);
            this.ctx.fillStyle = '#222';
            this.ctx.fillRect(0, 0, 800, 600);

            // 绘图每一帧
            /*
             * 裁剪的x轴，用来控制每一排不同的帧，
             * 裁剪的y轴，用来控制当前行走的方向(也就是绘制那一排)。
             * */
            ctx.drawImage(
                img,
                (img.width / 7) * i,
                (img.height / 7) * j,
                img.width / 7,
                img.height / 7,
                10,
                10,
                200,
                200
            );
            i += 1;

            // i的最大值为3
            if (i >= 7) {
                i = 0;
                j += 1;
            }
            if (j >= 7) {
                j = 0;
            }
            console.log(`rdapp: Star -> gameLoop -> j`, i, j);
            window.requestAnimationFrame(gameLoop);
        };
        window.requestAnimationFrame(gameLoop);
    }
}
