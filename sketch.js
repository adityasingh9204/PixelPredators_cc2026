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

// MUSIC
let bgMusic;

// MANUAL CONTROLS
let leftArmControl = 0;
let rightArmControl = 0;

// COLORS
const COLORS = {
  red: [180, 30, 40],
  gold: [255, 210, 70],
  orange: [255, 140, 0],
  pink: [255, 80, 150],
  blue: [30, 40, 120],
  dark: [20, 10, 30],
  brown: [90, 50, 20]
};

// ======================================================
// PRELOAD
// ======================================================

function preload() {

  soundFormats('mp3');

  bgMusic = loadSound('RJ folk.mp3');
}

// ======================================================
// SETUP
// ======================================================

function setup() {

  createCanvas(windowWidth, windowHeight);

  angleMode(RADIANS);

  malePuppet = new Puppet(
    width * 0.42,
    height * 0.57,
    "male"
  );

  femalePuppet = new Puppet(
    width * 0.58,
    height * 0.57,
    "female"
  );

  createAudience();
  createLanterns();
  createParticles();
}

// ======================================================
// DRAW LOOP
// ======================================================

function draw() {

  background(10, 5, 20);

  performanceTimer += deltaTime;

  updatePhase();

  drawStars();

  drawBackgroundGlow();

  push();

  drawStage();

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

  // CURTAINS DRAWN LAST
  drawCurtains();

  pop();

  drawTitle();
}

// ======================================================
// PERFORMANCE PHASES
// ======================================================

function updatePhase() {

  if (phase === "INTRO") {

    curtainOpen = lerp(curtainOpen, 0, 0.03);

    if (performanceTimer > 4000) {

      phase = "OPENING";
    }
  }

  else if (phase === "OPENING") {

    curtainOpen = lerp(curtainOpen, 1, 0.02);

    if (curtainOpen > 0.95) {

      phase = "PERFORMANCE";
    }
  }

  else if (phase === "PERFORMANCE") {

    if (
      performanceTimer > 25000 &&
      !finaleStarted
    ) {

      startFinale();
    }
  }
}

// ======================================================
// STAGE
// ======================================================

function drawStage() {

  let g = drawingContext.createLinearGradient(
    0,
    0,
    0,
    height
  );

  g.addColorStop(0, "#1a0033");
  g.addColorStop(1, "#4d1a33");

  drawingContext.fillStyle = g;

  rect(0, 0, width, height * 0.65);

  // FLOOR
  fill(80, 40, 20);

  rect(
    0,
    height * 0.65,
    width,
    height * 0.35
  );

  // FLOOR LINES
  stroke(120, 70, 40, 60);

  for (
    let y = height * 0.65;
    y < height;
    y += 18
  ) {

    line(0, y, width, y);
  }

  // ARCH
  push();

  translate(width / 2, height * 0.35);

  fill(40, 20, 10);

  arc(0, 0, 320, 260, PI, TWO_PI);

  rect(-160, 0, 320, 120);

  stroke(COLORS.gold);

  strokeWeight(4);

  noFill();

  arc(0, 0, 280, 220, PI, TWO_PI);

  pop();

  drawPillar(width * 0.2);

  drawPillar(width * 0.8);

  drawMandala(
    width / 2,
    height * 0.74,
    80
  );
}

function drawPillar(x) {

  fill(60, 30, 15);

  rect(
    x - 35,
    height * 0.3,
    70,
    250
  );

  fill(COLORS.gold);

  rect(
    x - 45,
    height * 0.28,
    90,
    20
  );

  rect(
    x - 45,
    height * 0.67,
    90,
    20
  );
}

function drawMandala(x, y, size) {

  push();

  translate(x, y);

  noFill();

  stroke(
    COLORS.gold[0],
    COLORS.gold[1],
    COLORS.gold[2],
    100
  );

  for (
    let r = size;
    r > 10;
    r -= 15
  ) {

    ellipse(0, 0, r * 2);
  }

  for (let i = 0; i < 12; i++) {

    rotate(TWO_PI / 12);

    line(0, 0, size, 0);
  }

  fill(COLORS.gold);

  noStroke();

  ellipse(0, 0, 15);

  pop();
}

