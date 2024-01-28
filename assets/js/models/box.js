
class Box {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 180;
        this.h = 180;

        this.isAlive = true;
        this.animateFrames = false;

        this.animationTick = 0;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/box-sprite.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 5;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil((this.sprite.width / this.sprite.horizontalFrames));
            this.sprite.frameHeigth = Math.ceil((this.sprite.height / this.sprite.verticalFrames));
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.animate();
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
        }
    }

    isDead() {
        return !this.isAlive
    }

    collidesWith(e) {

        return (
            this.x + this.w > e.x && 
            this.x < e.x + e.w &&
            this.y + this.h > e.y &&
            this.y < e.y +e.h
        );
    }
º
    animate() {
        if (this.animateFrames) {
            this.animationTick++;
                    
            if(this.animationTick >= 5) {
                this.animationTick = 0;
                this.sprite.horizontalFrameIndex++;
                if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                    this.isAlive = false
                    this.sprite.horizontalFrameIndex = 0;
                }
            }
        }
        
    }
}