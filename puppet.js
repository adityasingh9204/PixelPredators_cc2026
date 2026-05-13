let puppet;

let phase = "PERFORMANCE";

function setup(){

  createCanvas(900,600);

  angleMode(RADIANS);

  puppet = new Puppet(
    width/2,
    height/2,
    "female"
  );
}

function draw(){

  background(20);

  puppet.update();

  puppet.display();
}

class Puppet{

  constructor(x,y,type){

    this.x=x;
    this.y=y;

    this.type=type;

    this.swing=random(TWO_PI);

    this.armAngle=0;

    this.legAngle=0;

    this.skirtRotation=0;
  }

  update(){

    if(phase!=="PERFORMANCE") return;

    this.swing += 0.05;

    this.armAngle = sin(this.swing)*0.8;

    this.legAngle = sin(this.swing*2)*0.5;

    this.skirtRotation += 0.03;
  }

  display(){

    push();

    translate(
      this.x + sin(this.swing)*10,
      this.y + abs(sin(this.swing*2))*10
    );

    this.drawStrings();

    if(this.type==="male"){
      this.drawMale();
    }
    else{
      this.drawFemale();
    }

    pop();
  }

  drawStrings(){

    stroke(255);

    line(0,-180,-40,-80);

    line(0,-180,40,-80);

    line(0,-180,0,50);
  }

  drawMale(){

    noStroke();

    // head
    fill(240,200,160);
    ellipse(0,-80,60);

    // body
    fill(180,50,50);
    rectMode(CENTER);
    rect(0,0,70,120,20);

    // arms
    push();
    translate(-35,-20);
    rotate(this.armAngle);
    rect(0,40,15,80,10);
    pop();

    push();
    translate(35,-20);
    rotate(-this.armAngle);
    rect(0,40,15,80,10);
    pop();

    // legs
    push();
    translate(-15,70);
    rotate(this.legAngle);
    rect(0,40,15,80,10);
    pop();

    push();
    translate(15,70);
    rotate(-this.legAngle);
    rect(0,40,15,80,10);
    pop();
  }

  drawFemale(){

    noStroke();

    // head
    fill(240,200,160);
    ellipse(0,-80,60);

    // skirt
    push();

    rotate(
      sin(this.skirtRotation)*0.1
    );

    fill(255,0,120);

    triangle(
      -70,80,
      70,80,
      0,-10
    );

    pop();

    // torso
    fill(200,40,80);
    rectMode(CENTER);
    rect(0,0,50,80,20);

    // arms
    push();
    translate(-30,-20);
    rotate(this.armAngle);
    rect(0,40,12,80,10);
    pop();

    push();
    translate(30,-20);
    rotate(-this.armAngle);
    rect(0,40,12,80,10);
    pop();

    // legs
    push();
    translate(-15,70);
    rotate(this.legAngle);
    rect(0,40,12,70,10);
    pop();

    push();
    translate(15,70);
    rotate(-this.legAngle);
    rect(0,40,12,70,10);
    pop();
  }
}