// ======================================================
// CURTAINS
// ======================================================

function drawCurtains() {

  let leftX = map(
    curtainOpen,
    0,
    1,
    0,
    -width * 0.52
  );

  let rightX = map(
    curtainOpen,
    0,
    1,
    0,
    width * 0.52
  );

  noStroke();

  // LEFT CURTAIN
  push();

  translate(leftX, 0);

  fill(140, 0, 20);

  rect(
    0,
    0,
    width / 2 + 40,
    height
  );

  drawCurtainFolds(
    0,
    width / 2 + 40
  );

  pop();

  // RIGHT CURTAIN
  push();

  translate(rightX, 0);

  fill(140, 0, 20);

  rect(
    width / 2 - 40,
    0,
    width / 2 + 40,
    height
  );

  drawCurtainFolds(
    width / 2 - 40,
    width
  );

  pop();

  // TOP BORDER
  fill(255, 210, 70);

  rect(0, 0, width, 25);
}

function drawCurtainFolds(startX, endX) {

  stroke(255, 215, 0, 80);

  for (
    let x = startX;
    x < endX;
    x += 30
  ) {

    line(
      x,
      0,
      x + sin(frameCount * 0.02 + x) * 20,
      height
    );
  }
}

// ======================================================
// PUPPET CLASS
// ======================================================

class Puppet {

  constructor(x, y, type) {

    this.x = x;
    this.y = y;

    this.type = type;

    this.swing = random(TWO_PI);

    this.armAngle = 0;
    this.legAngle = 0;

    this.skirtRotation = 0;

    this.leftArmManual = 0;
    this.rightArmManual = 0;
  }

  update() {

    if (phase !== "PERFORMANCE") return;

    this.swing += 0.05;

    this.armAngle = sin(this.swing) * 0.5;

    this.legAngle =
      sin(this.swing * 2) * 0.5;

    this.skirtRotation += 0.03;

    this.leftArmManual = leftArmControl;

    this.rightArmManual = rightArmControl;
  }

  display() {

    push();

    translate(
      this.x + sin(this.swing) * 10,
      this.y +
      abs(sin(this.swing * 2)) * 10
    );

    this.drawStrings();

    if (this.type === "male") {

      this.drawMale();

    } else {

      this.drawFemale();
    }

    pop();
  }

  drawStrings() {

    stroke(180, 180, 180, 100);

    line(0, -150, 0, -70);

    line(-30, -140, -25, -40);

    line(30, -140, 25, -40);
  }

  drawMale() {

    this.drawLeg(-12);

    this.drawLeg(12);

    fill(200, 40, 40);

    stroke(COLORS.gold);

    strokeWeight(2);

    rect(-25, -80, 50, 80, 10);

    fill(COLORS.gold);

    noStroke();

    for (let i = 0; i < 4; i++) {

      ellipse(0, -65 + i * 18, 6);
    }

    // ARMS
    this.drawArm(
      -25,
      this.armAngle +
      this.leftArmManual
    );

    this.drawArm(
      25,
      -this.armAngle +
      this.rightArmManual
    );

    // HEAD
    fill(220, 180, 140);

    ellipse(0, -110, 40, 50);

    // TURBAN
    fill(255, 120, 40);

    arc(
      0,
      -120,
      55,
      40,
      PI,
      TWO_PI
    );

    fill(COLORS.gold);

    ellipse(0, -120, 10);

    // EYES
    fill(255);

    ellipse(-8, -112, 8);

    ellipse(8, -112, 8);

    fill(0);

    ellipse(-8, -112, 4);

    ellipse(8, -112, 4);

    // MUSTACHE
    stroke(0);

    strokeWeight(3);

    noFill();

    arc(
      -8,
      -100,
      15,
      10,
      0,
      PI
    );

    arc(
      8,
      -100,
      15,
      10,
      0,
      PI
    );
  }

