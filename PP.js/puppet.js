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
}