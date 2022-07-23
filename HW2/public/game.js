var screen=0;
var scbo=0;
var player;
var boss;
var aliens;
var bullets;
var ubullets;
var bulletTime = 0;
var fb=0;
var volTime = 0;
var pTime = 0;
var p=true;
var cursors;
var fireButton;
var Vup;
var Vdown;
var die;
var game_quit;
var explosions;
var sky;
var help=0;
var score = 0;
var scoreString = '';
var scoreText;
var boardText;
var lives;
var enemyBullet;
var bossBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var level=1;
var z=0;
var boss_score;
var flag=0;
var volume;
var aim_flag=0;
var aimf=0;
var boss_life=10;
var Name;
var unibu_flag=0;
var uni_have=0;
var boss_flag=0;
var mainState = {
    preload: function() {
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('aim', 'assets/aim.png');
        game.load.image('unibu', 'assets/Unibul.png');
        game.load.image('helper', 'assets/helper.png');
        game.load.image('ubu', 'assets/ubu.png');
        game.load.image('pauseButton', 'assets/pause.jpg');
        game.load.image('enemyBullet', 'assets/enemyBullet.png');
        game.load.image('bossBullet', 'assets/boss1.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('boss', 'assets/boss1.png');
        game.load.image('snoopy', 'assets/snoopy.png');
        game.load.spritesheet('kaboom', 'assets/heart.png',32.95,28);
        game.load.spritesheet('star', 'assets/explosion.png',32,32);
        game.load.spritesheet('snoopy5', 'assets/snoopy5.png',101,108);
        game.load.image('sky', 'assets/sky.jpeg');
        game.load.image('s3', 'assets/s3.jpg');
        game.load.image('start', 'assets/start.jpg');
        game.load.audio('shoot', 'assets/player-fire.wav');
        game.load.audio('explosion', 'assets/shoot.wav');
      },

      create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.Start = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);


        
        
        //  The scrolling sky background
        sky = game.add.tileSprite(0, 0, 900, 550, 'sky');
        this.Us = game.add.sprite(550, 15, 'bullet');
        
        this.pauseButton = game.add.sprite(430, 13, 'pauseButton');
        this.pauseButton.inputEnabled = true;
        this.pauseButton.events.onInputUp.add(function () {this.game.paused = true;},this);
        this.game.input.onDown.add(function () {if(this.game.paused)this.game.paused = false;},this);

        //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(100, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        this.nextShotAt = 0;
        this.shotDelay = 100;

        ubullets = game.add.group();
        ubullets.enableBody = true;
        ubullets.physicsBodyType = Phaser.Physics.ARCADE;
        ubullets.createMultiple(5, 'ubu');
        ubullets.setAll('anchor.x', 0.5);
        ubullets.setAll('anchor.y', 0.5);
        ubullets.setAll('outOfBoundsKill', true);
        ubullets.setAll('checkWorldBounds', true);

        // The enemy's bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'enemyBullet');

        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 1);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);

        bossBullets = game.add.group();
        bossBullets.enableBody = true;
        bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
        bossBullets.createMultiple(30, 'bossBullet');

        bossBullets.setAll('anchor.x', 0.5);
        bossBullets.setAll('anchor.y', 1);
        bossBullets.setAll('outOfBoundsKill', true);
        bossBullets.setAll('checkWorldBounds', true);


        //  The hero!
        player = game.add.sprite(40, 300, 'snoopy5');
        var walk = player.animations.add('walk');
        player.animations.play('walk', 10, true);
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);

        //boss
        boss = game.add.sprite(-4000, 300, 'boss');
        boss.anchor.setTo(0.5, 0.5);
        game.physics.enable(boss, Phaser.Physics.ARCADE);

        aim = game.add.sprite(-4000, 300, 'aim');
        boss.anchor.setTo(0.5, 0.5);
        game.physics.enable(aim, Phaser.Physics.ARCADE);

        unibu = game.add.sprite(-4000, 300, 'unibu');
        unibu.anchor.setTo(0.5, 0.5);
        game.physics.enable(unibu, Phaser.Physics.ARCADE);

        helper = game.add.sprite(-4000, 300, 'helper');
        helper.anchor.setTo(0.5, 0.5);
        game.physics.enable(helper, Phaser.Physics.ARCADE);


        aliens = game.add.group();
        aliens.enableBody = true;
        aliens.createMultiple(50, 'enemy');
        aliens.setAll('anchor.x', 0.5);
        aliens.setAll('anchor.y', 0.5);
        aliens.setAll('outOfBoundsKill', true);
        aliens.setAll('checkWorldBounds', true);
        aliens.forEach(function(enemy) {
            enemy.animations.add('fly',[0, 1, 2], 20, true);
        });
        this.nextEnemyAt = 0;
        this.enemyDelay = 1000;

        this.game.sound.volume=0.5;

        // this.createAliens();

        //  The score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '30px Arial', fill: '#fff' });

        //  Lives
        lives = game.add.group();
        game.add.text(game.world.width - 300, 10, 'Lives : ', { font: '30px Arial', fill: '#fff' });

        levelText = game.add.text(180, 10, 'Level: '+ level, { font: '30px Arial', fill: '#fff' });

        volText = game.add.text(310, 10, 'Vol: '+ this.game.sound.volume*100, { font: '30px Arial', fill: '#fff' });

        


        //  Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;



        for (var i = 0; i < 5; i++) 
        {
            var snoopy = lives.create(game.world.width - 190 + (40 * i), 30, 'snoopy');
            snoopy.anchor.setTo(0.5, 0.5);
            snoopy.angle =0;
            snoopy.alpha = 0.8;
            snoopy.scale.setTo(0.4);
        }

        this.start = game.add.sprite(0, 0, 'start');
        this.start.scale.setTo(0.35, 0.25);

        this.s3 = game.add.sprite(-10000, 0, 's3');
        this.s3.scale.setTo(0.3, 0.25);

        //  An explosion pool
        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(this.setupEnemy, this);

        explosions1 = game.add.group();
        explosions1.createMultiple(30, 'star');
        explosions1.forEach(this.setupEnemy1, this);

        //  And some controls to play the game with
        cursors = game.input.keyboard.createCursorKeys();

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        Vup = game.input.keyboard.addKey(Phaser.Keyboard.U);
        Vdown = game.input.keyboard.addKey(Phaser.Keyboard.J);
        game_quit = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        Uskill = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        Unibul = game.input.keyboard.addKey(Phaser.Keyboard.X);

        boardText = game.add.text(30, 120, 'LeaderBoard: ' + '\n', { font: '30px Arial', fill: '#fff' });
        boardText.visible = false;
    },
    
    setupEnemy:function  (enemy) {
    
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;
        enemy.animations.add('kaboom');
    },

    setupEnemy1:function  (enemy) {
    
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;
        enemy.animations.add('star');
    },

    
    descend:function () {
        aliens.y += 10;
    
    },
    update: function() {
        if (screen==0) {
            boardText.visible = false;
            if(this.Start.isDown){
                screen=1;
                this.start.x=-10000;
                this.restart();
            }
        }
        if (screen==2){
            this.s3.x=0;
            if (die==1){
                var name = prompt("Name:",Name);
        
            firebase.database().ref('Scoreboard').push({
                name: name,
                score: score
            });
            
            var postsRef = firebase.database().ref('Scoreboard');
            boardText.text = 'Leaderboard:'+'\n';
            postsRef.orderByChild("score").limitToLast(5).on("child_added", function(snapshot) {
                var obj=snapshot.val();
                boardText.text += obj.name +' : '+ obj.score + '\n';
                if (fb==0){
                    boardText.text = 'Leaderboard:'+'\n';
                    fb=1;
                }
                console.log(obj);
            });
            boardText.visible = true;
            die=0;
            }
            if(this.Start.isDown){
                screen=1;
                this.s3.x=-10000;
                this.restart();
            }
            if (game_quit.isDown){
                this.start.x=0;
                this.s3.x=-10000;
                screen=0;
            }
        }
        if (screen==1){
            boss_score = game.rnd.integerInRange(40, 50);
            if (score==500 && level==1) {
                level=2;
                levelText.text = 'Level: '+ level;
                if (unibu_flag==0){
                    unibu.x=800;
                    unibu.body.velocity.x =-100;
                    unibu_flag=1;
                }
            }
            if (score==800 && boss_flag==0) {
                ////////boss!!!!!!!
                boss.x=800;
                boss.body.velocity.y =100;
                boss_flag=1;

                helper.x=50;
                help=1;
            }
            
            if (score==300 && aim_flag==0) {
                ////////boss!!!!!!!
                aim.x=800;
                aim.body.velocity.x =-100;
                aim_flag=1;
            }
            if (this.nextEnemyAt<game.time.now ) {
                this.nextEnemyAt = game.time.now + this.enemyDelay;
                var alien = aliens.create(1000, game.rnd.integerInRange(0, 450),'enemy');
                alien.body.velocity.x = game.rnd.integerInRange(-60*level, -30*level);
            }
            if (z==1) this.Us.x = -10000;
            else if (z==0) {
                this.Us.scale.setTo(1.3);
                this.Us.x = 550;
            }
            
            
            if (player.alive)
            {
                if (boss.y<=60) boss.body.velocity.y =100;
                if (boss.y>=500) boss.body.velocity.y =-100;
                sky.tilePosition.x -= 2;
                //  Reset the player, then check for movement keys
                player.body.velocity.setTo(0, 0);

                if (cursors.up.isDown && player.body.y>=0)
                {
                    player.body.velocity.y = -200;
                }
                else if (cursors.down.isDown && player.body.y <=450)
                {
                    player.body.velocity.y = 200;
                }
                else if (cursors.left.isDown && player.body.x>=0){
                    player.body.velocity.x = -200;
                }
                else if(cursors.right.isDown && player.body.x<=800){
                    if (player.body.x<=920) player.body.velocity.x = 200;
                }

                //  Firing?
                if (fireButton.isDown)
                {
                    this.fireBullet();
                }

                if (help==1){
                    this.helpfire();
                }

                if (Unibul.isDown && uni_have==1)
                {
                    this.uniBullet();
                    uni_have=0;
                }

                if (Uskill.isDown && z==0)
                {
                    z=1;
                    this.fireBullet1();
                }

                if (game.time.now > firingTimer)
                {
                    this.enemyFires();
                    this.bossfire();
                }
                if (game.time.now > volTime)
                {
                    if (Vup.isDown) {
                        this.game.sound.volume+=0.05;
                        volume=Math.floor(this.game.sound.volume*100);
                        volText.text='Vol: '+ volume;
                    }
                    else if (Vdown.isDown) {
                        this.game.sound.volume-=0.05;
                        volume=Math.floor(this.game.sound.volume*100);
                        volText.text='Vol: '+ volume;
                    }
                    volTime = game.time.now+200;
                }

                //  Run collision
                game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
                game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
                game.physics.arcade.overlap(bullets, boss, this.collisionHandler1, null, this);
                game.physics.arcade.overlap(bossBullets, player, this.enemyHitsPlayer1, null, this);
                game.physics.arcade.overlap(aim, player, this.aim_shoot, null, this);
                game.physics.arcade.overlap(unibu, player, this.Unihave, null, this);
                game.physics.arcade.overlap(ubullets, aliens, this.Unihit, null, this);

            }

        }
        // }
    },


    Unihave:function  (unibu, player) {
        unibu.x=-4000;
        uni_have=1;
    },

    collisionHandler:function  (bullet, alien) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();
    
        //  Increase the score
        score += 20;
        scoreText.text = scoreString + score;
    
        //  And create an explosion :)

    

        var explosion = explosions.getFirstExists(false);
        explosion.reset(alien.body.x+30, alien.body.y+30);
        explosion.play('kaboom', 10, false, true);
        this.game.sound.play('explosion');
    
    },

    Unihit:function  (bullet, alien) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();
    
        //  Increase the score
        score += 40;
        scoreText.text = scoreString + score;
    
        //  And create an explosion :)

    

        var explosion = explosions.getFirstExists(false);
        explosion.reset(alien.body.x+30, alien.body.y+30);
        explosion.play('kaboom', 10, false, true);
        this.game.sound.play('explosion');
    
    },

    aim_shoot:function  (aim, player) {

        aim.x=-4000;
        if (game.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
            //  Grab the first bullet we can from the pool
            if (bullet)
            {
                //  And fire it
                this.game.sound.play('shoot');
                bullet.reset(player.x+8, player.y);
                // bullet.body.velocity.x = 1000;
        
                // randomly select one of them
                var shooter=livingEnemies[0];
                // And fire the bullet from this enemy
                bullet.reset(player.body.x, player.body.y);
        
                game.physics.arcade.moveToObject(bullet,shooter,1000);
                bulletTime = game.time.now + 2000;
            }
            
            if (aimf==0){
                bulletTime = game.time.now + 200;
                flag=1;
            }
        }
        
    
    
    },

    collisionHandler1:function  (bullet, boss) {

        //  When a bullet hits an alien we kill them both
        if (boss_life>1){
            var explosion = explosions.getFirstExists(false);
            explosion.reset(boss.body.x+30, boss.body.y+30);
            explosion.play('kaboom', 10, false, true);
            this.game.sound.play('explosion');
        }
        boss.kill();
        if (boss_life>0) boss_life--;
        //  Increase the score
        if (boss_life==0) {
            score += 100;
            scoreText.text = scoreString + score;
            screen=2;
            enemyBullets.callAll('kill');
            bossBullets.callAll('kill');
            bullets.callAll('kill');
            aliens.removeAll();
    
            this.s3.x=0;
            die=1;
        }
    
    
    },
    
    enemyHitsPlayer:function  (player,bullet) {
        if (lives.countLiving() > 1){
            var explosion1 = explosions1.getFirstExists(false);
            explosion1.reset(player.body.x+50, player.body.y+50);
            explosion1.play('star', 30, false, true);
            this.game.sound.play('explosion');
            bullet.kill();
        }
        
        
        live = lives.getFirstAlive();
        
        if (live)
        {
            live.kill();
        }
    
        //  And create an explosion :)
    
        // When the player dies
        if (lives.countLiving() < 1)
        {
            screen=2;
            player.kill();
            enemyBullets.callAll('kill');
            bossBullets.callAll('kill');
            aliens.removeAll();
    
            stateText.text=" GAME OVER \n Click to restart \n Press Q to quit";
            stateText.visible = true;
            this.s3.x=0;
            die=1;

        }
    
    },

    enemyHitsPlayer1:function  (player,bullet) {
        if (lives.countLiving() > 1){
            var explosion1 = explosions1.getFirstExists(false);
            explosion1.reset(player.body.x+50, player.body.y+50);
            explosion1.play('star', 30, false, true);
            this.game.sound.play('explosion');
        }
        
        bullet.kill();

        live = lives.getFirstAlive();
    
        if (live)
        {
            live.kill();
        }
        
        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        
    
        // When the player dies
        if (lives.countLiving() < 1)
        {
            screen=2;
            player.kill();
            enemyBullets.callAll('kill');
            bossBullets.callAll('kill');
            aliens.removeAll();
    
            stateText.text=" GAME OVER \n Click to restart \n Press Q to quit";
            stateText.visible = true;
            this.s3.x=0;
            die=1;
        }
    
    },
    
    enemyFires: function () {
    
        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);
    
        livingEnemies.length=0;
    
        aliens.forEachAlive(function(alien){
    
            // put every living enemy in an array
            livingEnemies.push(alien);
        });
    
    
        if (enemyBullet && livingEnemies.length > 0)
        {
            
            var random=game.rnd.integerInRange(0,livingEnemies.length-1);
    
            // randomly select one of them
            var shooter=livingEnemies[random];
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);
    
            game.physics.arcade.moveToObject(enemyBullet,player,level*200);
            firingTimer = game.time.now + 2000;
        }
    
    },

    bossfire: function () {
    
        //  Grab the first bullet we can from the pool
        
    
        if(boss_life>0){
            enemyBullet = bossBullets.getFirstExists(false);
            var shooter=boss;
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);
        
            game.physics.arcade.moveToObject(enemyBullet,player,level*100);
            firingTimer = game.time.now + 2000;
        }
        
    
    },
    
    fireBullet:function  () {
    
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);
    
            if (bullet)
            {
                //  And fire it
                this.game.sound.play('shoot');
                bullet.reset(player.x+8, player.y);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 200;
            }
        }
    
    },

    helpfire:function  () {

        
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            console.log("help");
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);
    
            if (bullet)
            {
                //  And fire it
                this.game.sound.play('shoot');
                bullet.reset(helper.x+8, helper.y);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 1000;
            }
        }
    
    },

    uniBullet:function  () {
    
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            ubullet = ubullets.getFirstExists(false);
    
            if (ubullet)
            {
                //  And fire it
                this.game.sound.play('shoot');
                ubullet.reset(player.x+8, player.y);
                ubullet.body.velocity.x = 400;
                bulletTime = game.time.now + 200;
            }
        }
    
    },

    fireBullet1:function  () {
    
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            for (var i=1; i<10; i++){
                bullet = bullets.getFirstExists(false);
                if (bullet)
                {
                    //  And fire it
                    this.game.sound.play('shoot');
                    bullet.reset(player.x+8, 55*i);
                    bullet.body.velocity.x = 400;
                    flag=1;
                }
            }
            if (flag==1){
                bulletTime = game.time.now + 200;
                flag=0;
            }
        }
    
    },
    
    resetBullet:function  (bullet) {
    
        //  Called if the bullet goes out of the screen
        bullet.kill();
    
    },
    
    restart:function () {
    
        boss.x=-4000;
        boss_flag=0;
        aim.x=-4000;
        aim_flag=0;
        unibu_flag=0;
        uni_have=0;
        help=0;
        helper.x=-4000;
        unibu.x=-4000;
        level=1;
        levelText.text = 'Level: '+ level;
        score=0;
        scoreText.text = scoreString + score;
        z=0;
        die=0;
        boss_life=10;
        boardText.text = '';
        this.game.sound.volume=0.5;
        volText.text = 'Vol: '+ this.game.sound.volume*100;
        player.x=40;
        player.y=300;
        screen=1;
        lives.callAll('revive');
        boardText.visible = false;
        firingTimer = game.time.now + 2000;
        bullets.callAll('kill');
        //  And brings the aliens back from the dead :)
    
        //revives the player
        player.revive();
        //hides the text
        stateText.visible = false;
    
    }
};
var game = new Phaser.Game(900, 550, Phaser.AUTO, "canvas")
game.state.add('main', mainState);
game.state.start('main');
