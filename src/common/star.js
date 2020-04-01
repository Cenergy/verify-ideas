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
        this.ctx.drawImage(this.img, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
    }

    update() {
        this.picNo += 1;
        if (this.picNo >= 7) {
            this.picNo = 0;
        }
    }
}
