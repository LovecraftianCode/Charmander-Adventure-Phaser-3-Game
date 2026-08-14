// ============================================
//  ESCENA PRINCIPAL DEL JUEGO
// ============================================

// crear los enemigos
// crear la moneda del pegecoin

class mainScene {
  
  // --------------------------------------------
  // 1. CARGA DE RECURSOS (PRELOAD)
  // --------------------------------------------
  preload() {
    // --- Personaje: Charmander caminando ---
    this.load.image('walk1', 'assets/CharAssets/player1.png');
    this.load.image('walk2', 'assets/CharAssets/player2.png');
    this.load.image('walk3', 'assets/CharAssets/player3.png');
    this.load.image('walk4', 'assets/CharAssets/player4.png');
    this.load.image('walk5', 'assets/CharAssets/player5.png');
    this.load.image('walk6', 'assets/CharAssets/player6.png');
    this.load.image('walk7', 'assets/CharAssets/player7.png');

    // --- Charmander - durmiendo ---
    this.load.image('sleep1', 'assets/CharAssets/sleep/sleep1.png');
    this.load.image('sleep2', 'assets/CharAssets/sleep/sleep2.png');
    this.load.image('sleep3', 'assets/CharAssets/sleep/sleep3.png');
    this.load.image('sleep4', 'assets/CharAssets/sleep/sleep4.png');
    this.load.image('sleep5', 'assets/CharAssets/sleep/sleep5.png');
    this.load.image('sleep6', 'assets/CharAssets/sleep/sleep6.png');

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
    
    // --- Café  ---
    this.load.image('coffee1', 'assets/Coffe/Coffee1.png');  
    this.load.image('coffee2', 'assets/Coffe/Coffee2.png');
    this.load.image('coffee3', 'assets/Coffe/Coffee3.png');
    this.load.image('coffee4', 'assets/Coffe/Coffee4.png');
    this.load.image('coffee5', 'assets/Coffe/Coffee5.png');
    this.load.image('coffee6', 'assets/Coffe/Coffee6.png');
  }

  // --------------------------------------------
  // 2. INICIALIZACION (CREATE)
  // --------------------------------------------
  create() {
    this._createAnimations();
    this._createGameObjects();
    this._setupControls();
    
    // Exponer la escena globalmente para la tienda
    window.gameScene = this;
  }

  // --------------------------------------------
  // 3. ACTUALIZACION (UPDATE)
  // --------------------------------------------
  update() {
    this._handlePlayerMovement();
    this._handleCollisions();
  }

  // ============================================
  //  METODOS AUXILIARES
  // ============================================

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
      frameRate: 6,
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

