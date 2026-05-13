let phase = "INTRO";
let curtainOpen = 0;

let particles = [];
let confetti = [];
let audience = [];
let lanterns = [];

let malePuppet;
let femalePuppet;

let performanceTimer = 0;
let finaleStarted = false;

const COLORS = {
  red:[180,30,40],
  gold:[255,210,70],
  orange:[255,140,0],
  pink:[255,80,150],
  blue:[30,40,120],
  dark:[20,10,30],
  brown:[90,50,20]
};

function setup(){

  createCanvas(windowWidth,windowHeight);

  malePuppet = new Puppet(
    width*0.42,
    height*0.57,
    "male"
  );

  femalePuppet = new Puppet(
    width*0.58,
    height*0.57,
    "female"
  );

  createAudience();
  createLanterns();
  createParticles();
}

function draw(){

  background(10,5,20);

  performanceTimer += deltaTime;

  updatePhase();

  drawStars();
  drawBackgroundGlow();

  drawStage();

  drawCurtains();

  drawLanterns();

  drawAudience();

  updateParticles();

  malePuppet.update();
  femalePuppet.update();

  malePuppet.display();
  femalePuppet.display();

  drawParticles();

  updateConfetti();
  drawConfetti();

  drawTitle();
}

function updatePhase(){

  if(phase==="INTRO"){

    curtainOpen = lerp(curtainOpen,0,0.03);

    if(performanceTimer>4000){
      phase="OPENING";
    }
  }

  else if(phase==="OPENING"){

    curtainOpen = lerp(curtainOpen,1,0.02);

    if(curtainOpen>0.95){
      phase="PERFORMANCE";
    }
  }

  else if(phase==="PERFORMANCE"){

    if(performanceTimer>25000 && !finaleStarted){
      startFinale();
    }
  }
}

function mousePressed(){

  for(let i=0;i<25;i++){

    confetti.push({

      x:mouseX,
      y:mouseY,

      vx:random(-4,4),
      vy:random(-8,-2),

      size:random(4,9),

      rot:random(TWO_PI),

      rotSpeed:random(-0.2,0.2),

      color:random([
        COLORS.gold,
        COLORS.orange,
        COLORS.pink
      ])
    });
  }
}

function keyPressed(){

  if(key===' '){

    phase="PERFORMANCE";
    curtainOpen=1;
  }

  if(key==='r' || key==='R'){

    performanceTimer=0;

    phase="INTRO";

    curtainOpen=0;

    confetti=[];

    finaleStarted=false;
  }
}

function windowResized(){

  resizeCanvas(windowWidth,windowHeight);

  createAudience();

  lanterns=[];

  createLanterns();
}