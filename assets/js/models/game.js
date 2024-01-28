class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H ;
        this.ctx = this.canvas.getContext('2d');
        this.killFly = false

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.swatter = new Swatter(this.ctx, SWATTER_X_PADDING,this.canvas.height - SWATTER_GROUND_PADDING, this); 

        this.flies = [
            new Fly(this.ctx, 100, 100)
        ];
        
        this.addFliesBackoff =  1_000;
        
        this.boxes = [];

        this.score = new Score(this.ctx, 0, 40);
    }
    
    onKeyEvent(event) {
        this.swatter.onKeyEvent(event);
    }

    start() {
        setTimeout(() =>  this.addFlies(), this.addFliesBackoff);
        this.addBoxes();
        if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();
            if (this.score.points <= -30) {
                    this.gameOver()
            }
        }, this.fps);
        }
    }

    checkCollisions() { 
        this.flies.forEach((fly) => {
            if (fly.collidesWith(this.swatter)) {
                fly.lives--;
                if (fly.isDead()) {
                    this.killFly = true;
                    this.score.increment();
                }
            };
        })

        if (this.killFly) {
            setTimeout(() => {
                this.killFly = false
            }, 500)
            return
        }

        this.boxes.forEach((box) => {
            if (this.swatter.collidesWith(box) && !box.animateFrames) {
                box.animateFrames = true;
                this.score.decrement();
                box.lives--;
            }
        })
    }

    addBoxes() {
        const horizontalBoxes = 7;
        const verticalBoxes = 3;
        let boxX = 0;
        let boxY = 360;

        for (let i = 0; i < verticalBoxes; i++) {
            boxX = 0;
            for (let j = 0; j < horizontalBoxes; j++) {
                this.boxes.push(new Box(this.ctx, boxX, boxY));
                boxX += 180;              
            }
            boxY += 180;
        }

       // if (verticalBoxes < 3) {
            //this.gameOver();
        //}
    }

    addFlies() {
        if (this.drawIntervalId) { 
            this.flies.push(new Fly(this.ctx, Math.floor(Math.random() * this.canvas.width - 100), 0))
        }
        this.addFliesBackoff = Math.floor(Math.random() * 5 + 1) * 1_000;
        setTimeout(() => this.addFlies(), this.addFliesBackoff);
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    move() {
        this.swatter.move();
        this.flies.forEach((fly) => fly.move());

        if (this.swatter.x < 0) {
            this.swatter.x = 0;
        } else if (this.swatter.x > this.canvas.width - this.swatter.w) {
            this.swatter.x = this.canvas.width - this.swatter.w;
        } else if (this.swatter.y < 0) {
            this.swatter.y = 0;
        } else if (this.swatter.y > this.canvas.height - this.swatter.h) {
            this.swatter.y = this.canvas.height - this.swatter.h;
        }
    }

    draw() {
        this.boxes.forEach(box => box.draw());
        this.flies.forEach((fly) => fly.draw());
        this.swatter.draw();
        this.score.draw();
    }

    clear() {
        this.flies = this.flies.filter((fly) => {
            const keepFly = fly.y < CANVAS_H && !fly.isDead()

            if (!keepFly) {
                this.score.decrement();
            }

            return keepFly
        })
        this.boxes = this.boxes.filter((box) => box.isAlive);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    gameOver() {
        this.stop();

            this.ctx.save();
            this.ctx.fillStyle = 'white'
            this.ctx.font = '50px Arial';
            this.ctx.fillText('This is a disaster... GAME OVER!!!', 250, 250);
            this.ctx.restore();
        }
        //this.clear();
        //this.saveScore(); 
    

    saveScore(name) {
        const record = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
        record[name] = this.score.points;
        localStorage.setItem(SCORE_KEY, JSON.stringify(record));
    }
}
