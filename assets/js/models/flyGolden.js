class Flygolden extends Fly {

    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.vy = Math.random() * 7;
        this.vx = Math.random() * 15;
        this.w = 30;
        this.h = 30;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/fly-sprite-golden.png';
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
    }

}