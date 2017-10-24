/* General instance of variable Enemy */
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/* Single Enemy start position and speed */
var enemy1 = new Enemy (0, 60, 150);
var enemy2 = new Enemy (0, 140, 70);
var enemy3 = new Enemy (0, 220, 200);

/* List of all available Enemies */
var allEnemies = [enemy1, enemy2, enemy3];

/* Prototype function to move Enemies;
   Parameter 'dt': a time delta between ticks*/
Enemy.prototype.update = function(dt) {
    /* Determines general speed of enemies. */
    this.x += this.speed*dt;
    /* Enemies to re-appear on left side after having
       wanished on right side */
    if (this.x > 500) {
      this.x = -150;
    }

};

/* Prototype function to draw Enemies on board */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* General instance of variable Player */
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.heigt = 50;
  this.sprite = "images/char-horn-girl.png";
};

/* Defines player start position */
var player = new Player (200, 300);

/* Prototype function to move Player back to start position,
   either upon reaching the water or having had a collision
   with an Enemy */
Player.prototype.update = function() {
  if (this.y < -11) {
    this.x = 200;
    this.y = 300;
  }
};

/* Prototype function to draw Player on board */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Prototype function to move Player on the board by
   using the arrow keys */
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

/* Prototype function to check if collision between
   Player and Enemy occured */
Player.prototype.checkCollisions = function () {
  for(var i = 0 ; i < 3 ; i++)
  {
  if ((this.x < allEnemies[i].x + 50) &&
      (this.x + 50 > allEnemies[i].x) &&
      (this.y < allEnemies[i].y + 50) &&
      (50 + this.y > allEnemies[i].y))
       {
        this.x = 200;
        this.y = 300;
       }
  }
};

/* General instance of variable Life */
var Life = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/Heart.png";
};

/* Single Life start position */
var life1 = new Life (20, 500);
var life2 = new Life (70, 500);
var life3 = new Life (120, 500);

/* List of all available lifes */
var allLifes = [life1, life2, life3];

/* Prototype function to show lifes on board */
Life.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* TODO: Prototype function to remove lifes upon collision */
Life.prototype.update = function(count) {
  var count = 3;
  if (Player.checkCollisions === true) {
    count -= 1;
  }

};

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
