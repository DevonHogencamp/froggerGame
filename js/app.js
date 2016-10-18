// Enemies our player must avoid
// Parameter: X and Y initial Location w/ speed
var Enemy = function(x, y, speed) {
    // Vars for our enemy

    // X and Y cords of the enemy
    this.x = x;
    this.y = y;

    // Location is an array of the x and y
    this.location = [this.x, this.y];

    // Sprite Image of the enemy
    this.sprite = 'images/enemy-bug.png';

    // Initial Location
    this.initialLocation = [x, y];

    // Enemy speed
    this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // There has been a collision bettween the player and the enemy
    if (this.x == Player.x && this.y == Player.y) {
        Player.x = 3;
        Player.y = 1;
    }
    // The player has not hit the bug
    else {
        this.x += this.speed;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// The player the user controles
var Player = function (x, y) {
    // Vars for the Player

    // The x and y cords
    this.x = x;
    this.y = y;

    // An array of the x and y for location
    this.location = [this.x, this.y];

    // The sprite or image of the Player
    this.sprite = 'images/char-boy.png';

    // The player initial location
    this.initialLocation = [x, y];

    // The player speed
    this.speed = 2;
};

Player.prototype.update = function () {
    // After everything has updated re-render the player
    this.render();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    if (keyCode == 37) {
        // If they are on the very left side of the screen
        if (this.x == 1) {
            // Do nothing because we dont want them to move off the screen
        }
        // Allow them to move left
        else {
            // The player has moved left
            Player.x -- this.speed;

            // Update the player location after moving it with the keys
            this.update();
        }
    }
    if (keyCode == 38) {
        // The player is in the water we need to return them to the grass
        if (Player.y == 6) {
            this.x = 3;
            this.y = 1;
        }
        else {
            // The player has moved up
            Player.y ++;

            // Update the player location after moving it with the keys
            this.update();
        }
    }
    if (keyCode == 39) {
        // If player is on very right of the screen
        if (this.x == 5) {
            // Do nothing because we dont want them to move off the screen
        }
        else {
            // The player has moved right
            Player.x ++;

            // Update the player location after moving it with the keys
            this.update();
        }
    }
    if (keyCode == 40) {
        // The player has moved down
        Player.y --;

        // Update the player location after moving it with the keys
        this.update();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




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
