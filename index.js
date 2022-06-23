
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
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity
    } else {
        this.velocity.y = 0;
    }
        
    }
}

const player = new Player()

player.update();  

function animate () {
    requestAnimationFrame (animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate();


window.addEventListener('keydown', ({key}) => {
    console.log(key)
    
});