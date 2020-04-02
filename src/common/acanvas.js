/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import Sprite from './sprite';

export default function start() {
    const num = 1000;
    const objs = [];
    let canvas;
    function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        // Clear the canvas

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < objs.length; i += 1) {
            objs[i].update();
            objs[i].render();
        }
    }

    function spread() {
        // Create sprite sheet

        const image = new Image();
        image.src = 'http://localhost:8080/green.png';
        const coinIndex = objs.length;

        // Create sprite
        objs[coinIndex] = new Sprite({
            canvas,
            image,
            row: 7,
            column: 7,
        });
        objs[coinIndex].x = Math.random() * canvas.width;
        objs[coinIndex].y = Math.random() * canvas.height;
    }

    // Get canvas
    canvas = document.getElementById('canvas');
    // canvas.width = 460;
    // canvas.height = 230;

    for (let i = 0; i < num; i += 1) {
        spread();
    }

    gameLoop();
}
