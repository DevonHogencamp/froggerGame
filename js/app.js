var wins = 0;
var fails = -1;
var level = 1;
var speed = 75;
// Draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset player to beginning position
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 400;

  fails++;
  document.getElementById('fail').innerHTML = "Fails: " + fails;
};

/*
    Enemy Objects
*/

// Enemies the player must avoid
var Enemy = function(x,y) {

    // The image/sprite for enemies
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * speed) + 20);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
    if(this.x <= 900){
        this.x += this.speed * dt;
    }else{
        this.x = -(Math.floor((Math.random() * 400) + 50));
        this.speed = Math.floor((Math.random() * speed) + 20);
    }

    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
};

/*
    Gem Object
*/

var Gem = function (x , y) {
    this.sprite = 'images/gemBlue.png';
    this.x = x;
    this.y = y;
};

/*
    Player Object
*/

// Player class and initial x and y coordinates
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

//Update player position
Player.prototype.update = function(){
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 15;
    //if right key is pressed and player is not on edge of map increment x
}else if(this.ctlKey === 'right' && this.x < 815){
        this.x = this.x + 15;
    //if up key is pressed increment y
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 15;
    //if down key is pressed and player is not on edge of map decrement y
    }else if (this.ctlKey === 'down' && this.y < 500){
        this.y = this.y + 15;
    }
    this.ctlKey = null;

    //If on water, reset
    if(this.y < 25){
        player.x = 200;
        player.y = 400;
        wins++;
        level++;
        speed = speed + 10;
        document.getElementById('level').innerHTML = "Level: " + level;
        document.getElementById('win').innerHTML = "Wins: " + wins;

        var rand = Math.ceil(Math.random() * 4);

        if (rand == 1) {
            allEnemies.push(new Enemy(-50, 50));
        }
        else if (rand == 2) {
            allEnemies.push(new Enemy(-150,140));
        }
        else if (rand == 3) {
            allEnemies.push(new Enemy(-100,225));
        }
        else {
            allEnemies.push(new Enemy(-250,310));
        }
    }
};


//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};


// Instantiate enemies and player objects
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-50, 50));
    allEnemies.push(new Enemy(-150,140));
    allEnemies.push(new Enemy(-100,225));
    allEnemies.push(new Enemy(-250,310));
}());

var player = new Player();
var gem = new Gem(200, 300);


// listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
