// ============================================
//  ESCENA PRINCIPAL DEL JUEGO
// ============================================
class mainScene {
  
  // --------------------------------------------
  // 1. CARGA DE RECURSOS (PRELOAD)
  // --------------------------------------------
  preload() {
    // --- Personaje: Charmander ---
    this.load.image('walk1', 'assets/CharAssets/player1.png');
    this.load.image('walk2', 'assets/CharAssets/player2.png');
    this.load.image('walk3', 'assets/CharAssets/player3.png');
    this.load.image('walk4', 'assets/CharAssets/player4.png');
    this.load.image('walk5', 'assets/CharAssets/player5.png');
    this.load.image('walk6', 'assets/CharAssets/player6.png');
    this.load.image('walk7', 'assets/CharAssets/player7.png');

    // --- Charmander - durmiendo ---
    this.load.image('sleep1', 'assets/CharAssets/sleep/sleep1.png')
    this.load.image('sleep2', 'assets/CharAssets/sleep/sleep2.png')
    this.load.image('sleep3', 'assets/CharAssets/sleep/sleep3.png')
    this.load.image('sleep4', 'assets/CharAssets/sleep/sleep4.png')
    this.load.image('sleep5', 'assets/CharAssets/sleep/sleep5.png')
    this.load.image('sleep6', 'assets/CharAssets/sleep/sleep6.png')

    // --- Moneda ---
    this.load.image('coin1', 'assets/CoinAssets/coin1.png');
    this.load.image('coin2', 'assets/CoinAssets/coin2.png');
    this.load.image('coin3', 'assets/CoinAssets/coin3.png');
    this.load.image('coin4', 'assets/CoinAssets/coin4.png');
    this.load.image('coin5', 'assets/CoinAssets/coin5.png');
    this.load.image('coin6', 'assets/CoinAssets/coin6.png');
    this.load.image('coin7', 'assets/CoinAssets/coin7.png');
    this.load.image('coin8', 'assets/CoinAssets/coin8.png');
    this.load.image('coin9', 'assets/CoinAssets/coin9.png');
    this.load.image('coin10', 'assets/CoinAssets/coin10.png');
    this.load.image('coin11', 'assets/CoinAssets/coin11.png');
    this.load.image('coin12', 'assets/CoinAssets/coin12.png');
  }

  create() {
    this._createAnimations();
    this._createGameObjects();
    this._setupControls();
  }

  update() {
    this._handlePlayerMovement();
    this._handleCollisions();
  }

  // --------------------------------------------
  // CREAR ANIMACIONES
  // --------------------------------------------
  _createAnimations() {
    // --- Charmander caminando ---
    this.anims.create({
      key: 'walk',
      frames: [
        { key: 'walk1' },
        { key: 'walk2' },
        { key: 'walk3' },
        { key: 'walk4' },
        { key: 'walk5' },
        { key: 'walk6' },
        { key: 'walk7' }
      ],
      frameRate: 10,
      repeat: -1
    });

      // --- Charmander durmiendo (idle) ---
  this.anims.create({
    key: 'sleep',
    frames: [
      { key: 'sleep1' },
      { key: 'sleep2' },
      { key: 'sleep3' },
      { key: 'sleep4' },
      { key: 'sleep5' },
      { key: 'sleep6' }
    ],
    frameRate: 8,  // Más lento para que se vea que respira
    repeat: -1
  });

    // --- Moneda girando ---
    this.anims.create({
      key: 'spin',
      frames: [
        { key: 'coin1' },
        { key: 'coin2' },
        { key: 'coin3' },
        { key: 'coin4' },
        { key: 'coin5' },
        { key: 'coin6' },
        { key: 'coin7' },
        { key: 'coin8' },
        { key: 'coin9' },
        { key: 'coin10' },
        { key: 'coin11' },
        { key: 'coin12' }
      ],
      frameRate: 12,
      repeat: -1
    });
  }

  // --------------------------------------------
  // CREAR OBJETOS DEL JUEGO
  // --------------------------------------------
  _createGameObjects() {
    // --- Jugador (Charmander) ---
    this.player = this.physics.add.sprite(100, 100, 'walk1');
    this.player.setScale(1.5);
    this.player.anims.play('walk', true);

    // --- Temporizador de inactividad ---
    this.idleTimer = 0;           // Contador de tiempo inactivo
    this.idleThreshold = 3;       // 3 segundos para entrar en idle
    this.isIdle = false;          // Estado actual (si está dormido o no)
    
    // --- Moneda con animacion ---
    this.coin = this.physics.add.sprite(300, 300, 'coin1');
    this.coin.setScale(1.0);
    this.coin.anims.play('spin', true);
    
    // --- Puntaje ---
    this.score = 0;
    const style = { 
      font: '20px Arial', 
      fill: '#fff' 
    };
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
  }

  // --------------------------------------------
  // CONFIGURAR CONTROLES
  // --------------------------------------------
  _setupControls() {
    this.arrow = this.input.keyboard.createCursorKeys();
  }

  // --------------------------------------------
  // MANEJAR MOVIMIENTO
  // --------------------------------------------
_handlePlayerMovement() {
  let isMoving = false;
  
  // Movimiento horizontal
  if (this.arrow.right.isDown) {
    this.player.x += 3;
    this.player.flipX = true;
    this.lastDirection = 'right';
    isMoving = true;
  } else if (this.arrow.left.isDown) {
    this.player.x -= 3;
    this.player.flipX = false;
    this.lastDirection = 'left';
    isMoving = true;
  }
  
  // Movimiento vertical
  if (this.arrow.down.isDown) {
    this.player.y += 3;
    isMoving = true;
  } else if (this.arrow.up.isDown) {
    this.player.y -= 3;
    isMoving = true;
  }
  
  // --- LÓGICA DE INACTIVIDAD ---
  if (isMoving) {
    // Si se mueve, reiniciar el temporizador
    this.idleTimer = 0;
    
    // Si estaba dormido, despertar
    if (this.isIdle) {
      this.isIdle = false;
      this.player.anims.play('walk', true);
    }
  } else {
    // Si no se mueve, contar el tiempo
    this.idleTimer += 1/60;  // 1/60 segundos por frame (60 FPS)
    
    // Si pasaron 3 segundos y no está dormido
    if (this.idleTimer >= this.idleThreshold && !this.isIdle) {
      this.isIdle = true;
      this.player.anims.play('sleep', true);
    }
  }
}

  // --------------------------------------------
  // MANEJAR COLISIONES
  // --------------------------------------------
  _handleCollisions() {
    if (this.physics.overlap(this.player, this.coin)) {
      this._collectCoin();
    }
  }

  // --------------------------------------------
  // RECOGER MONEDA
  // --------------------------------------------
  _collectCoin() {
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 300);
    
    this.score += 10;
    this.scoreText.setText('score: ' + this.score);
    
    this.tweens.add({
      targets: this.player,
      duration: 200,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true
    });
  }
}

// ============================================
//  INICIAR EL JUEGO
// ============================================
new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: '#1a4664',
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game'
});