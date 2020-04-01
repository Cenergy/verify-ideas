const girlPic = new Image();
const starPic = new Image();
const num = 60;
const starts = [];

const starObj = () => {
    this.x;
    this.y;
};
function init() {
    can = document.getElementById('canvas');
    ctx = can.getContext('2d');

    w = can.width;
    h = can.height;

    document.addEventListener('mousemove', mousemove, false);

    girlPic.src = 'src/girl.jpg';
    starPic.src = 'src/star.png';

    for (let i = 0; i < num; i++) {
        stars[i] = new starObj();
        stars[i].init();
    }

    lastTime = Date.now();
    gameLoop();
}

starObj.prototype.init = () => {
    this.x = Math.random() * 600 + 100;
    this.y = Math.random() * 300 + 150;
};

starObj.prototype.draw = () => {
    ctx.drawImage(starPic, 1 * 7, 0, 7, 7, this.x, this.y, 7, 7);
};

function drawStars() {
    for (let i = 0; i < Number; i++) {
        starts[i].draw();
    }
}
