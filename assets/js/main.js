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

    const startGameBtn = document.getElementById('btn-start');
    startGameBtn.addEventListener('click', () => {
        const startPanel = document.getElementById('start-panel');
        startPanel.classList.add('hidden');

        const canvasPanel = document.getElementById('main-canvas');
        canvasPanel.classList.remove('hidden');

        const screenData = document.getElementById('screen-data');
        screenData.classList.remove('hidden');

        setTimeout(() => game.start(), 500);
    })

    const resumeGameBtn = document.getElementById('btn-resume');
    resumeGameBtn.addEventListener('click', () => {
        game.stop();
    });
    
    const reStartBtn = document.getElementById('btn-restart');
    reStartBtn.addEventListener('click', () => {
        game.start();
    });
    
    const startAgain = document.getElementById('btn-start-again');
    startAgain.addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('gamer').addEventListener('blur', () => {
        game.player = document.getElementById('gamer').value
    });


    document.addEventListener('keydown',(event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
    document.addEventListener('keyright', (event) => game.onKeyEvent(event));
    document.addEventListener('keyleft', (event) => game.onKeyEvent(event));
    document.addEventListener('keyspace', (event) => game.onKeyEvent(event));
});

