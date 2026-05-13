let lanterns = [];

function setup(){

  createCanvas(1000,700);

  rectMode(CENTER);

  createLanterns();
}

function draw(){

  background(15,10,30);

  drawLanterns();
}

function createLanterns(){

  lanterns = [];

  for(let i=0;i<6;i++){

    lanterns.push({

      x:map(
        i,
        0,
        5,
        width*0.15,
        width*0.85
      ),

      y:height*0.18,

      sway:random(TWO_PI)
    });
  }
}

function drawLanterns(){

  for(let l of lanterns){

    l.sway += 0.02;

    let sx = sin(l.sway)*10;

    push();

    translate(l.x+sx,l.y);

    // rope
    stroke(120);

    line(0,-40,0,0);

    // glow
    noStroke();

    drawingContext.shadowBlur = 40;
    drawingContext.shadowColor = "orange";

    fill(255,180,50,100);

    ellipse(0,20,80);

    // lantern body
    fill(180,100,40);

    rect(0,20,30,40,5);

    // inner light
    fill(255,230,150);

    ellipse(0,20,20);

    drawingContext.shadowBlur = 0;

    pop();
  }
}