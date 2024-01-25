

class Swatter {

    constructor(ctx, x, y, game) {
        this.ctx = ctx;
        this.game = game;
        this.x = x;
        this.vx = SPEED_MOVE;
        this.y = y;
        this.vy = SPEED_MOVE;
        this.w = Math.ceil(1530 / 15);
        this.h = Math.ceil(367 / 4);

        this.sprite = new Image();
        this.sprite.src = '/assets/img/swatter-sprite.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 1;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeigth = Math.ceil(this.sprite.height / this.sprite.verticalFrames)
        }

        this.movements = {
            right: false,
            left: false,
            up: false,
            space: false,
            down: false
        }
    }

    onKeyEvent(event) {
        const enabled = event.type === 'keydown'

        switch (event.keyCode) {
            case KEY_RIGHT:
                this.movements.right = enabled;
                break;
            case KEY_LEFT: 
                this.movements.left = enabled;
                break;
            case KEY_UP:
                this.movements.up = enabled;
                break;
            case KEY_DOWN:
                this.movements.down = enabled;
                break;
            case SPACE_BAR:
                this.movements.space = enabled;
        }
    }

    move() {
        if (this.movements.right) {
            this.x += this.vx;            
        } else if (this.movements.left) {
            this.x -= this.vx;
        } else if (this.movements.up) {
            this.y -= this.vy;
        } else if (this.movements.down) {
            this.y += this.vy;
        } else if (this.movements.space) {
            this.game.checkCollisions()
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeigth,
                this.sprite.frameWidth,
                this.sprite.frameHeigth,
                this.x,
                this.y,
                this.w,
                this.h

            )
            this.animate();
        }
    }

    animate() {
        if (this.movements.right) {
            this.sprite.horizontalFrameIndex = 2;
        } else if (this.movements.left) {
            this.sprite.horizontalFrameIndex = 0;
        } else if (this.movements.up) {
            this.sprite.horizontalFrameIndex = 1;
        } else if (this.movements.space) {
            this.sprite.horizontalFrameIndex = 3;
        } else {
            this.sprite.horizontalFrameIndex = 1;
        }
    }

    collidesWith(e) {

        return (
            this.x + this.w > e.x && 
            this.x < e.x + e.w &&
            this.y + this.h > e.y &&
            this.y < e.y +e.h
        );
    }

}