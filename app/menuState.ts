class MenuState extends Phaser.State {
    
    create() {
        this.game.add.text(160, 50, "EM Finale 2016", {
            font: "20px Arial", fill: "#ffffff" 
        }).anchor.setTo(0.5);
        
        this.game.add.text(160, 150, "Deutschland", {
            font: "bold 20px Arial", fill: "#ffffff"
        }).anchor.setTo(0.5);

        this.game.add.text(160, 170, "-", {
            font: "bold 20px Arial", fill: "#ffffff"
        }).anchor.setTo(0.5);
        this.game.add.text(160, 190, "Frankreich", {
            font: "bold 20px Arial", fill: "#ffffff"
        }).anchor.setTo(0.5);
        
        this.game.add.text(160, 250, "START", {
            font: "bold 40px Arial", fill: "#a0a0a0"
        }).anchor.setTo(0.5, 0.5);
        
        this.game.input.onDown.add( () => {
            this.game.state.start("Game");
        });
        
    }
    
}