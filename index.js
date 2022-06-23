
// Chama a canvas de index.html
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


const gravity = 1.5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Cria a class Jogador
class Player {
    constructor() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30 
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

// Atualizar a poiscao do jogador 
    update () {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity
    } else {
        this.velocity.y = 0;
    }
        
    }
}

const player = new Player()
const keys = {
    right: {
        pressed : false
    },
    left: {
        pressed : false
    }
}

function animate () {
    requestAnimationFrame (animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()


if(keys.right.pressed) {
    player.velocity.x = 5
}else if (keys.left.pressed){
    player.velocity.x = -5  
}else {
    player.velocity.x = 0
}

}
animate();


window.addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            console.log('esquerda')
            keys.left.pressed = true
            break
        case 'ArrowRight':
            keys.right.pressed = true
            console.log(keys.right.pressed)
            break
        case 'ArrowUp':
            console.log('salto')
            player.velocity.y -= 20
            break
        case 'ArrowDown':
            console.log('baixo')
            break  
    }
});
window.addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            console.log('esquerda')
            keys.left.pressed = false
            break
        case 'ArrowRight':
            console.log('direita')
            keys.right.pressed = false
            console.log(keys.right.pressed)
            break
        case 'ArrowUp':
            console.log('salto')
            break
        case 'ArrowDown':
            console.log('baixo')
            break  
    }
});          