var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var particle;
var turns = 0;
var count = 0;
var gameState = "PLAY"

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) { 
      plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }
}

function mousePressed() {
  if (gameState !== "END") {
    count++;
    particle = new Particle(mouseX, 0, 10, 10);
  }
}
 
function draw() {
  if (gameState === "PLAY") {
  background("black");
  Engine.update(engine);

  textSize(20)
  text("Score : " +score, 20, 30);
  //text("Turns : " +turns, 700, 30);
  text("300", 265, 480);
  text("300", 185, 480);
  text("100", 105, 480);
  text("100", 30, 480);
  text("500", 340, 480);
  text("500", 420, 480);
  text("400", 500, 480);
  text("400", 580, 480);
  text("200", 660, 480);
  text("200", 740, 480);


  ground.display();
 
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   if (particle != null) {
    particle.display();
    if (particle.body.position.y > 780) {
      if (particle.body.position.x >= 330 && particle.body.position.x <= 470) {
        score = score + 500;
      }
      if (particle.body.position.x >= 480 && particle.body.position.x <= 610) {
        score = score + 400;
      }
      if (particle.body.position.x >= 170 && particle.body.position.x <= 320) {
        score = score + 300;
      }
      if (particle.body.position.x >= 630 && particle.body.position.x <= 800) {
        score = score + 200;
      }
      if (particle.body.position.x >= 0 && particle.body.position.x <= 160) {
        score = score + 100;
      }
      particle = null;
      if (count >= 5){
       gameState = "END";
      }
    }
  }
    if (gameState === "END") {
      background("teal");

      textSize(50);
      text("GAME OVER", 250, 250);

      textSize(50);
      text("Score : " + score, 250, 370);
    }
  }
 }