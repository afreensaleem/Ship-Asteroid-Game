let screenWidth = 600;
const screenHeight = 800;

let assets = {};

let ship;
//7
let asteroids; 
//14
let lasers;
function preload() {
  assets.ship = loadImage("assets/playerShip1_blue.png");
  //Ast 1 
  assets.bigAsteroid = loadImage("assets/asteroid_big1.png");
  //14
  assets.laser = loadImage("assets/laserBlue01.png");
  
  //11
  assets.sonicExplosion = loadAnimation(
    "assets/sonicExplosion00.png","assets/sonicExplosion08.png");
    
 assets.regularExplosion = loadAnimation(
  "assets/regularExplosion00.png","assets/regularExplosion08.png");

    }

function updateShip(){
  if(keyIsDown(KEY.RIGHT_ARROW)){
  ship.centerX += 10;
  }
  if(keyIsDown(KEY.LEFT_ARROW)){
  ship.centerX -= 10;
  }
if(ship.left<0){
  ship.left = 0;
}
if(ship.right > screenWidth){
  ship.right = screenWidth;
}
//8
 ship.overlap(asteroids, handleShipAsteroidCollision);


}
function setup() {
    createCanvas(screenWidth, screenHeight);
    ship = createSprite(assets.ship);
    ship.bottom = screenHeight - 20;
    ship.centerX = screenWidth / 2;
//10
ship.setCollider("circle");
//11 
ship.addAnimation("explosion",assets.sonicExplosion);

//7
  asteroids = createGroup();

  //15
 lasers = createGroup();
}

//16
function createLaser(){
  let laser = createSprite(assets.laser);
  lasers.add(laser);


  //17
  laser.bottom = ship.top;
  laser.centerX = ship.centerX;

  //18
  laser.setSpeed(20);
  laser.setDirection(270);
}

//19
function updateLasers(){
  if(keyWentDown(KEY.SPACE)){
    createLaser();
  }
 //20
  for(let laser of lasers){
  if(laser.bottom <0){
   laser.remove();
  }
  }

lasers.overlap(asteroids, handleLaserAsteroidCollision);
}

//Ast 2
function createAsteroid(){ 
  //Ast 3
  let asteroid = createSprite(assets.bigAsteroid);
 /*asteroid.top = 0;*/ //5
 /* asteroid.centerX = screenWidth / 2;*/ //5
 //5
 asteroid.centerX = random(0, screenWidth);
  //check 3 in terminal and Ast 4
  /*asteroid.setSpeed(5);*/ //6
  asteroid.setSpeed(random(1,10));
  /*asteroid.setDirection(90);*/ //6
  asteroid.setDirection(random(60,120));
  /*asteroid.rotationSpeed = 2; */ //6
  asteroid.rotationSpeed = random(-2 , 2);
  asteroid.setCollider("circle");
  asteroids.add(asteroid);
  asteroid.addAnimation("explosion",assets.regularExplosion);
}
//12
function shipFinishedExploding(){
  ship.changeAnimation("normal");
}
function asteroidFinishedExploding(animation){
let asteroid = animation.sprite;
asteroid.remove();
}


//21
function handleLaserAsteroidCollision(laser, asteroid){
laser.remove();
asteroid.changeAnimation("explosion");
/*asteroid.remove();*/
asteroid.animation.onComplete = asteroidFinishedExploding;
}


//8
/*function handleShipAsteroidCollision(){
  console.log("an asteroid is overllaping the ship");
}*/
//9
function handleShipAsteroidCollision(ship , asteroid){
  asteroid.remove();
  ship.changeAnimation("explosion");
  //13
  ship.animation.onComplete = shipFinishedExploding; 
}

function updateAsteroids(){
if(frameCount % 60 === 0 ){
  createAsteroid();
 }
 //8
for(let asteroid of asteroids ){
   if(asteroid.top >screenHeight){
     asteroid.remove();
   }
}

}
//7
function showSpriteCount(){
textSize(24);
fill("white");
text(`sprite count: ${allSprites.length}`,10, screenHeight - 10);
}

function draw() {
  background("black");
  updateShip();
  updateAsteroids();
  //19
  updateLasers();
  drawSprites();
//7
  showSpriteCount();
}
