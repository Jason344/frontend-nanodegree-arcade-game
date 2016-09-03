var X;
var Y;
var score = 0;
//The character is the superclass of enemy and player
var Character = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};
Character.prototype.set = function(x,y){
  this.x = x;
  this.y = y;
};
//The class contain some properte of bugs.
var Enemy = function(x,y,speed) {
    Character.call(this,x,y,'images/enemy-bug.png');
    this.speed = speed;
};
//The function update change the enemy's position
//and check if player have collision with bugs
Enemy.prototype.update = function(dt) {
    var newX = this.x + dt * this.speed;
    if(newX < 600)
      this.x = newX;
    else this.x = -100;
    var dx = X - this.x;
    var dy = Y - this.y;
    var dis = Math.sqrt(dx*dx+dy*dy);
    if(dis < 50)
    {
      reset();
      if(score >= 5)
        score = score - 5;
      else score = 0;
    }
};
//The function set set the position and speed for bugs.
Enemy.prototype.set = function(x,y,speed){
    Character.prototype.set.call(this,x,y);
    this.speed = speed;
};
//The function render draw bugs
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y){

    this.roles = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    this.index = 0;
    this.flag = false;
    Character.call(this,x,y,this.roles[this.index]);
};
Player.prototype.update = function(){

};
//The function render draw bugs
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "48px serif";
    ctx.strokeText(score.toString(), 440, 115);
};
//The function set set the position and speed for player.
Player.prototype.set = function(x,y){
  Character.call(this,x,y);
  this.flag = false;
  X = x;
  Y = y;
};
//The function handleInput deal with keyboard input
Player.prototype.handleInput = function(key){
  var TILE_WIDTH = 101,
      TILE_HEIGHT = 83;
    switch (key) {
      case 'left': if(this.flag && this.x>60) this.x = this.x - TILE_WIDTH;break;
      case 'down':if(this.flag && this.y<350) this.y = this.y + TILE_HEIGHT;break;
      case 'right':if(this.flag && this.x<400) this.x = this.x + TILE_WIDTH;break;
      case 'up':
                if(this.flag && this.y>100)
                  this.y = this.y - TILE_HEIGHT;
                else if(this.flag && this.y>50){
                  score = score + 10;
                  reset();
                }
                break;
      case 'space' :
                if(!this.flag){
                  var newIndex = (this.index+1) % 5;
                  this.sprite = this.roles[newIndex];
                  this.index = newIndex;
                }
                break;
      case 'enter' :
                this.flag = true;
                break;
      default:this.x = this.x; this.y = this.y;break;
    }
    X = this.x;
    Y = this.y;
};

var allEnemies = [];
var enemy0 = new Enemy(0,65,212);
var enemy1 = new Enemy(-100,150,321);
var enemy2 = new Enemy(-200,220,489);
var enemy3 = new Enemy(-133,65,357);
var enemy4 = new Enemy(-113,150,132);
var enemy5 = new Enemy(-140,220,297);
allEnemies.push(enemy0,enemy1,enemy2,enemy3,enemy4,enemy5);
var player = new Player(300,390);
var reset = function(){
    enemy0.set(0,65,212);
    enemy1.set(-100,150,321);
    enemy2.set(-200,220,489);
    enemy3.set(-133,65,357);
    enemy4.set(-113,150,132);
    enemy5.set(-140,220,297);
    player.set(300,390);
};


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
