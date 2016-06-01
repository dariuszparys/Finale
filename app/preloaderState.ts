class PreloaderState extends Phaser.State {
    
    loadingBar: Phaser.Sprite;
    
    preload() {
        this.loadingBar = this.add.sprite( 
            this.game.world.centerX,
            this.game.world.centerY,
            "loading");
        
        this.load.setPreloadSprite(this.loadingBar);
        
		this.game.load.image("france","assets/france.png");
		this.game.load.image("germany","assets/germany.png");
		this.game.load.image("ball", "assets/ball_modern.png");
		this.game.load.image("goal", "assets/goal.png");
		this.game.load.image("field", "assets/Spielfeld.png");
    }
    
    create() {
        
        this.game.state.start("Menu");
        
    }
    
    
}