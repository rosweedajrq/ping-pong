document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pingPongCanvas');
    const ctx = canvas.getContext('2d');

    // Ball properties
    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 5,
        dy: 5
    };

    // Paddle properties
    let paddle = {
        width: 60,
        height: 10,
        x: canvas.width / 2 - 30,
        dx: 8
    };

    // Draw the ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    // Draw the paddle
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    // Update the ball position
    function updateBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Check for collisions with walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }

        // Check for collisions with paddle
        if (
            ball.y + ball.radius > canvas.height - paddle.height &&
            ball.x + ball.radius > paddle.x &&
            ball.x - ball.radius < paddle.x + paddle.width
        ) {
            ball.dy = -ball.dy;
        }

        // Check for scoring
        if (ball.y - ball.radius < 0) {
            resetBall();
        }
    }

    // Update the paddle position
    function updatePaddle() {
        if (paddle.x + paddle.dx > 0 && paddle.x + paddle.dx < canvas.width - paddle.width) {
            paddle.x += paddle.dx;
        }
    }

    // Reset the ball position
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    // Draw the game
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        updateBall();
        updatePaddle();
        requestAnimationFrame(draw);
    }

    // Handle paddle movement
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' && paddle.x > 0) {
            paddle.dx = -Math.abs(paddle.dx);
        } else if (e.key === 'ArrowRight' && paddle.x < canvas.width - paddle.width) {
            paddle.dx = Math.abs(paddle.dx);
        }
    });

    document.addEventListener('keyup', function () {
        paddle.dx = 0;
    });

    // Start the game loop
    draw();
});
