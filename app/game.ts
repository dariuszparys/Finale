class TheGame extends Phaser.Game {
    
    constructor() {
        super(320, 480, Phaser.CANVAS);
        
        this.state.add("Boot", BootState, false);
        this.state.add("Preloader", PreloaderState, false);
        this.state.add("Menu", MenuState, false);
        this.state.add("Game", GameState, false);
        this.state.add("GameOver", GameOverState, false);
        
        this.state.start("Boot");
           
    }
        
}

window.onload = () => {
    var theGame = new TheGame();
}