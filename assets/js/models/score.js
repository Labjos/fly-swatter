
class Score {

    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = 50;
        this.x = 50;

        this.points = 0;
    }

    increment(amount = 15) {
        this.points += amount;
        
    }

    decrement(amount = 5) {
        this.points -= amount;
        
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = 'white'
        this.ctx.font = '25px Arial';
        this.ctx.fillText(this.points, this.x, this.y);
        this.ctx.restore();
    }
}
