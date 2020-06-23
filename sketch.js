var Play=1;
var End=0;
var gameState=Play;
var ground,invisibleGround;
var score=0;
var player;
var gameOver,restart;
var cloudsGroup,cloudImage;
var obstacleGroup,obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image,obstacle6Image;



function preload(){

  backgroundImage = loadImage("background.jpg");
  groundImage = loadImage("ground2.png");
  player_running = loadAnimation("multiple1.png","multiple2.png","multiple3.png","multiple4.png","multiple5.png","multiple6.png","multiple7.png","multiple8.png");
  endImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

  cloudImage = loadImage("cloud.png");

  obstacle1Image  = loadImage("obstacle1.jpg");
  obstacle2Image  = loadImage("obstacle2.jpg");
  obstacle3Image  = loadImage("obstacle3.jpg");
  obstacle4Image  = loadImage("obstacle4.jpg");
  obstacle5Image  = loadImage("obstacle5.jpg");
  obstacle6Image  = loadImage("obstacle6.jpg");

}
function setup(){
  createCanvas(1200,500);

  player = createSprite(200,470,30,30);
  player.addAnimation("running", player_running);
  player.scale=1.1;

  ground = createSprite(600,470,1200,500);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2
  ground.velocityX = -(6+3*score/100); 

  invisibleGround = createSprite(600,1500,1200,500);
  invisibleGround.visible= false;

var gameOver = createSprite(200,300);
var restart = createSprite(200,340);
gameOver.addImage("gameOver",endImage);
gameOver.scale = 0.5;
restart.addImage("restart",restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;


cloudsGroup = new Group();
obstaclesGroup= new Group();

textSize(30);
textFont("Georgia");
textStyle(BOLD);


}
function draw(){
  background(backgroundImage);
  console.log(player.y);
  text("SCORE = "+score,700,100);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 2*score/100);
    if(keyDown("UP_ARROW") && player.y>=395){
      player.velocityY= -15;
    }
    player.velocityY=player.velocityY+0.99;

    player.collide(ground);
    spawnClouds();
    spawnObstacles();
    

  drawSprites();
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(700,200,40,10);
    cloud.y = Math.round(random(100,200));
    cloud.addImage("cloud",cloudImage);
 
    cloud.velocityX = -3;
    
    cloud.lifetime = 210;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(900,600)),430,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
      case 3: obstacle.addImage(obstacle3Image);
              break;
      case 4: obstacle.addImage(obstacle4Image);
              break;   
      case 5: obstacle.addImage(obstacle5Image);
              break;
      case 6: obstacle.addImage(obstacle6Image);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}