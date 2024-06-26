class Fly {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vy = Math.random() * 5;
        this.vx = Math.random() * 10; // generate random SPEED
        this.w = 30;
        this.h = 30;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/fly-sprite.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil((this.sprite.width / this.sprite.horizontalFrames));
            this.sprite.frameHeigth = Math.ceil((this.sprite.height / this.sprite.verticalFrames));
        }
        this.animationTick = 0;
        this.moveTick = 0

        this.lives = 1;

        setInterval(() => {}, 3_000)

        this.sound = new Audio('/assets/sound/fc085589eb4560baba8581080e03-orig.wav')
    }

    isDead() {
        return this.lives <= 0;
    }

    move() {
        this.y += this.vy;
        this.x += this.vx

        if (this.moveTick++ > Math.random() * 100) {
            this.moveTick = 0
            this.vx *= -1
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
        );

        this.animate();
        }
    }

    animate() {
        this.animationTick++;

        if (this.animationTick >= FLY_ANIMATION_TICK) {
            this.animationTick = 0;

            this.sprite.horizontalFrameIndex++
            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames -1) {
                this.sprite.horizontalFrameIndex = 0;
            }
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