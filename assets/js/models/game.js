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
        this.addFliesGoldenBackoff =  20_000;
        this.addFliesSpeedBackoff =  10_000;
        this.addFliesTseBackoff =  10_000;
        this.addFliesBlackBackoff =  10_000;
        
        this.boxes = [];

        this.score = new Score(this.ctx, 0, 40);

        this.isAlreadyPlay = false;

        this.player = '';

        this.sound = new Audio('/assets/sound/fc085589eb4560baba8581080e03-orig.wav')
        this.soundBox = new Audio('/assets/sound/06bc7eb3d884a49efaf5672d96c6-orig.mp3')


    }
    
    onKeyEvent(event) {
        this.swatter.onKeyEvent(event);
    }

    start() {
        setTimeout(() =>  this.addFlies(), this.addFliesBackoff);
        if (!this.isAlreadyPlay) {
            this.addBoxes();
            this.isAlreadyPlay = true
        }
        if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();

            if (this.score.points <= -100) {
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
                const remainBoxes = this.boxes.filter(rBox => rBox.y === box.y).length;
                if (remainBoxes === 1) {
                    this.gameOver();
                }
                box.animateFrames = true;
                this.score.decrement();
                box.lives--;
            }
        })



        this.sound.play();
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

    }

    addFlies() {
        if (this.drawIntervalId) { 
            this.flies.push(new Fly(this.ctx, Math.floor(Math.random() * this.canvas.width - 100), 0));
        }
        this.addFliesBackoff = Math.floor(Math.random() * 5 + 1) * 1000;
        setTimeout(() => this.addFlies(), this.addFliesBackoff);

        if (this.drawIntervalId) {
            this.flies.push(new Flygolden(this.ctx, Math.floor(Math.random() * this.canvas.width -100), 0));
        }
        this.addFliesGoldenBackoff = Math.floor(Math.random() * 20 + 1) * 100_000;
        setTimeout(() => this.addFlies(), this.addFliesGoldenBackoff);

        if (this.drawIntervalId) {
            this.flies.push(new Flyblack(this.ctx, Math.floor(Math.random() * this.canvas.width -100), 0));
        }
        this.addFliesBlackBackoff = Math.floor(Math.random() * 30 + 1) * 100_000;
        setTimeout(() => this.addFlies(), this.addFliesBlackBackoff);

        if (this.drawIntervalId) {
            this.flies.push(new Flytse(this.ctx, Math.floor(Math.random() * this.canvas.width - 100), 0));
        }
        this.addFliesTseBackoff = Math.floor(Math.random() * 40 + 1) * 160_000;
        setTimeout(() => this.addFlies(), this.addFliesTseBackoff);

        if (this.drawIntervalId) {
            this.flies.push(new Flyspeed(this.ctx, Math.floor(Math.random() * this.canvas.width - 100), 0));
        }
        this.addFliesSpeedBackoff = Math.floor(Math.random() * 10 + 1) * 260_000;
        setTimeout(() => this.addFlies(), this.addFliesSpeedBackoff) 
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
            this.ctx.fillText(`This is a disaster ${this.player}... GAME OVER!!!`, 250, 250);
            this.ctx.restore();
            this.soundBox.play();
        }
    saveScore(name) {
        const record = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
        record[name] = this.score.points;
        localStorage.setItem(SCORE_KEY, JSON.stringify(record));
    }
}
