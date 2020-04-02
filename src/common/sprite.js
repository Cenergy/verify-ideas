export default class Sprite {
    constructor(options) {
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.context = options.context;
        this.width = options.width;
        this.height = options.height;
        this.x = 0;
        this.y = 0;
        this.image = options.image;
        this.scaleRatio = 1;
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        // Draw the animation
        const sx = (this.frameIndex * this.width) / this.numberOfFrames;
        this.context.drawImage(
            this.image,
            sx,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            (this.width / this.numberOfFrames) * this.scaleRatio,
            this.height * this.scaleRatio
        );
    }

    getFrameWidth() {
        const res = this.width / this.numberOfFrames;
        return res;
    }
}
