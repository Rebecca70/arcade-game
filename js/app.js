// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = speed;
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
    /* Determines general speed of enemies. */
    this.x += this.speed*dt;
    /* Enemies to re-appear on left side after having
       wanished on right side */
    if (this.x > 500) {
      this.x = -150;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy (0, 60, 150);
var enemy2 = new Enemy (0, 140, 70);
var enemy3 = new Enemy (0, 220, 90);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.heigt = 50;
  this.sprite = "images/char-horn-girl.png";
};

Player.prototype.update = function() {
  if (this.y < -11) {
    this.x = 200;
    this.y = 300;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (movement) {
  if (movement === "left" && this.x >= 100) {
    this.x -= 100;
  }
  if (movement === "right" && this.x <= 350) {
    this.x += 100;
  }
  if (movement === "up" && this.y >= 55) {
    this.y -= 78;
  }
  if (movement === "down" && this.y <= 350) {
    this.y += 78;
  }
};

Player.prototype.checkCollisions = function () {
  if (this.x < Enemy.x + Enemy.width &&
      this.x + this.width > Enemy.x &&
      this.y < Enemy.y + Enemy.height &&
      this.height + this.y > Enemy.y) {
        this.x = 200;
        this.y = 300;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player (200, 300);




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
