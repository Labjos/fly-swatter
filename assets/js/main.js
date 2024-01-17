window.addEventListener('load', () => {
    const game = new Game('main-canvas');

    game.start();


    document.addEventListener('keydown',(event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
    document.addEventListener('keyright', (event) => game.onKeyEvent(event));
    document.addEventListener('keyleft', (event) => game.onKeyEvent(event));


    });


   /* function randomColor() {
        return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) +')'
    } */
    