  drawFemale() {

    push();

    translate(0, -10);

    rotate(this.skirtRotation);

    fill(255, 80, 140);

    stroke(COLORS.gold);

    beginShape();

    for (
      let a = 0;
      a < TWO_PI;
      a += 0.3
    ) {

      let r =
        55 +
        sin(a * 6 +
        frameCount * 0.05) * 5;

      vertex(
        cos(a) * r,
        sin(a) * r
      );
    }

    endShape(CLOSE);

    pop();

    fill(255, 80, 140);

    rect(-20, -90, 40, 50, 10);

    // ARMS
    this.drawArm(
      -20,
      this.armAngle -
      0.5 +
      this.leftArmManual
    );

    this.drawArm(
      20,
      -this.armAngle -
      0.5 +
      this.rightArmManual
    );

    // HEAD
    fill(230, 190, 150);

    ellipse(0, -110, 38, 45);

    // HAIR
    fill(20);

    arc(
      0,
      -118,
      45,
      35,
      PI,
      TWO_PI
    );

    // EYES
    fill(255);

    ellipse(-7, -112, 8);

    ellipse(7, -112, 8);

    fill(0);

    ellipse(-7, -112, 4);

    ellipse(7, -112, 4);

    // BINDI
    fill(255, 0, 0);

    ellipse(0, -120, 5);

    // JEWELRY
    fill(COLORS.gold);

    ellipse(-18, -108, 6);

    ellipse(18, -108, 6);
  }

  drawArm(x, angle) {

    push();

    translate(x, -60);

    rotate(angle);

    stroke(230, 190, 150);

    strokeWeight(8);

    line(0, 0, 0, 40);

    pop();
  }

  drawLeg(x) {

    push();

    translate(x, 0);

    rotate(this.legAngle);

    stroke(180, 120, 80);

    strokeWeight(10);

    line(0, 0, 0, 40);

    pop();
  }
}

// ======================================================
// AUDIENCE
// ======================================================

function createAudience() {

  audience = [];

  for (let row = 0; row < 5; row++) {

    for (let i = 0; i < 14; i++) {

      audience.push({
        x: map(
          i,
          0,
          13,
          width * 0.15,
          width * 0.85
        ),

        y:
          height * 0.76 +
          row * 30,

        size: map(
          row,
          0,
          4,
          28,
          18
        ),

        sway: random(TWO_PI)
      });
    }
  }
}

function drawAudience() {

  for (let person of audience) {

    person.sway += 0.02;

    push();

    translate(
      person.x +
      sin(person.sway) * 2,
      person.y
    );

    fill(30, 20, 40);

    noStroke();

    ellipse(
      0,
      -person.size * 0.7,
      person.size * 0.6
    );

    ellipse(0, 0, person.size);

    pop();
  }
}

// ======================================================
// LANTERNS
// ======================================================

function createLanterns() {

  for (let i = 0; i < 6; i++) {

    lanterns.push({
      x: map(
        i,
        0,
        5,
        width * 0.15,
        width * 0.85
      ),

      y: height * 0.18,

      sway: random(TWO_PI)
    });
  }
}

function drawLanterns() {

  for (let l of lanterns) {

    l.sway += 0.02;

    let sx = sin(l.sway) * 10;

    push();

    translate(l.x + sx, l.y);

    stroke(120);

    line(0, -40, 0, 0);

    fill(180, 100, 40);

    rect(-15, 0, 30, 40, 5);

    fill(255, 200, 100, 120);

    ellipse(0, 20, 60);

    fill(255, 220, 150);

    ellipse(0, 20, 25);

    pop();
  }
}

// ======================================================
// PARTICLES
// ======================================================

function createParticles() {

  for (let i = 0; i < 25; i++) {

    particles.push({
      x: random(width),

      y: random(
        height * 0.2,
        height * 0.8
      ),

      size: random(2, 5),

      speed: random(0.2, 1)
    });
  }
}

function updateParticles() {

  for (let p of particles) {

    p.y -= p.speed;

    p.x +=
      sin(frameCount * 0.01 + p.y) * 0.3;

    if (p.y < 0) {

      p.y = height;

      p.x = random(width);
    }
  }
}

function drawParticles() {

  noStroke();

  for (let p of particles) {

    fill(255, 220, 100, 120);

    ellipse(p.x, p.y, p.size);
  }
}

