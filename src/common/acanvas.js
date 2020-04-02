/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import Sprite from './sprite';

const img = new Image();
img.src = 'http://localhost:8080/NPC5.png';

export default function start() {
    const numCoins = 5;
    const coins = [];
    let canvas;
    function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        // Clear the canvas

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < coins.length; i += 1) {
            coins[i].update();
            coins[i].render();
        }
    }

    function spawnCoin() {
        // Create sprite sheet

        const coinImg = new Image();
        coinImg.src = 'http://localhost:8080/NPC5.png';
        const coinIndex = coins.length;

        // Create sprite
        coins[coinIndex] = new Sprite({
            canvas,
            image: coinImg,
            numberOfFrames: 10,
            ticksPerFrame: 0,
            row: 4,
            column: 4,
        });
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
