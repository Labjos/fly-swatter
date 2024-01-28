
class Flytse extends Fly {

    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.vy = Math.random() * 5;
        this.vx = Math.random() * 10;
        this.w = 30;
        this.h = 30;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/fly-sprite-tse.png';
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

        this.lives = 2;

        setInterval(() => {}, 3_000)
    }

    slow() {
        
    }

}