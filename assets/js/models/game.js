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
            this.fly = new Fly(this.ctx, 100, 100)
        ];
        
        this.addFliesBackoff =  1_000;
        setTimeout(() =>  this.addFlies(), this.addFliesBackoff);

        this.boxes = [];

        this.score = new Score(this.ctx, 0, 40);
    }
    
    onKeyEvent(event) {
        this.swatter.onKeyEvent(event);
    }

    start() {
        this.addBoxes();
        if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();
        }, this.fps);
        }
    }

    checkCollisions() { 
        this.flies.forEach((fly) => {
            if (fly.collidesWith(this.swatter)) {
                fly.lives--;
                if (fly.isDead()) {
                    this.killFly = true
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
            if (this.swatter.collidesWith(box)) {
                box.animateFrames = true;
                box.lives--;
                
                if (box.isDead() ) {
                    this.score.decrement();
                } 
            }
        })
    }

    addBoxes() {
        this.boxes.push(new Box(this.ctx, 0, 360));
        this.boxes.push(new Box(this.ctx, 0, 540));
        this.boxes.push(new Box(this.ctx, 0, 720));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 180, 360));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 360, 360));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 540, 360));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 720, 360));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 900, 360));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 1080, 360));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 180, 540));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 360, 540));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 540, 540));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 720, 540));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 900, 540));        
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 1080,540));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 180, 720));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 360, 720));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 540, 720));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 720, 720));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 900, 720));
        this.boxes.push(new Box(this.ctx, this.ctx.canvas.width - 1080, 720));  
    };

    addFlies() {
        //if (!this.drawIntervalId) { 
            this.flies.push(this.fly = new Fly(this.ctx, Math.floor(Math.random() * this.canvas.width - this.fly.w), 0))
       // }
        this.addFliesBackoff = Math.floor(Math.random() * 5 + 1) * 1000
        setTimeout(() =>  this.addFlies(), this.addFliesBackoff);
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
        this.flies = this.flies.filter((fly) => fly.y < CANVAS_H && !fly.isDead()) // sumar fly.decrement() al salir de la pantalla
        this.boxes = this.boxes.filter((box) => box.isAlive);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameOver() {
        this.stop();
        this.saveScore(); 
    }

    saveScore(name) {
        const record = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
        record[name] = this.score.points;
        localStorage.setItem(SCORE_KEY, JSON.stringify(record));
    }
}
