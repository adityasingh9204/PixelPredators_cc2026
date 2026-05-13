function createLanterns(){

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

    stroke(120);

    line(0,-40,0,0);

    fill(180,100,40);

    rect(-15,0,30,40,5);

    fill(255,200,100,120);

    ellipse(0,20,60);

    fill(255,220,150);

    ellipse(0,20,25);

    pop();
  }
}