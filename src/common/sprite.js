export default class Sprite {
    constructor(options) {
        const { canvas, image, row = 1, column = 1, x, y } = options;
        const width = canvas.width;
        const height = canvas.height;
        this.context = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = image;
        this.row = row;
        this.column = column;

        this.frameRowIndex = Math.floor(Math.random() * row);
        this.frameColIndex = Math.floor(Math.random() * column);
        this.gridWidth = image.width / column;
        this.gridHeight = image.height / row;
    }

    update() {
        this.frameColIndex += 1;
        if (this.frameColIndex >= this.column) {
            this.frameColIndex = 0;
            this.frameRowIndex += 1;
        }
        if (this.frameRowIndex >= this.row) {
            this.frameRowIndex = 0;
        }
    }

    render() {
        // Draw the animation
        const width = this.gridWidth;
        const height = this.gridHeight;
        const sx = this.frameColIndex * width;
        const sy = this.frameRowIndex * height;
        this.context.drawImage(
            this.image,
            sx,
            sy,
            width,
            height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
