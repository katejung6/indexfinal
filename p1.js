var sad, happy, bone, startAt, ball, x;
var boneX, boneY, boneW, boneH;
var ballX, ballY, ballW, ballH;
var dragging = false;
var rollover = false; // Is the mouse over the ellipse?
let font, fontsize = 20;
var offsetX, offsetY;

var dogX = 20;
var dogY = 10;
var dogW, dogH;
var song;

var boneW, boneH;


function preload() {
  sad = loadImage("./image/sad.png");
  bone = loadImage("./image/bone.png");
  font = loadFont("./assets/OpenSans.ttf");
  happy = loadImage("./image/happy.png");
  ball = loadImage("./image/ball.png");
  song = loadSound("./assets/song.mp3", loaded);
}
  


function setup() {
  bg = loadImage('image/sleep.png');
  dogW = happy.width /2;
  dogH = happy.height /2;
  
  // Define variable font and uncomment 
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  createCanvas(windowWidth, windowHeight);



  startAt = millis();

  boneX = 400;
  boneY = 400;

  ballX = 500;
  ballY = 500;
  boneW = bone.width/2;
  boneH = bone.height/2;

  fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  // A rectangle
  rect(40, 120, 120, 40);
}

function loaded(){
  song.play();
  song.setVolume(0.5);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
 background('white'); 
 stroke(255, 0, 0);
 strokeWeight(10);

    
  if (mouseX > boneX && mouseX < boneX + boneW && mouseY > boneY && mouseY < boneY + boneH) {
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (dragging) {
    boneX = mouseX + offsetX;
    boneY = mouseY + offsetY;
  }



  if (mouseX > ballX && mouseX < ballX + ballW && mouseY > ballY && mouseY < ballY + ballH) {
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (dragging) {
    ballX = mouseX + offsetX;
    ballY = mouseY + offsetY;
  }

  const endAt = startAt + 10000;
  const maxWidth = width - 250;
  if (millis() < endAt) {
    image(happy, dogX, dogY, dogW, dogH);
    x = map(millis(), startAt, endAt, width, maxWidth);
  } else {
    image(sad, dogX, dogY, dogW, dogH); // Switch dog image  here after  timer.
  }

  line(x, 0, maxWidth, 0);
  image(bone, boneX, boneY, boneW, boneH);
  image(ball, ballX, ballY, ball.width / 2, ball.height / 2);

  checkCollision();
}


function drawWords(x) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position
  fill(0);
  text('ichi', 10, 80);

  fill(65);
  text('ni', 10, 150);

  fill(190);
  text('san', 10, 220);

  fill(255);
  text('shi', 10, 290);
}

function checkCollision(){
  return !(boneX > dogX + dogW ||
      boneX + boneW < dogX || 
      boneY > dogY + dogH ||
      boneY + boneH < dogY);
      console.log('test');
}

function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > boneX && mouseX < boneX + boneW && mouseY > boneY && mouseY < boneY + boneH) {
    dragging = true;
    offsetX = boneX - mouseX;
    offsetY = boneY - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}


