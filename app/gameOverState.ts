class GameOverState extends Phaser.State {
    
    scoreHome: number;
    scoreAway: number;
    minutesPlayed: number;
    
    init(results: any) {
        this.scoreHome = results.germany;
        this.scoreAway = results.france;
        this.minutesPlayed = results.minutes;
    }
    
    create() {
        
        this.game.add.text(160, 50, "Ergebnis", { font: "normal 20px arial", fill: "#ffffff" }).anchor.setTo(0.5, 0.5);
        
        this.game.add.text(160, 100, "Spielminuten " + this.minutesPlayed , { font: "normal 20px arial", fill: "#ffffff" }).anchor.setTo(0.5, 0.5);

        this.game.add.text(160, 150, "Deutschland " + this.scoreHome, { font: "normal 20px arial", fill: "#ffffff" }).anchor.setTo(0.5, 0.5);

        this.game.add.text(160, 200, "Frankreich " + this.scoreAway, { font: "normal 20px arial", fill: "#ffffff" }).anchor.setTo(0.5, 0.5);
        
    }
    
}