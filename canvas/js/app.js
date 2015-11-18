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
                width: 5,
                height: 5,
                vectorX: 1,
                vectorY: 1,
                velocity: 2
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

        if(ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }
        if(ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }
        var paddle = gameState.paddle;
        //bounce if hit paddle
        if(ball.left <= paddle.left + paddle.width) {
            if (ball.top + ball.height >= paddle.top  && ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX
            }
            else {
                ctx.font = '20px Helvetica';
                var lol = ctx.measureText('Game Over');
                ctx.fillText('Game Over', (canvas.width - lol.width) /2, (canvas.height-20)/2)
                return false;
            }

        }
        return true;
    }

    function animate(timestamp) {
        var keepGoing = true;
        render();
        if(timestamp - gameState.lastTimestamp > 16) {
            keepGoing = step();
            gameState.lastTimestamp = timestamp;
        }

        if (keepGoing) {
            requestAnimationFrame(animate)
        }
    }

    document.addEventListener('mousemove', function(evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.top = canvasY -(paddle.height/2);
    })

    gameState = newGameState();

    requestAnimationFrame(animate);
    
});
