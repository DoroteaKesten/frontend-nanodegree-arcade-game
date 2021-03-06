// Enemies our player must avoid

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        // Enemy reapperas on canvas after exiting it
        if (this.x > 505) {
            this.x = -100;
        }

        this.collision();
    }

    // Check checkCollision
    collision() {
        if (this.x <= player.x + 90 &&
            this.x + 90 >= player.x &&
            player.y <= this.y + 60 &&
            player.y + 60 >= this.y) {
            player.resetPosition();
            console.log("Ouch!");
        };
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // The image/sprite for our player
        this.sprite = 'images/char-princess-girl.png';
    }
    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {


    }

    resetPosition() {setTimeout(() => {
            this.x = 200;
            this.y = 400;
        }, 200);
    }

    handleInput(key) {
        //Move right
        if(key === "right" && this.x < 303) {
            this.x += 101;
        };
        //Move left
        if(key === "left" && this.x > 0) {
            this.x -= 101;
        };
        //Move up
        if(key === "up" && this.y > 0) {
            this.y -= 82;
        };
        //Move down
        if(key === "down" && this.y < 400) {
            this.y += 82;
        };
        //When player reaches water
        if(this.y < 40) {
            this.resetPosition();
            setTimeout(() => {
                alert("Good job! You've reached the water.");
            }, 100);
        };
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [new Enemy(0, 60, 95), new Enemy(-100, 143, 130), new Enemy(-50, 227, 125),
                    new Enemy(-300, 60, 75), new Enemy(-200, 143, 110), new Enemy(-250, 227, 90)];

const player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
