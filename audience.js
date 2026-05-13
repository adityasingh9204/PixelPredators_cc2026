let audience = [];

function setup(){

  createCanvas(1000,700);

  createAudience();
}

function draw(){

  background(15,10,30);

  drawAudience();
}

function createAudience(){

  audience=[];

  for(let row=0;row<5;row++){

    for(let i=0;i<14;i++){

      audience.push({

        x:map(
          i,
          0,
          13,
          width*0.15,
          width*0.85
        ),

        y:height*0.76 + row*30,

        size:map(row,0,4,28,18),

        sway:random(TWO_PI)
      });
    }
  }
}

function drawAudience(){

  for(let person of audience){

    person.sway += 0.02;

    push();

    translate(
      person.x + sin(person.sway)*2,
      person.y
    );

    fill(255,255,255,220);;

    noStroke();

    // head
    ellipse(
      0,
      -person.size*0.7,
      person.size*0.6
    );

    // body
    ellipse(
      0,
      0,
      person.size
    );

    pop();
  }
}