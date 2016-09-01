var X;
var Y;
var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    var newX = this.x + dt * this.speed;
    if(newX < 600)
      this.x = newX;
    else this.x = -100;
    var dx = X - this.x;
    var dy = Y - this.y;
    var dis = Math.sqrt(dx*dx+dy*dy);
    if(dis < 50)
      reset();
};
Enemy.prototype.set = function(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
}
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(){

};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(dir){
    switch (dir) {
      case 'left': if(this.x>60) this.x = this.x - 101;break;
      case 'down':if(this.y<350) this.y = this.y + 83;break;
      case 'right':if(this.x<400) this.x = this.x + 101;break;
      case 'up':
                if(this.y>100)
                  this.y = this.y - 83;
                else if(this.y>50)
                  reset();
                break;
      default:this.x = this.x; this.y = this.y;break;
    }
    X = this.x;
    Y = this.y;
}

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
    player = new Player(300,390);
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
