// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.reset();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    this.y = this.row * 83;
    if (this.x > 6 * 83) { // only 6 columns in the game
      this.reset();
    }

    const collisionRad = 30;
    // handles collisions
    // if the player's x & y coordiantes are within the collision radius
    // send player back to the beginning
    if ((player.x > this.x - collisionRad && player.x < this.x - collisionRad + this.width) &&
    (player.y > this.y - collisionRad && player.y < this.y - collisionRad + this.height)) {
      player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.col = -1; // enemies always come from left of screen
  this.row = setRandomInt(1,4);
  // initial postion and random speed
  this.x = this.col * 101;
  this.y = this.row * 83;
  this.speed = setRandomInt(100,400);
  // size of bugs for collisions
  this.width = 100;
	this.height = 75;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.reset();

  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if (this.playable) {
    this.x = this.col * 101;
    this.y = this.row * 83;
  }

  if (this.playable && this.y < 83) {
    this.playable = false;
    return true;
  }
  return false;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.col = setRandomInt(0,4);
  this.row = 5; // always start at the bottom
  this.playable = true;
};

Player.prototype.handleInput = function(input) {
  switch (input) {
    case 'left':
      this.col--;
      break;
    case 'right':
      this.col++;
      break;
    case 'up':
      this.row--;
      break;
    case 'down':
      this.row++;
      break;
  }

    if(this.col < 0) this.col = 0;
    if(this.col > 4) this.col = 4;
    if(this.row < 0) this.row = 0;
    if(this.row > 5) this.row = 5;
};

// Function for setting random integers
// will be used to pick initial positions for enemies and player
// and set initial speeds for enemies
function setRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (let i = 0; i < 6; i++) {
  allEnemies.push(new Enemy());
}


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
