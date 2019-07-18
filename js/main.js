window.onload = function() {
  let defender = {};
  let stats = [];
  let age;
  let difficulty;
  let victim;
  let grave;
  let gameStart;
  let body = document.querySelector('body');
  let game = document.getElementById('game');
  let first_screen = document.getElementById('first_screen');
  let second_screen = document.getElementById('second_screen');
  let third_screen = document.getElementById('third_screen');
  let adult = document.getElementById('adult');
  let notadult = document.getElementById('notadult');
  let easy = document.getElementById('easy');
  let normal = document.getElementById('normal');
  let hard = document.getElementById('hard');
  let seacreatures = document.getElementById('seacreatures');
  let pandas = document.getElementById('pandas');

  defender.Boot = function() {};
  defender.Boot.prototype = {
    preload: function() {
      this.load.image('preloaderBar', 'images/loader_bar.png');
      this.load.image('titleimage', 'images/TitleImage.png');
      this.load.image('loading', 'images/loading.png');
    },
    create: function() {
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = false;
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 270;
      this.scale.minHeight = 480;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.stage.forcePortrait = true;
      this.scale.setScreenSize(true);

      this.input.addPointer();
      this.stage.backgroundColor = '#171642';

      this.state.start('Preloader');
    }
  };

  defender.Preloader = function() {
    this.preloadBar = null;
    this.titleText = null;
    this.loading = null;
    this.ready = false;
  };

  defender.Preloader.prototype = {
    preload: function() {
      this.preloadBar = this.add.sprite(
        this.world.centerX,
        this.world.centerY + 100,
        'preloaderBar'
      );
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.load.setPreloadSprite(this.preloadBar);
      this.titleText = this.add.image(this.world.centerX, this.world.centerY - 220, 'titleimage');
      this.titleText.anchor.setTo(0.5, 0.5);
      this.loading = this.add.image(this.world.centerX, this.world.centerY + 40, 'loading');
      this.loading.anchor.setTo(0.5, 0.5);
      this.load.image('titlescreen', 'images/TitleBG.png');
      this.load.bitmapFont(
        'eightbitwonder',
        'fonts/eightbitwonder.png',
        'fonts/eightbitwonder.fnt'
      );
      this.load.image('sky', 'images/sky.jpg');
      this.load.image('alien_queen', 'images/alien_queen.png');
      this.load.image('alien1', 'images/alien1.png');
      this.load.image('alien2', 'images/alien2.png');
      this.load.image('ghost', 'images/ghost.png');
      this.load.image('explosion', 'images/explosion.png');
      this.load.image('bullet', 'images/bullet.png');
      this.load.spritesheet('home', 'images/home.png', 193, 71);
      this.load.spritesheet('restart', 'images/restart.png', 193, 71);
      this.load.audio('explosion_audio', 'audio/explosion.mp3');
      this.load.audio('hurt_audio', 'audio/hurt.mp3');
      this.load.audio('game_audio', 'audio/bgm.mp3');
      this.load.audio('blaster', 'audio/blaster.mp3');

      if (victim == 'pandas') {
        this.load.atlasXML('panda', 'images/panda.png', 'images/panda.xml');
        this.load.image('hill', 'images/hill.png');
      } else if (victim == 'seacreatures') {
        this.load.image('water', 'images/water.png');
        this.load.image('coral', 'images/coral.png');
        this.load.atlasXML('seacreatures', 'images/seacreatures.png', 'images/seacreatures.xml');
      }

      if (age == 'adult') {
        this.load.image('blood', 'images/blood.png');
      } else {
        if (victim == 'pandas') {
          this.load.image('flowers', 'images/flowers.png');
        } else {
          this.load.image('amphora', 'images/amphora.png');
        }
      }
    },

    create: function() {
      this.preloadBar.cropEnabled = false;
    },

    update: function() {
      if (this.cache.isSoundDecoded('game_audio') && this.ready == false) {
        this.ready = true;
        this.state.start('StartMenu');
      }
    }
  };

  defender.StartMenu = function() {
    this.startBG;
    this.startPrompt;
  };
  defender.StartMenu.prototype = {
    create: function() {
      startBG = this.add.image(0, 0, 'titlescreen');
      startBG.inputEnabled = true;
      startBG.events.onInputDown.addOnce(this.startGame, this);

      startPrompt = this.add.bitmapText(
        this.world.centerX - 155,
        this.world.centerY,
        'eightbitwonder',
        'CLICK TO START',
        25
      );
      startPrompt = this.add.bitmapText(
        this.world.centerX - 215,
        this.world.centerY + 90,
        'eightbitwonder',
        'Use the following buttons',
        18
      );
      startPrompt = this.add.bitmapText(
        this.world.centerX - 215,
        this.world.centerY + 120,
        'eightbitwonder',
        'to open fire:',
        18
      );
      startPrompt = this.add.bitmapText(
        this.world.centerX - 185,
        this.world.centerY + 160,
        'eightbitwonder',
        'space bar:',
        18
      );
      startPrompt = this.add.bitmapText(
        this.world.centerX - 185,
        this.world.centerY + 190,
        'eightbitwonder',
        'left mouse button:',
        18
      );
    },

    startGame: function(pointer) {
      this.state.start('Game');
    }
  };

  defender.Game = function() {
    this.totalCreatures;
    this.pandaGroup;
    this.crab;
    this.stingray;
    this.purpleFish;
    this.blueJellyfish;
    this.bulletTime = 0;
    this.alien_queen;
    this.totalAliens1;
    this.totalAliens2;
    this.aliens1group;
    this.aliens2group;
    this.burst;
    this.bullets;
    this.fireButton;
    this.blood;
    this.gameover;
    this.countdown;
    this.overmessage;
    this.secondsElapsed;
    this.secondsElapsed2;
    this.timer;
    this.timer2;
    this.button;
    this.button2;
    this.music;
    this.ouch;
    this.boom;
    this.blaster;
    this.velocity;
    this.numberOfParticles;
    this.range;
  };

  defender.Game.prototype = {
    create: function() {
      this.gameover = false;
      this.secondsElapsed = 0;
      this.secondsElapsed2 = 0;
      this.timer = this.time.create(false);
      this.timer2 = this.time.create(false);
      this.timer.loop(1000, this.updateSeconds, this);
      this.timer2.loop(1, this.updateSeconds2, this);
      this.totalCreatures = 15;
      this.totalAliens1 = 9;
      this.totalAliens2 = 4;
      this.music = this.add.audio('game_audio');
      this.music.play('', 0, 0.3, true);
      this.ouch = this.add.audio('hurt_audio');
      this.boom = this.add.audio('explosion_audio');
      this.blaster = this.add.audio('blaster');
      this.chooseDifficulty();
      this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.buildWorld();
    },
    chooseDifficulty: function() {
      if (difficulty == 'easy') {
        this.range = 100;
        this.numberOfParticles = 20;
        this.velocity = 201;
      }
      if (difficulty == 'normal') {
        this.range = 50;
        this.numberOfParticles = 5;
        this.velocity = 300;
      }
      if (difficulty == 'hard') {
        this.range = 0;
        this.numberOfParticles = 1;
        this.velocity = 400;
      }
    },
    updateSeconds: function() {
      this.secondsElapsed++;
    },
    updateSeconds2: function() {
      this.secondsElapsed2++;
    },
    buildWorld: function() {
      this.add.image(0, 0, 'sky');
      if (victim == 'pandas') {
        this.add.image(0, 800, 'hill');
      }
      if (victim == 'seacreatures') {
        this.add.image(0, 750, 'water');
        this.add.image(0, 880, 'coral');
      }

      if (victim == 'pandas') {
        this.buildPandas();
      } else {
        this.buildSeacreatures();
      }

      this.buildAliens1();
      this.buildAliens2();
      this.buildBullet();
      this.buildEmitter();
      this.countdown = this.add.bitmapText(
        10,
        10,
        'eightbitwonder',
        victim + ' left ' + this.totalCreatures,
        20
      );
      this.timer.start();
      this.timer2.start();
    },

    buildSeacreatures: function() {
      this.stingray = this.add.group();
      this.stingray.enableBody = true;
      for (var i = 0; i < 2; i++) {
        var p = this.stingray.create(
          this.rnd.integerInRange(200, this.world.width - 50),
          this.rnd.integerInRange(this.world.height - 175, this.world.height - 60),
          'seacreatures',
          'stingray0000'
        );
        p.anchor.setTo(0.5, 0.5);
        p.scale.x = 0.4;
        p.scale.y = 0.4;
        p.body.moves = false;
        p.animations.add('swim', this.game.math.numberArray(174, 197));
        p.animations.play('swim', 24, true);
        t = this.add
          .tween(p)
          .to(
            { x: -10 },
            this.rnd.integerInRange(13000, 22000),
            Phaser.Easing.Quadratic.InOut,
            true,
            0
          );
        t.onComplete.add(this.checking, this);
      }

      this.crab = this.add.group();
      this.crab.enableBody = true;
      for (var i = 0; i < 2; i++) {
        var p = this.crab.create(
          this.rnd.integerInRange(100, this.world.width - 50),
          this.world.height - 55,
          'seacreatures',
          'crab10000'
        );
        p.anchor.setTo(0.5, 0.5);
        p.scale.x = 0.7;
        p.scale.y = 0.7;
        p.body.moves = false;
        p.animations.add('swim', this.game.math.numberArray(33, 58));
        p.animations.play('swim', 26, true);
        this.add
          .tween(p)
          .to(
            { x: this.world.width - 20 },
            this.rnd.integerInRange(13000, 18000),
            Phaser.Easing.Quadratic.InOut,
            true,
            0,
            1000,
            true
          );
      }

      this.blueJellyfish = this.add.group();
      this.blueJellyfish.enableBody = true;
      for (var i = 0; i < 9; i++) {
        var p = this.blueJellyfish.create(
          this.rnd.integerInRange(15, this.world.width - 50),
          this.rnd.integerInRange(this.world.height - 165, this.world.height - 60),
          'seacreatures',
          'blueJellyfish0000'
        );
        p.anchor.setTo(0.4, 0.4);
        p.scale.x = 0.9;
        p.scale.y = 0.9;
        p.body.moves = false;
        p.animations.add('swim', this.game.math.numberArray(0, 32));
        p.animations.play('swim', 33, true);
        this.add
          .tween(p)
          .to(
            { y: this.world.height - 165 },
            this.rnd.integerInRange(8000, 11000),
            Phaser.Easing.Quadratic.InOut,
            true,
            0,
            1000,
            true
          );
      }

      this.purpleFish = this.add.group();
      this.purpleFish.enableBody = true;
      for (var i = 0; i < 2; i++) {
        var p = this.purpleFish.create(
          this.rnd.integerInRange(this.world.width + 5, this.world.width + 20),
          this.rnd.integerInRange(this.world.height - 170, this.world.height - 60),
          'seacreatures',
          'purpleFish0000'
        );
        p.anchor.setTo(0.4, 0.4);
        p.scale.x = 0.8;
        p.scale.y = 0.8;
        p.body.moves = false;
        p.animations.add('swim', this.game.math.numberArray(134, 140));
        p.animations.play('swim', 8, true);
        this.add
          .tween(p)
          .to(
            { x: -40 },
            this.rnd.integerInRange(13000, 21000),
            Phaser.Easing.Quadratic.InOut,
            true,
            0,
            1000,
            false
          );
      }
    },

    checking: function(p) {
      if (p.x < 10) {
        p.scale.x = -0.5;
        t = this.add
          .tween(p)
          .to(
            { x: this.world.width },
            this.rnd.integerInRange(14000, 21000),
            Phaser.Easing.Quadratic.InOut,
            true,
            0
          );
      } else {
        p.scale.x = 0.5;
        t = this.add
          .tween(p)
          .to(
            { x: -10 },
            this.rnd.integerInRange(14000, 21000),
            Phaser.Easing.Quadratic.InOut,
            true,
            0
          );
      }
      t.onComplete.add(this.checking, this);
    },

    buildPandas: function() {
      this.pandaGroup = this.add.group();
      this.pandaGroup.enableBody = true;
      for (var i = 0; i < this.totalCreatures; i++) {
        var p = this.pandaGroup.create(
          this.rnd.integerInRange(5, this.world.width - 50),
          this.rnd.integerInRange(this.world.height - 165, this.world.height - 60),
          'panda',
          '5904788059a0d793134691_000'
        );
        p.anchor.setTo(0.5, 0.5);
        p.bringToTop();
        p.body.moves = false;
        p.animations.add('Rest', this.game.math.numberArray(1, 20));
        p.animations.play('Rest', this.rnd.integerInRange(6, 12), true);
      }
    },

    buildAliens1: function() {
      this.aliens1group = this.add.group();

      for (var i = 0; i < this.totalAliens1; i++) {
        var r = this.aliens1group.create(
          this.rnd.integerInRange(0, this.world.width - 50),
          this.rnd.realInRange(-1500, 0),
          'alien1'
        );
        r.anchor.setTo(0.5, 0.5);
        var scale = this.rnd.realInRange(0.7, 1);
        r.lives = 2;
        r.scale.x = scale;
        r.scale.y = scale;
        this.physics.enable(r, Phaser.Physics.ARCADE);
        r.enableBody = true;
        r.body.velocity.y = this.rnd.integerInRange(200, this.velocity);
        r.checkWorldBounds = true;
        r.events.onOutOfBounds.add(this.resetAlien, this);
      }
    },

    buildAliens2: function() {
      this.aliens2group = this.add.group();
      for (var i = 0; i < this.totalAliens2; i++) {
        var r = this.aliens2group.create(
          this.rnd.integerInRange(0, this.world.width - 50),
          this.rnd.realInRange(-1500, 0),
          'alien2'
        );
        r.anchor.setTo(0.5, 0.5);
        var scale = this.rnd.realInRange(0.7, 1);
        r.lives = 2;
        r.scale.x = scale;
        r.scale.y = scale;
        this.physics.enable(r, Phaser.Physics.ARCADE);
        r.enableBody = true;
        r.body.velocity.y = this.rnd.integerInRange(200, this.velocity);
        r.checkWorldBounds = true;
        r.events.onOutOfBounds.add(this.resetAlien, this);
      }
    },

    resetAlien: function(r) {
      if (r.y > this.world.height) {
        this.respawnAlien(r);
      }
    },

    respawnAlien: function(r) {
      if (this.gameover == false) {
        r.reset(this.rnd.integerInRange(0, this.world.width - 50), this.rnd.realInRange(-1500, 0));
        r.lives = 2;
        r.body.velocity.y = this.rnd.integerInRange(200, this.velocity);
      }
    },

    buildEmitter: function() {
      this.burst = this.add.emitter(0, 0, 60);
      this.burst.minParticleScale = 0.3;
      this.burst.maxParticleScale = 1.2;
      this.burst.minParticleSpeed.setTo(-this.range, this.range);
      this.burst.maxParticleSpeed.setTo(this.range, -this.range);
      this.burst.makeParticles('explosion');
      this.input.onDown.add(this.fireBurst, this);
    },

    fireBurst: function(pointer) {
      if (this.gameover == false) {
        this.boom.play();
        this.boom.volume = 0.2;
        this.burst.emitX = pointer.x;
        this.burst.emitY = pointer.y;
        this.burst.start(true, 600, null, this.numberOfParticles);
      }
    },

    buildBullet: function() {
      this.bullets = this.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(30, 'bullet');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);
    },

    burstCollision: function(r, b) {
      this.respawnAlien(r);
      b.kill();
    },

    bulletsCollision: function(r, b) {
      r.lives--;
      if (r.lives < 1) {
        this.respawnAlien(r);
      }
      b.kill();
    },

    bulletsCollision2: function(r, b) {
      r.lives--;
      if (r.lives < 1) {
        r.kill();
      }
      b.kill();
    },

    collision: function(r, b) {
      if (b.exists) {
        this.ouch.play();
        this.respawnAlien(r);
        this.makeGhost(b);
        if (age == 'adult') {
          this.blood = this.add.emitter(0, 0, 1);
          this.blood.makeParticles('blood');
          this.blood.emitX = b.x;
          this.blood.emitY = b.y;
          this.blood.start(true, 200, null, 1);
        } else {
          if (victim == 'pandas') {
            this.add.sprite(b.x, b.y, 'flowers');
          } else {
            var amphora = this.add.sprite(b.x - 20, b.y, 'amphora');
            this.physics.enable(amphora, Phaser.Physics.ARCADE);
            amphora.enableBody = true;
            amphora.checkWorldBounds = true;
            amphora.body.velocity.y = 50;
          }
        }
        b.kill();
        this.totalCreatures--;
        this.checkCreaturesLeft();
      }
    },

    checkCreaturesLeft: function() {
      if (this.totalCreatures <= 0) {
        this.gameover = true;
        this.music.stop();
        this.countdown.setText(victim + ' left 0');
        this.overmessage = this.add.bitmapText(
          this.world.centerX - 250,
          this.world.centerY - 40,
          'eightbitwonder',
          'GAME OVER\n\n' + this.secondsElapsed + ' sec elapsed',
          38
        );
        stats.push(this.secondsElapsed);
        this.add.bitmapText(90, 60, 'eightbitwonder', 'all your results', 20);
        var y = 67;
        for (i = 0; i < stats.length; i++) {
          this.add.bitmapText(10, (y += 20), 'eightbitwonder', stats[i] + ' seconds', 18);
        }
        this.overmessage.align = 'center';
        this.overmessage.inputEnabled = true;
        this.button = this.add.button(
          this.world.centerX - 200,
          this.world.centerY + 110,
          'home',
          this.toTheBeginning,
          this,
          1,
          0,
          2
        );
        this.button2 = this.add.button(
          this.world.centerX,
          this.world.centerY + 110,
          'restart',
          this.quitGame,
          this,
          1,
          0,
          2
        );
        this.overmessage.events.onInputDown.addOnce(this.quitGame, this);
      } else {
        this.countdown.setText(victim + ' left ' + this.totalCreatures);
      }
    },

    toTheBeginning: function() {
      game.classList.toggle('display_none');
      body.classList.toggle('body_before_game');
      first_screen.classList.toggle('display_none');
      let canvas = document.querySelector('canvas');
      game.removeChild(canvas);
    },

    quitGame: function(pointer) {
      this.state.start('StartMenu');
    },

    friendlyFire: function(b, e) {
      if (b.exists) {
        this.ouch.play();
        this.makeGhost(b);
        if (age == 'adult') {
          this.blood = this.add.emitter(0, 0, 1);
          this.blood.makeParticles('blood');
          this.blood.emitX = b.x;
          this.blood.emitY = b.y;
          this.blood.start(true, 200, null, 1);
        } else {
          if (victim == 'pandas') {
            this.add.sprite(b.x, b.y, 'flowers');
          } else {
            var amphora = this.add.sprite(b.x - 20, b.y, 'amphora');
            this.physics.enable(amphora, Phaser.Physics.ARCADE);
            amphora.enableBody = true;
            amphora.checkWorldBounds = true;
            amphora.body.velocity.y = 50;
          }
        }
        b.kill();
        this.totalCreatures--;
        this.checkCreaturesLeft();
      }
    },

    makeGhost: function(b) {
      ghost = this.add.sprite(b.x - 20, b.y - 180, 'ghost');
      ghost.anchor.setTo(0.5, 0.5);
      ghost.scale.x = b.scale.x;
      this.physics.enable(ghost, Phaser.Physics.ARCADE);
      ghost.enableBody = true;
      ghost.checkWorldBounds = true;
      ghost.body.velocity.y = -800;
    },

    alien_queen: function() {
      alert('10');
    },

    killAlienQueen: function(r) {
      if (r.y > this.world.height) {
        r.kill();
      }
    },
    update: function() {
      if (this.gameover == false) {
        if (this.secondsElapsed2 != 0 && this.secondsElapsed2 % 1000 == 0) {
          this.alien_queen = this.add.group();
          var r = this.alien_queen.create(
            this.world.centerX,
            this.rnd.realInRange(-1500, 0),
            'alien_queen'
          );
          r.anchor.setTo(0.5, 0.5);
          r.lives = 5;
          this.physics.enable(r, Phaser.Physics.ARCADE);
          r.enableBody = true;
          r.body.velocity.y = 200;
          r.checkWorldBounds = true;
          r.events.onOutOfBounds.add(this.killAlienQueen, this);
        }
      }
      this.game.world.bringToTop(this.aliens1group);
      this.game.world.bringToTop(this.aliens2group);

      if (victim == 'pandas') {
        this.game.world.bringToTop(this.pandaGroup);
        this.physics.arcade.overlap(this.aliens2group, this.pandaGroup, this.collision, null, this);
        this.physics.arcade.overlap(this.pandaGroup, this.burst, this.friendlyFire, null, this);
        this.physics.arcade.overlap(this.aliens1group, this.pandaGroup, this.collision, null, this);
      } else {
        this.game.world.bringToTop(this.stingray);
        this.physics.arcade.overlap(
          this.aliens2group,
          this.blueJellyfish,
          this.collision,
          null,
          this
        );
        this.physics.arcade.overlap(
          this.aliens1group,
          this.blueJellyfish,
          this.collision,
          null,
          this
        );
        this.physics.arcade.overlap(this.blueJellyfish, this.burst, this.friendlyFire, null, this);
        this.physics.arcade.overlap(this.aliens2group, this.crab, this.collision, null, this);
        this.physics.arcade.overlap(this.aliens1group, this.crab, this.collision, null, this);
        this.physics.arcade.overlap(this.crab, this.burst, this.friendlyFire, null, this);
        this.physics.arcade.overlap(this.aliens2group, this.stingray, this.collision, null, this);
        this.physics.arcade.overlap(this.aliens1group, this.stingray, this.collision, null, this);
        this.physics.arcade.overlap(this.stingray, this.burst, this.friendlyFire, null, this);
        this.physics.arcade.overlap(this.aliens2group, this.purpleFish, this.collision, null, this);
        this.physics.arcade.overlap(this.aliens1group, this.purpleFish, this.collision, null, this);
        this.physics.arcade.overlap(this.purpleFish, this.burst, this.friendlyFire, null, this);
      }
      this.physics.arcade.overlap(
        this.aliens1group,
        this.bullets,
        this.bulletsCollision,
        null,
        this
      );
      this.physics.arcade.overlap(
        this.aliens2group,
        this.bullets,
        this.bulletsCollision,
        null,
        this
      );
      this.physics.arcade.overlap(
        this.alien_queen,
        this.bullets,
        this.bulletsCollision2,
        null,
        this
      );
      this.physics.arcade.overlap(this.alien_queen, this.burst, this.bulletsCollision2, null, this);
      this.physics.arcade.overlap(this.aliens1group, this.burst, this.burstCollision, null, this);
      this.physics.arcade.overlap(this.aliens2group, this.burst, this.burstCollision, null, this);
      if (this.fireButton.isDown) {
        if (this.time.now > this.bulletTime) {
          var bullet = this.bullets.getFirstExists(false);

          if (bullet) {
            this.blaster.play();
            this.blaster.volume = 0.1;
            bullet.reset(this.input.x, this.input.y);
            bullet.body.velocity.y = -400;
            this.bulletTime = this.time.now + 150;
          }
        }
      }
    }
  };

  function start_game() {
    gameStart = new Phaser.Game(540, 960, Phaser.AUTO, 'game');

    gameStart.state.add('Boot', defender.Boot);
    gameStart.state.add('Preloader', defender.Preloader);
    gameStart.state.add('StartMenu', defender.StartMenu);
    gameStart.state.add('Game', defender.Game);
    gameStart.state.start('Boot');
  }

  adult.addEventListener('click', function() {
    age = 'adult';
    first_screen.classList.toggle('display_none');
    second_screen.classList.toggle('display_none');
  });

  notadult.addEventListener('click', function() {
    age = 'notadult';
    first_screen.classList.toggle('display_none');
    second_screen.classList.toggle('display_none');
  });

  easy.addEventListener('click', function() {
    difficulty = 'easy';
    second_screen.classList.toggle('display_none');
    third_screen.classList.toggle('display_none');
  });

  normal.addEventListener('click', function() {
    difficulty = 'normal';
    second_screen.classList.toggle('display_none');
    third_screen.classList.toggle('display_none');
  });

  hard.addEventListener('click', function() {
    difficulty = 'hard';
    second_screen.classList.toggle('display_none');
    third_screen.classList.toggle('display_none');
  });

  seacreatures.addEventListener('click', function() {
    victim = 'seacreatures';
    third_screen.classList.toggle('display_none');
    body.classList.toggle('body_before_game');
    game.classList.toggle('display_none');
    start_game();
  });

  pandas.addEventListener('click', function() {
    victim = 'pandas';
    third_screen.classList.toggle('display_none');
    body.classList.toggle('body_before_game');
    game.classList.toggle('display_none');
    start_game();
  });
};
