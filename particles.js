particlesss



let particles = [];

function setup(){

  createCanvas(900,600);

  createParticles();
}

function draw(){

  background(10,10,30);

  updateParticles();

  drawParticles();
}

function createParticles(){

  for(let i=0;i<25;i++){

    particles.push({

      x:random(width),

      y:random(height*0.2,height*0.8),

      size:random(2,5),

      speed:random(0.2,1)
    });
  }
}

function updateParticles(){

  for(let p of particles){

    p.y -= p.speed;

    p.x += sin(frameCount*0.01+p.y)*0.3;

    if(p.y < 0){

      p.y = height;

      p.x = random(width);
    }
  }
}

function drawParticles(){

  noStroke();

  for(let p of particles){

    fill(255,220,100,120);

    ellipse(
      p.x,
      p.y,
      p.size
    );
  }
}