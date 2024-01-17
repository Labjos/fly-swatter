
class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H ;
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.swatter = new Swatter(this.ctx, 500, 550);
    
    }

    onKeyEvent(event) {
        this.swatter.onKeyEvent(event);

    }


    start() {
        if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();

        }, this.fps);
    }
}

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    move() {
        this.swatter.move();
    }

    draw() {
        this.swatter.draw();

    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}