// ======================================================
// CONFETTI
// ======================================================

function startFinale() {

  finaleStarted = true;

  for (let i = 0; i < 120; i++) {

    confetti.push({

      x: width / 2,

      y: height * 0.2,

      vx: random(-5, 5),

      vy: random(-10, -3),

      size: random(5, 10),

      rot: random(TWO_PI),

      rotSpeed: random(-0.1, 0.1),

      color: random([
        COLORS.gold,
        COLORS.orange,
        COLORS.pink
      ])
    });
  }
}

function updateConfetti() {

  for (let c of confetti) {

    c.vy += 0.2;

    c.x += c.vx;

    c.y += c.vy;

    c.rot += c.rotSpeed;
  }
}

function drawConfetti() {

  noStroke();

  for (let c of confetti) {

    push();

    translate(c.x, c.y);

    rotate(c.rot);

    fill(c.color);

    rect(
      0,
      0,
      c.size,
      c.size * 0.6
    );

    pop();
  }
}

// ======================================================
// BACKGROUND
// ======================================================

function drawStars() {

  for (let i = 0; i < 60; i++) {

    let x = (i * 137) % width;

    let y =
      (i * 91) %
      (height * 0.5);

    let glow =
      sin(frameCount * 0.02 + i) * 120;

    fill(
      255,
      255,
      255,
      glow
    );

    noStroke();

    ellipse(x, y, 2);
  }
}

function drawBackgroundGlow() {

  fill(255, 100, 50, 30);

  ellipse(
    width * 0.3,
    height * 0.25,
    300
  );

  fill(255, 0, 100, 20);

  ellipse(
    width * 0.7,
    height * 0.2,
    250
  );
}

// ======================================================
// TITLE
// ======================================================

function drawTitle() {

  fill(COLORS.gold);

  textAlign(CENTER);

  textSize(36);

  textStyle(BOLD);

  text(
    "ROYAL RAJASTHANI KATHPUTLI",
    width / 2,
    60
  );

  textSize(18);

  fill(255, 220, 120);

  text(
    "Traditional Puppet Theatre",
    width / 2,
    95
  );

  fill(255);

  textSize(14);

  text(
    "A = Left Arm | D = Right Arm | M = Music | SPACE = Skip",
    width / 2,
    height - 30
  );
}

// ======================================================
// INTERACTION
// ======================================================

function mousePressed() {

  // START MUSIC
  userStartAudio();

  if (!bgMusic.isPlaying()) {

    bgMusic.setVolume(0.45);

    bgMusic.loop();
  }

  // CONFETTI
  for (let i = 0; i < 25; i++) {

    confetti.push({

      x: mouseX,

      y: mouseY,

      vx: random(-4, 4),

      vy: random(-8, -2),

      size: random(4, 9),

      rot: random(TWO_PI),

      rotSpeed: random(-0.2, 0.2),

      color: random([
        COLORS.gold,
        COLORS.orange,
        COLORS.pink
      ])
    });
  }
}

function keyPressed() {

  // SPACE = skip intro
  if (key === ' ') {

    phase = "PERFORMANCE";

    curtainOpen = 1;
  }

  // LEFT ARM
  if (key === 'a' || key === 'A') {

    leftArmControl = -1.2;
  }

  // RIGHT ARM
  if (key === 'd' || key === 'D') {

    rightArmControl = 1.2;
  }

  // MUSIC
  if (key === 'm' || key === 'M') {

    if (bgMusic.isPlaying()) {

      bgMusic.pause();

    } else {

      bgMusic.loop();
    }
  }

  // RESET
  if (key === 'r' || key === 'R') {

    performanceTimer = 0;

    phase = "INTRO";

    curtainOpen = 0;

    confetti = [];

    finaleStarted = false;
  }
}

function keyReleased() {

  if (key === 'a' || key === 'A') {

    leftArmControl = 0;
  }

  if (key === 'd' || key === 'D') {

    rightArmControl = 0;
  }
}

// ======================================================
// RESIZE
// ======================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  createAudience();

  lanterns = [];

  createLanterns();
}