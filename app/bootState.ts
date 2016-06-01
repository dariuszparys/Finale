class BootState extends Phaser.State {
    
    preload() {
        this.game.load.image("loading", "assets/loading.png");
    }
    
    create() {
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.setGameSize(320, 480);
        
        this.game.state.start("Preloader", true, false);
    }

}