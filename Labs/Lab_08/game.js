var mainState = {

    /// ToDo: Load some images in preload function.
	///		  1. Three images in asset directory
	///			 player.png, bg.png, tree2.png
    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('bg', 'assets/bg.png');
        game.load.image('tree2', 'assets/tree2.png');

    },

    create: function() {

        // ToDo: 1. Add Background image at (0,0) and set scale to (0.8,0.8)
		//       2. Add tree sprite at (50,160) and set scale to (1.5,1.5)
        //       3. Create a cursor key event listener.
        this.bg = game.add.sprite(0, 0, 'bg');
        this.bg.scale.setTo(0.8, 0.8);
        this.tree2 = game.add.sprite(50, 160, 'tree2');
        this.tree2.scale.setTo(1.5, 1.5);
        this.cursor = game.input.keyboard.createCursorKeys();

        this.player = game.add.sprite(game.width/2, 280, 'player');
        this.player.anchor.setTo(0.5, 0.5); // Se the anchor point of player to center.

    },

    /// Call moving function in each frame.
    update: function() {
        this.movePlayer();
    },

    /// ToDo: Complete the function of moving a player.
	///       Remember to flip player's sprite when it change horizontal direction
    movePlayer: function() {
        if (this.cursor.left.isDown){
            if (this.player.scale.x==1) this.player.scale.x *= -1
            this.player.x -= 10;
        }
        else if(this.cursor.right.isDown){
            if (this.player.scale.x==-1) this.player.scale.x *= -1
            this.player.x += 10;
        }
        else if(this.cursor.up.isDown)
        this.player.y -= 10;
        else if(this.cursor.down.isDown)
        this.player.y += 10; 
    }
};
var game = new Phaser.Game(500, 340, Phaser.AUTO, "canvas")
game.state.add('main', mainState); 
game.state.start('main');
/// ToDo: 1. Initialize Phaser (width: 500, height: 340) 
///		  2. Add our state(mainState)
///		  3. Start it!!