    // --- Café animado  ---
    this.anims.create({
      key: 'coffeeAnim',
      frames: [
        { key: 'coffee1' },
        { key: 'coffee2' },
        { key: 'coffee3' },
        { key: 'coffee4' },
        { key: 'coffee5' },
        { key: 'coffee6' }
      ],
      frameRate: 2,
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
    this.lastDirection = 'right';

    // --- Temporizador de inactividad ---
    this.idleTimer = 0;
    this.idleThreshold = 3;
    this.isIdle = false;
    
    // --- Moneda con animacion ---
    this.coin = this.physics.add.sprite(300, 300, 'coin1');
    this.coin.setScale(1.0);
    this.coin.anims.play('spin', true);
    
    // --- Café animado (oculto al inicio) ---
    this.coffee = this.physics.add.sprite(0, 0, 'coffee1');
    this.coffee.setScale(0.8);
    this.coffee.visible = false;
    this.coffee.active = false;
    
    // --- Puntaje (pegecoins) ---
    this.pegecoins = 10;// modificar a 0 terminando pruebas 
    const style = { 
      font: '20px Arial', 
      fill: '#fff' 
    };
    this.scoreText = this.add.text(20, 20, '🪙 ' + this.pegecoins, style);
    
    // Velocidad base
    this.playerSpeed = 3;
    this.coffeeCount = 0;
    
    // Guardar referencia global para la tienda
    window.pegecoins = this.pegecoins;
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
    const speed = this.playerSpeed || 3;
    
    // Movimiento horizontal
    if (this.arrow.right.isDown) {
      this.player.x += speed;
      this.player.flipX = true;
      this.lastDirection = 'right';
      isMoving = true;
    } else if (this.arrow.left.isDown) {
      this.player.x -= speed;
      this.player.flipX = false;
      this.lastDirection = 'left';
      isMoving = true;
    }
    
    // Movimiento vertical
    if (this.arrow.down.isDown) {
      this.player.y += speed;
      isMoving = true;
    } else if (this.arrow.up.isDown) {
      this.player.y -= speed;
      isMoving = true;
    }
    
    // --- LOGICA DE INACTIVIDAD ---
    if (isMoving) {
      this.idleTimer = 0;
      if (this.isIdle) {
        this.isIdle = false;
        this.player.anims.play('walk', true);
      }
    } else {
      this.idleTimer += 1/60;
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
    // Colisión con moneda
    if (this.physics.overlap(this.player, this.coin)) {
      this._collectCoin();
    }
    
    // Colisión con café
    if (this.physics.overlap(this.player, this.coffee) && this.coffee.active) {
      this._collectCoffee();
    }
  }

  // --------------------------------------------
  // RECOGER MONEDA
  // --------------------------------------------
  _collectCoin() {
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 300);
    
    this.pegecoins += 1;
    this.scoreText.setText('🪙 ' + this.pegecoins);
    window.pegecoins = this.pegecoins;
    
    this.tweens.add({
      targets: this.player,
      duration: 200,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true
    });
  }

  // --------------------------------------------
  // APARECER CAFÉ
  // --------------------------------------------
  _spawnCoffee() {
    const x = Phaser.Math.Between(50, 650);
    const y = Phaser.Math.Between(50, 350);
    
    this.coffee.setPosition(x, y);
    this.coffee.visible = true;
    this.coffee.active = true;
    this.coffee.anims.play('coffeeAnim', true);
    
    this.tweens.add({
      targets: this.coffee,
      duration: 300,
      scaleX: 0.8,
      scaleY: 0.8,
      from: { scaleX: 0, scaleY: 0 },
      ease: 'Bounce.easeOut'
    });
    
    // Usar el nuevo sistema de notificaciones
    this.showNotification('☕ ¡Café apareció en el mapa!', '#f1c40f', 2500);
  }

  // --------------------------------------------
  // RECOGER CAFÉ
  // --------------------------------------------
  _collectCoffee() {
    this.coffee.visible = false;
    this.coffee.active = false;
    this.coffee.anims.stop();
    
    this.playerSpeed = 6;
    this.coffeeCount += 1;
    
    // Notificación de velocidad
    this.showNotification('☕ ¡Charmander tomó café! +3 velocidad ⚡', '#2ecc71', 2000);
    
    this.tweens.add({
      targets: this.player,
      duration: 100,
      alpha: 0.7,
      yoyo: true,
      repeat: 3
    });
    
    this.time.delayedCall(3000, () => {
      this.playerSpeed = 3;
      this.showNotification('Se termino el cafe', '#e74c3c', 1500);
    });
  }

// --------------------------------------------
// SISTEMA DE NOTIFICACIONES MEJORADO
// --------------------------------------------
showNotification(text, color = '#f1c40f', duration = 2000) {
  // Si ya hay una notificación, la eliminamos
  if (this.notification) {
    this.notification.destroy();
    this.notification = null;
  }
  
  // Xontenedor 
  if (!this.notificationContainer) {
    this.notificationContainer = this.add.container(0, 0);
    this.notificationContainer.setDepth(1000);
  }
  
  const style = { 
    font: '24px Arial', 
    fill: color,
    stroke: '#000',
    strokeThickness: 4,
    align: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    padding: { x: 20, y: 10 },
    borderRadius: 10
  };
  
  // Crear el texto en el centro superior
  const x = this.cameras.main.width / 2;
  const y = 50;
  
  this.notification = this.add.text(x, y, text, style);
  this.notification.setOrigin(0.5);
  this.notification.setDepth(1000);
  
  // Asegurarnos de que el texto se mantenga dentro de la pantalla
  if (this.notification.width > this.cameras.main.width - 40) {
    this.notification.setStyle({
      font: '18px Arial',
      align: 'center',
      wordWrap: { width: this.cameras.main.width - 60 }
    });
  }
  
  // Animación de entrada
  this.tweens.add({
    targets: this.notification,
    duration: 300,
    scaleX: 1.1,
    scaleY: 1.1,
    from: { scaleX: 0.5, scaleY: 0.5, alpha: 0 },
    ease: 'Back.easeOut'
  });
  
  // Desaparecer después de 'duration' milisegundos
  this.time.delayedCall(duration, () => {
    if (this.notification) {
      this.tweens.add({
        targets: this.notification,
        duration: 400,
        alpha: 0,
        y: this.notification.y - 30,
        onComplete: () => {
          if (this.notification) {
            this.notification.destroy();
            this.notification = null;
          }
        }
      });
    }
  });
}

// --------------------------------------------
// MOSTRAR MENSAJE
// --------------------------------------------
showMessage(text, color = '#f1c40f') {
  this.showNotification(text, color, 1800);
}
}

// ============================================
//  INICIAR EL JUEGO
// ============================================
const game = new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: '#1a4664',
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game'
});

window.game = game;