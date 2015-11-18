/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');

    var gameState;

    function newGameState() {
        return {
            ball: {
                left: Math.random() * canvas.width,
                top:  Math.random() * canvas.height,
                width: 10,
                height: 5,
                vectorX: 20,
                vectorY: 10,
                velocity: 1
            },
            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height/6
            },
            lastTimestamp: performance.now()
        };
    } 

    function render() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        
        var ball = gameState.ball;
        ctx.beginPath();
        ctx.arc(ball.left + (ball.width/2),
            ball.top + (ball.height/2),
            ball.width, 0,2*Math.PI);
        ctx.fill();

        var paddle = gameState.paddle;
        ctx.fillRect(paddle.left, paddle.top, paddle.width,paddle.height)

    }

    function step() {
        var ball = gameState.ball;
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        if(ball.left <= 0 || ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }
        if(ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }
    }

    function animate(timestamp) {
        render();
        if(timestamp - gameState.lastTimestamp > 16) {
            step();
            gameState.lastTimestamp = timestamp;
        }
        requestAnimationFrame(animate)
    }

    gameState = newGameState();

    requestAnimationFrame(animate);
    
});
