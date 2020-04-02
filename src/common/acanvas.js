/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import Sprite from './sprite';

const img = new Image();
img.src = 'http://localhost:8080/green.png';

export default function start() {
    const numCoins = 5;
    const coins = [];
    let canvas;
    function gameLoop() {
        // window.requestAnimationFrame(gameLoop);

        // Clear the canvas

        setInterval(() => {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < coins.length; i += 1) {
                coins[i].update();
                coins[i].render();
            }
        }, 1000);
    }

    function spawnCoin() {
        // Create sprite sheet

        const coinImg = new Image();
        coinImg.src = 'http://localhost:8080/coin-sprite-animation.png';
        const coinIndex = coins.length;

        // Create sprite
        coins[coinIndex] = new Sprite({
            context: canvas.getContext('2d'),
            width: 1000,
            height: 100,
            image: coinImg,
            numberOfFrames: 10,
            ticksPerFrame: 0,
        });

        coins[coinIndex].x =
            Math.random() *
            (canvas.width - coins[coinIndex].getFrameWidth() * coins[coinIndex].scaleRatio);
        coins[coinIndex].y =
            Math.random() * (canvas.height - coins[coinIndex].height * coins[coinIndex].scaleRatio);

        coins[coinIndex].scaleRatio = Math.random() * 0.5 + 0.5;
    }

    // Get canvas
    canvas = document.getElementById('canvas');
    // canvas.width = 460;
    // canvas.height = 230;

    for (let i = 0; i < numCoins; i += 1) {
        spawnCoin();
    }

    gameLoop();
}
