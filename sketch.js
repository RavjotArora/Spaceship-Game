var space, spaceImg;
var playerShip, playershipImg;
var score=0;
var Gameover, GameoverImg;
var enemy, enemyImg1;
var enemyImg2, enemyImg3;
var enemyImg4, enemyImg5;
var enemyImg6, enemyImg7;
var enemyImg8, enemyImg9;
var bulletImg, enemybulletImg;
var explodeSound;
var shootSound;
var Gamestate = "play";


function preload(){
  spaceImg = loadImage("space2.png");
  playershipImg = loadImage("mainShip.png");
  enemyImg1 = loadImage("enemy1.png");
  enemyImg2 = loadImage("enemy2.png");
  enemyImg3 = loadImage("enemy3.png");
  enemyImg4 = loadImage("enemy4.png");
  enemyImg5 = loadImage("enemy5.png");
  enemyImg6 = loadImage("enemy6.png");
  enemyImg7 = loadImage("enemy7.png");
  enemyImg8 = loadImage("enemy8.png"); 
  bulletImg = loadImage("spacebullet.png");
  enemybulletImg = loadImage("enemybullet.png");
  GameoverImg = loadImage("gameOver.png");
  
  shootSound = loadSound("shooting.mp3");
  explodeSound = loadSound("playerexplosion.mp3");
  
}

function setup() {
  createCanvas(650, 700);
  
  space = createSprite(325,350,20,20);
  space.addImage(spaceImg);
  space.velocityY=(10 + 3*score/10);
  space.scale=5.5;
  
  playerShip = createSprite(325,600,20,20);
  playerShip.addImage(playershipImg);
  playerShip.scale=1.6;
  
  Gameover = createSprite(315,350,20,20);
  Gameover.addImage(GameoverImg);
  Gameover.scale=1;
  Gameover.visible=false;
  
  bulletG = new Group();
  enemybulletG = new Group();
  enemyG = new Group();
}

function draw() {
  background(220);
 
  drawSprites();
  
  if(Gamestate === "play"){
  createEnemy();
  
  if(keyDown("SPACE")){
   createBullet(); 
   shootSound.play();
     }
    
   playerShip.x = World.mouseX;
  
  if(space.y > 600 ){
    space.y = width/2;
  }
   
  if(bulletG.isTouching(enemyG)){
    explodeSound.play();
    
    score=score+5;
    
    enemyG.destroyEach();
    
    bulletG.destroyEach();
  }
  
  if(enemybulletG.isTouching(playerShip)||enemyG.isTouching(playerShip)){
    Gameover.visible=true;
    explodeSound.play();
    Gamestate = "end";
  }
 }
  
  if(Gamestate==="end"){
    textSize(20);
    fill(220);
    text(" Press Up Arrow to restart! ",195,430); 
    
    space.velocityY=0;
    
    
    enemyG.destroyEach();
    enemyG.setVelocityYEach(0);
    
    enemybulletG.destroyEach();
    enemybulletG.setVelocityYEach(0);
    
    playerShip.visible=false;
    
    if(keyDown("UP_ARROW")){
      reset();
      }
     
     }
  
  textSize(20);
  fill(255);
  text("Bounty: "+ score ,500,30);
  
}

function reset(){
    Gamestate= "play";
   
   Gameover.visible=false;
   
   enemyG.destroyEach();
   enemybulletG.destroyEach();
   
   space.velocityY = 10;
  
   score=0;
  
  playerShip.visible=true;
  
}

function createBullet() {
  var bullet= createSprite(playerShip.x, 600, 60, 10);
  bullet.addImage(bulletImg);
  bullet.x=playerShip.x;
  bullet.velocityY = (-15 + 3*score/10);
  bullet.lifetime = 200;
  bullet.scale = 0.8;
  bulletG.add(bullet);
   
}

function createEnemyBullet() {
  var enemybullet= createSprite(enemy.x, 50, 60, 10);
  enemybullet.addImage(enemybulletImg);
  enemybullet.x=enemy.x;
  enemybullet.velocityY = (18 + 3*score/10);
  enemybullet.lifetime = 200;
  enemybullet.scale = 0.8;
  enemybulletG.add(enemybullet);
   
}

function createEnemy(){
  if (frameCount % 120 == 0) {
  enemy = createSprite(Math.round(random(50, 600),40, 10, 10));
    
   var rand = Math.round(random(1,8)); 
   switch(rand) {
      case 1:enemy.addImage(enemyImg1);
             break;
      case 2:enemy.addImage(enemyImg2); 
             createEnemyBullet();
             shootSound.play();
             break;
      case 3:enemy.addImage(enemyImg3);   
             break;
      case 4:enemy.addImage(enemyImg4);
             createEnemyBullet();
             shootSound.play();
             break;
      case 5:enemy.addImage(enemyImg5);   
             break;
      case 6:enemy.addImage(enemyImg6);
             createEnemyBullet();
             shootSound.play();
             break;
      case 7:enemy.addImage(enemyImg7);   
             break;
      case 8:enemy.addImage(enemyImg8);
             createEnemyBullet();
             shootSound.play();
             break;
      default: break; 
   }
    
    enemy.velocityY=(12 + 3*score/10) ;
    enemy.scale=1.45;
    enemy.lifetime=200;
    enemyG.add(enemy);
    
  }
}