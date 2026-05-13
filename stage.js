let curtainOpen = 0;

const COLORS = {
  gold: [255, 215, 0]
};

function setup() {
  createCanvas(1000, 700);
  angleMode(RADIANS);
}

function draw() {

  background(0);

  curtainOpen = min(curtainOpen + 0.003, 1);

  drawStage();

  drawCurtains();
}

function drawStage(){

  let g = drawingContext.createLinearGradient(
    0,
    0,
    0,
    height
  );

  g.addColorStop(0,"#1a0033");
  g.addColorStop(1,"#4d1a33");

  drawingContext.fillStyle = g;

  noStroke();
  rect(0,0,width,height*0.65);

  fill(80,40,20);

  rect(0,height*0.65,width,height*0.35);

  stroke(120,70,40,60);

  for(let y=height*0.65;y<height;y+=18){

    line(0,y,width,y);
  }

  push();

  translate(width/2,height*0.35);

  fill(40,20,10);

  arc(0,0,320,260,PI,TWO_PI);

  rect(-160,0,320,120);

  stroke(...COLORS.gold);

  strokeWeight(4);

  noFill();

  arc(0,0,280,220,PI,TWO_PI);

  pop();

  drawPillar(width*0.2);

  drawPillar(width*0.8);

  drawMandala(
    width/2,
    height*0.74,
    80
  );
}

function drawPillar(x){

  noStroke();

  fill(60,30,15);

  rect(x-35,height*0.3,70,250);

  fill(...COLORS.gold);

  rect(x-45,height*0.28,90,20);

  rect(x-45,height*0.67,90,20);
}

function drawMandala(x,y,size){

  push();

  translate(x,y);

  noFill();

  stroke(
    COLORS.gold[0],
    COLORS.gold[1],
    COLORS.gold[2],
    100
  );

  strokeWeight(2);

  for(let r=size;r>10;r-=15){

    ellipse(0,0,r*2);
  }

  for(let i=0;i<12;i++){

    rotate(TWO_PI/12);

    line(0,0,size,0);
  }

  fill(...COLORS.gold);

  noStroke();

  ellipse(0,0,15);

  pop();
}

function drawCurtains(){

  let leftX = map(
    curtainOpen,
    0,
    1,
    0,
    -width*0.35
  );

  let rightX = map(
    curtainOpen,
    0,
    1,
    0,
    width*0.35
  );

  noStroke();

  push();

  translate(leftX,0);

  fill(140,0,20);

  rect(0,0,width/2,height);

  drawCurtainFolds(0,width/2);

  pop();

  push();

  translate(rightX,0);

  fill(140,0,20);

  rect(width/2,0,width/2,height);

  drawCurtainFolds(width/2,width);

  pop();
}

function drawCurtainFolds(startX,endX){

  stroke(255,215,0,80);

  strokeWeight(2);

  for(let x=startX;x<endX;x+=30){

    line(
      x,
      0,
      x + sin(frameCount*0.02 + x)*20,
      height
    );
  }
}