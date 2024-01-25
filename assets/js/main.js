window.addEventListener('load', () => {
    const game = new Game('main-canvas');

    
    const canvas = document.getElementById('main-canvas');
    canvas.style.background = randomColor()

    function random(number) {
    return Math.floor(Math.random() * (number + 1))
    } 

    function randomColor() {
    return 'rgb(' + random(255/2) + ',' + random(255/2) + ',' + random(255/2) +')'
    }

    const startGameBtn = document.getElementById('start-btn');
    startGameBtn.addEventListener('click', () => {
        game.start();
    })

    const stopGameBtn = document.getElementById('stop-btn');
    stopGameBtn.addEventListener('click', () => {
        game.stop();
        game.gameOver();
    });

    const resumeGameBtn = document.getElementById('resume-btn');
    resumeGameBtn.addEventListener('click', () => {
        game.stop();
        alert('pulsa Start para continuar');
    })



    document.addEventListener('keydown',(event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
    document.addEventListener('keyright', (event) => game.onKeyEvent(event));
    document.addEventListener('keyleft', (event) => game.onKeyEvent(event));
    document.addEventListener('keyspace', (event) => game.onKeyEvent(event));
    });
