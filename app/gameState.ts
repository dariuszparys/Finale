class GameState extends Phaser.State {
    
    gameText: Phaser.Text;
    fieldGroup: Phaser.Group;
    gameItems: Phaser.Sprite[];
    ballSprite: Phaser.Sprite;
    minutesPlayed: number = 0;
    goalsHome: number = 0;
    goalsAway: number = 0;
    
    oldX: number = -1;
    oldY: number = -1;
    staging: boolean = false;
    
    create() {
        this.game.add.image(
            this.game.world.centerX,
            this.game.world.centerY,
            "field").anchor.setTo(0.5, 0.5);
            
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 200;
        this.game.physics.p2.restitution = 0.9;
        this.createLevel();
        this.game.input.onDown.add(this.addBall, this);
        this.game.physics.p2.setBoundsToWorld(true, true, false, false, false);
        this.gameText = this.game.add.text(0,0, "", { font: "normal 20px arial", fill: "#0a0a0a"});
        this.updateText();
    }
    
    createLevel() {
        this.fieldGroup = this.game.add.group();
        this.gameItems = [];
        for (var n = 0; n < 11; n++) {
            var playerSprite: Phaser.Sprite;
            
            if( Math.random() < 0.6) {
                playerSprite = this.game.add.sprite(0, 0, "france");
                playerSprite.name = "france";
            } else {
                playerSprite = this.game.add.sprite(0, 0, "germany");
                playerSprite.name = "germany";
            }
            
            this.gameItems.push(playerSprite);
            this.fieldGroup.add(playerSprite);
            playerSprite.anchor.setTo(0.5, 0.5);
            do {
                playerSprite.x = Math.random() * 300 + 10;
                playerSprite.y = Math.random() * 360 + 100;
            } while( this.itemsOverlap());
            
            this.game.physics.p2.enable(playerSprite);
            playerSprite.body.setCircle(24);
            playerSprite.body.static = true;
        }
        
        var goalSprite: Phaser.Sprite;
        goalSprite = this.game.add.sprite(160, 470, "goal");
        goalSprite.name = "goal";
        goalSprite.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(goalSprite);
        goalSprite.body.static = true;
        this.fieldGroup.add(goalSprite);
        this.oldX = -1;
        this.oldY = -1;
        this.staging = false;
    }
    
    addBall() {
        this.game.input.onDown.remove(this.addBall, this);
        this.ballSprite = this.game.add.sprite(this.game.input.worldX, -50, "ball");
        this.fieldGroup.add(this.ballSprite);
        this.game.physics.p2.enable(this.ballSprite);
        this.ballSprite.body.onBeginContact.add(this.ballHit, this);
    }
    
    ballHit(body?: Phaser.Physics.P2.Body) {
        if (body) {
            switch(body.sprite.name){
                case "germany":
                    body.sprite.kill();
                    this.minutesPlayed += 1;
                    break;
                case "france":
                    if(this.ballSprite.y < body.y) {
                        this.minutesPlayed += 2;
                    } else {
                        this.minutesPlayed += 3;
                    }
                    break;
                case "goal":
                    this.goalsHome++;
                    this.minutesPlayed += 3;
                    this.nextLevel();
                    break;
            }            
        } else {
            this.minutesPlayed += 1;
        }
        this.updateText();
    }
    
    updateText() {
        this.gameText.setText(
            this.minutesPlayed + " Minute | GER - FRA " +
            this.goalsHome + " : " + this.goalsAway
        );
    }
    
    update() {
        
        if(this.minutesPlayed >= 90) {
            this.fieldGroup.destroy(true);
            this.updateText();
            this.game.state.start("GameOver", true, false, {
                minutes: this.minutesPlayed,
                germany: this.goalsHome,
                france: this.goalsAway
            });
        }
        
        if( this.ballSprite ) {
            if( this.ballSprite.y >= 0 &&
                this.ballSprite.y <= 500 ) {
                    if( this.ballSprite.y === this.oldY &&
                        this.ballSprite.x === this.oldX &&
                        !this.staging) {
                            this.staging = true;
                            this.ballSprite.y = -50;
                            this.nextLevel();
                        } else {
                            this.oldY = this.ballSprite.y;
                            this.oldX = this.ballSprite.x;
                        }
                }
            if( this.ballSprite.y > 500 ) {
                this.goalsAway++;
                this.minutesPlayed += 4;
                this.nextLevel();
                this.ballSprite.y = -50;
            }        
        }
    }
    
    nextLevel() {
        this.ballSprite.y = -50;
        this.fieldGroup.destroy(true);
        this.input.onDown.add(this.addBall, this);
        this.updateText();
        this.createLevel();
    }

    itemsOverlap() :boolean {
        for(var i = 0; i < this.gameItems.length - 1; i++ ) {
            var distance: number = this.manhattenDistance(
                this.gameItems[i],
                this.gameItems[this.gameItems.length-1]);
            if( distance < 50 ) {
                return true;
            }                   
        }
        
        return false;
    }   
    
    manhattenDistance(from: Phaser.Sprite, to: Phaser.Sprite): number {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    } 
    
}