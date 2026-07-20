# 🔥 Charmander Adventure - Phaser 3 Game

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Phaser](https://img.shields.io/badge/Phaser-3.14.0-4455AA?style=for-the-badge&logo=phaser&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

> **Un juego de plataformas 2D desarrollado con Phaser 3** donde controlas a Charmander para recolectar monedas.  
> *¡Explora, recolecta y diviértete con este pequeño Pokémon!*

## Demo en vivo

<img width="1028" height="752" alt="Grabación 2026-07-20 023820" src="https://github.com/user-attachments/assets/2c24e65f-c039-4919-b85a-d1db9ce7cd0d" />


**¡Juega ahora!** → [Charmander Adventure en GitHub Pages](https://lovecraftiancode.github.io/Charmander-Adventure---Phaser-3-Game/)

## Tabla de Contenidos
- [Sobre este proyecto](#sobre-este-proyecto)
- [Características del juego](#características-del-juego)
- [Controles](#controles)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Conceptos aprendidos](#conceptos-aprendidos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Explicación del código](#explicación-del-código)
- [Cómo ejecutar localmente](#cómo-ejecutar-localmente)
- [Próximas mejoras](#próximas-mejoras)
- [Créditos](#créditos)
- [Autor](#autor)

## Sobre este proyecto

Este proyecto es mi versión personal de un juego de colección de monedas desarrollado con **Phaser 3**. El código base y la lógica fundamental fueron desarrollados siguiendo el excelente tutorial de **[Lessmilk](https://www.lessmilk.com/phaser-game-tutorial/)**. 

A partir de esa base, he añadido mejoras como:
- **Animaciones personalizadas** (Charmander caminando y moneda girando)
- **Sistema de dirección** (Charmander voltea al moverse)
- **Efectos visuales** (tweens al recolectar monedas)
- **Sistema de puntuación** en tiempo real

### Tecnologías implementadas:
- **Phaser 3**: Framework de juegos HTML5
- **Spritesheet animados**: Para personajes y objetos
- **Física Arcade**: Detección de colisiones
- **Sistema de animaciones**: Tweens y animaciones por frames

**Objetivo:** Aprender los fundamentos de Phaser 3 mientras creamos un juego divertido y visualmente atractivo.

## Características del juego

| Característica | Descripción |
|----------------|-------------|
| **Personaje animado** | Charmander camina con 7 frames de animación |
| **Moneda giratoria** | 12 frames de animación para la moneda |
| **Movimiento fluido** | Control con teclas de flecha |
| **Sistema de puntuación** | +10 puntos por cada moneda recolectada |
| **Detección de colisiones** | Física Arcade de Phaser 3 |
| **Efecto de crecimiento** | Tween al recolectar moneda |
| **Cambio de dirección** | Charmander voltea según la dirección |

## Controles

| Dispositivo | Acción | Control |
|-------------|--------|---------|
| **PC** | Moverse arriba | Flecha arriba ↑ |
| **PC** | Moverse abajo | Flecha abajo ↓ |
| **PC** | Moverse izquierda | Flecha izquierda ← |
| **PC** | Moverse derecha | Flecha derecha → |
| **Móvil** | *Próximamente* | Controles táctiles |

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Phaser 3** | 3.14.0 | Framework de juegos HTML5 |
| **JavaScript** | ES6+ | Lógica del juego |
| **HTML5** | - | Estructura de la página |
| **CSS3** | - | Estilos y diseño responsive |
| **Git & GitHub Pages** | - | Control de versiones y despliegue |

## Conceptos aprendidos

### Escenas de Phaser

```javascript
class mainScene {
  preload() {
    // Carga de assets (imágenes, sonidos)
  }
  
  create() {
    // Inicialización de objetos y configuraciones
  }
  
  update() {
    // Bucle principal del juego (60 FPS)
  }
}
```
###  Carga de assets (Preload)

```javascript
preload() {
  // Cargar spritesheet de Charmander
  this.load.image('walk1', 'assets/CharAssets/player1.png');
  // ... más frames
  
  // Cargar moneda animada
  this.load.image('coin1', 'assets/CoinAssets/coin1.png');
  // ... 12 frames
}
```
### Creación de animaciones
```javascript
_createAnimations() {
  // Animación de caminar de Charmander
  this.anims.create({
    key: 'walk',
    frames: [
      { key: 'walk1' }, { key: 'walk2' }, // ... 7 frames
    ],
    frameRate: 10,
    repeat: -1  // Bucle infinito
  });
  
  // Animación de moneda girando
  this.anims.create({
    key: 'spin',
    frames: [
      { key: 'coin1' }, { key: 'coin2' }, // ... 12 frames
    ],
    frameRate: 12,
    repeat: -1
  });
}
```

### Física y colisiones
```javascript
_createGameObjects() {
  // Crear jugador con física
  this.player = this.physics.add.sprite(100, 100, 'walk1');
  this.player.setScale(1.5);
  this.player.anims.play('walk', true);
  
  // Crear moneda con física
  this.coin = this.physics.add.sprite(300, 300, 'coin1');
  this.coin.anims.play('spin', true);
}

_handleCollisions() {
  // Detectar colisión entre jugador y moneda
  if (this.physics.overlap(this.player, this.coin)) {
    this._collectCoin();
  }
}
```

### Movimiento y dirección
```javascript
_handlePlayerMovement() {
  let isMoving = false;
  
  // Movimiento horizontal
  if (this.arrow.right.isDown) {
    this.player.x += 3;
    this.player.flipX = true;   // Mirar a la derecha
    isMoving = true;
  } else if (this.arrow.left.isDown) {
    this.player.x -= 3;
    this.player.flipX = false;  // Mirar a la izquierda
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
}
```

### Sistema de puntuación
```javascript
_collectCoin() {
  // Posición aleatoria para la moneda
  this.coin.x = Phaser.Math.Between(100, 600);
  this.coin.y = Phaser.Math.Between(100, 300);
  
  // Incrementar puntuación
  this.score += 10;
  this.scoreText.setText('score: ' + this.score);
  
  // Efecto visual (tween)
  this.tweens.add({
    targets: this.player,
    duration: 200,
    scaleX: 1.2,
    scaleY: 1.2,
    yoyo: true  // Vuelve al tamaño original
  });
}
```

### Tweens (animaciones suaves)

```javascript
// Efecto de crecimiento al recolectar moneda
this.tweens.add({
  targets: this.player,
  duration: 200,
  scaleX: 1.2,
  scaleY: 1.2,
  yoyo: true
});
```

### Configuración del juego
```javascript
// Iniciar Phaser
new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: '#1a4664',
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game'  // ID del contenedor en HTML
});
```

## Estructura del proyecto

```bash
charmander-adventure/
│
├── README.md                 # Documentación del proyecto
├── index.html                # Estructura HTML
├── game.js                   # Lógica completa del juego
├── styles.css                # Estilos CSS
│
└── assets/
    ├── CharAssets/           # Sprites de Charmander
    │   ├── player1.png
    │   ├── player2.png
    │   ├── player3.png
    │   ├── player4.png
    │   ├── player5.png
    │   ├── player6.png
    │   └── player7.png
    │
    └── CoinAssets/           # Sprites de la moneda
        ├── coin1.png
        ├── coin2.png
        ├── coin3.png
        ├── coin4.png
        ├── coin5.png
        ├── coin6.png
        ├── coin7.png
        ├── coin8.png
        ├── coin9.png
        ├── coin10.png
        ├── coin11.png
        └── coin12.png
```

## Explicación del código

### Métodos principales

| Método | Función |	Descripción |
|--------|---------|--------------|
| preload() |	Carga de assets |	Carga imágenes del personaje y monedas |
| create() |	Inicialización	| Crea animaciones, objetos y controles |
| update() |	Bucle principal |	Maneja movimiento y colisiones |
| _createAnimations() |	Animaciones |	Define animaciones de caminar y girar |
| _createGameObjects() |	Objetos |	Crea jugador, moneda y puntuación |
| _setupControls() |	Controles |	Configura teclas de flecha |
| _handlePlayerMovement() |	Movimiento |	Controla el movimiento del jugador |
| _handleCollisions() |	Colisiones |	Detecta colisiones con la moneda |
| _collectCoin() |	Recolección |	Maneja la recolección de monedas |

### Eventos soportados
| Evento |	Función |	Descripción |
| keydown |	_handlePlayerMovement |	Movimiento con flechas |
| update |	_handleCollisions	| Detección de colisiones |

### Conceptos clave aplicados
| Concepto |	Implementación |
| Sprites animados |	this.anims.create() y anims.play() |
| Física Arcade |	this.physics.add.sprite() |
| Colisiones |	this.physics.overlap() |
| Tweens |	this.tweens.add() para efectos suaves |
| Texto en pantalla	| this.add.text() |
| Entrada de teclado	| this.input.keyboard.createCursorKeys() |
| Escenas	| Clase mainScene con métodos Phaser | 

## Cómo ejecutar localmente

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Opcional: Python o VS Code con Live Server

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/charmander-adventure.git
cd charmander-adventure

# 2. Opción A: Con Python (recomendado)
python -m http.server 8888
# Abre http://localhost:8888 en tu navegador

# 3. Opción B: Con Live Server (VS Code)
# Instala la extensión Live Server
# Haz clic derecho en index.html → "Open with Live Server"

```

## Próximas mejoras
- Niveles de dificultad - Velocidad progresiva según puntuación
- Sonidos - Efectos al recolectar monedas
- Más personajes - Selector de Pokémon
- Power-ups - Objetos especiales con efectos
- High score - Guardar puntuación máxima en localStorage
- Controles táctiles - Para dispositivos móviles
- Generación de niveles - Diferentes mapas

## Créditos
| Recurso |	Fuente |
|---------|--------|
| Tutorial base|	Lessmilk Phaser Tutorial |
| Framework |	Phaser 3 |
| Sprites de Charmander |	Creacion propia |
| Sprites de moneda |	creacion propia |

## Autor
Humberto Isaac Padilla Contreras
- GitHub: <a href="https://github.com/LovecraftianCode">@LovecraftianCode<a/>
- LinkedIn: <a href="https://www.linkedin.com/in/humberto-isaac-padilla-contreras-3527aa3b7" target="_blank">Humberto Isaac Padilla Contreras </a>
- Inspirado en el tutorial de Lessmilk
