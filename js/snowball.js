/**
 * @Author: John Isaacs <john>
 * @Date:   17-Dec-162016
 * @Filename: snowball.js
* @Last modified by:   john
* @Last modified time: 18-Dec-162016
 */
function Snowball(x, y) {

    this.speed = (10 * Math.random(1)) + 1;
    this.radius = (10 * Math.random(1)) + 1;
    this.stopped = false;
    this.melting = false;
    this.meltTime = 200;
    this.melted = false;
    this.circle = createCircle(x, y, this.radius);
    this.circle.cache();



}

Snowball.prototype.getCircle = function() {
    return this.circle;
};
Snowball.prototype.getCollider = function() {
    return this.collider;
};
Snowball.prototype.isMelted = function() {
    return this.melted;
};
Snowball.prototype.checkCollision = function(snowballs) {
    //var response = new SAT.Response();
    this.stopped = false;
    if (this.melting) {

    } else {
        for (var i = 0; i < snowballs.length; i++) {
            if (snowballs[i]) {
                if (snowballs[i].melting || snowballs[i].stopped) {
                    if (snowballs[i].getCircle().getY() > this.getCircle().getY()) {
                        //if(snowballs[i].melting || snowballs[i].stopped){
                        var c1 = new SAT.Circle(new SAT.Vector(this.getCircle().getX(), this.getCircle().getY()), this.radius);
                        var c2 = new SAT.Circle(new SAT.Vector(snowballs[i].getCircle().getX(), snowballs[i].getCircle().getY()), snowballs[i].radius);
                        var collided = SAT.testCircleCircle(c1, c2);
                        if (collided) {

                            this.stopped = true;

                            if (snowballs[i].getCircle().getX() > this.getCircle().getX()) {
                                this.getCircle().setX(this.getCircle().getX() - 2);
                            }
                            if (snowballs[i].getCircle().getX() < this.getCircle().getX()) {
                                this.getCircle().setX(this.getCircle().getX() + 2);
                            }

                        }
                        //}
                        c1 = null;
                        c2 = null;
                        collided = null;

                    }
                }
            }
        }
    }


};

function doCheck(snowballs) {
    return new Promise(resolve => {

    });
}
Snowball.prototype.fall = function(worldHeight) {
    if (this.melting) {
        //console.log(this.melted+":"+this.meltTime);
        this.meltTime--;
        if (this.meltTime < 0) {
            this.melted = true;
        }
    } else if (!this.stopped) {
      var dir = Math.random(1);
      if(dir<=0.33){
        this.getCircle().setX(this.getCircle().getX() - 1);
      }
      else if(dir<=0.66){
        this.getCircle().setX(this.getCircle().getX() + 1);
      }
      else{

      }
      if (this.circle.getY() + this.radius < worldHeight - 2) {
          this.circle.setY(this.circle.getY() + (1 * this.speed));
      } else {
          this.melting = true;
      }
    } else {

    }
};

function createCircle(x, y, radius) {
    var circle = new Konva.Circle({
        x: x,
        y: y,
        radius: radius,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 0
    });
    return circle;
}
