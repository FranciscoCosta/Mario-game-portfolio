
// Chama a canvas de index.html
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const gravity = 1.5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cria a class Jogador
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Atualizar a poiscao do jogador
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

// Cria a class das plataformas
class Platform {
  constructor({x, y}) {
    this.position = {
      x: x,
      y: y
    };
    this.width = 500;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const platforms = [new Platform({
    x:0, y:1000

}), new Platform({
    x:500, y:1000
}), new Platform({
  x:700, y:600
}), new Platform({
  x:1200, y:800
}),
new Platform({
  x:1900, y:700
})];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};


let scrollOffset = 0

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw()
  })

  if (keys.right.pressed && player.position.x < 500) {
    player.velocity.x = 10;
  } else if (keys.left.pressed && player.position.x > 100 ) {
    player.velocity.x = -10;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += 10  
      platforms.forEach((platform) => {
        platform.position.x -= 10;
      })
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        scrollOffset -= 10
        platform.position.x += 10;
      })
    }
  }
  // Colisao de objectos

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width){
      player.velocity.y = 0;
    }
  });
  if (scrollOffset>5000) {
      console.log("Fim!")
  }
}

animate();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      console.log("esquerda");
      keys.left.pressed = true;
      break;
    case "ArrowRight":
      keys.right.pressed = true;
      console.log(keys.right.pressed);
      break;
    case "ArrowUp":
      console.log("salto");
      player.velocity.y -= 40;
      break;
    case "ArrowDown":
      console.log("baixo");
      break;
  }
});
window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      console.log("esquerda");
      keys.left.pressed = false;
      break;
    case "ArrowRight":
      console.log("direita");
      keys.right.pressed = false;
      console.log(keys.right.pressed);
      break;
    case "ArrowUp":
      console.log("salto");
      break;
    case "ArrowDown":
      console.log("baixo");
      break;
  }
});
