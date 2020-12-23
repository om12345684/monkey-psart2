
var monkey , monkey_running
var banana ,bananaImg, obstacle, obstacleImage,b
var FoodGroup, obstacleGroup
var score,survival_score
var PLAY,END,gameState

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(windowHeight,windowWidth)
  
  // monkey
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving_monkey",monkey_running)
  monkey.scale=0.1
  
  // ground
  ground=createSprite(400,350,90000,10)
  ground.velocityX=-6
  
  //ground:co-ordinates
  console.log(ground.x)
  
  //score
  score=0
  survival_score=0
    // group
  FoodGroup = createGroup()
  obstacleGroup = createGroup()
  
  //
  monkey.setCollider("circle",0,0,250);
  monkey.debug = false
  //
 
  
   
}



function draw() {
background("lightblue")
  
  
  //collide
  monkey.collide(ground)
  if(gameState===PLAY){
    console.log("hey",gameState)
    
  stroke("black")
  textSize(24)
  fill("black")
    //infinite ground
  if(ground.x<0){
    ground.x=ground.width/2
  } 
    // score
  score=Math.ceil(frameCount/frameRate())  
  
  // jump
  if(keyDown("space")&& monkey.y >= 210){
  monkey.velocityY=-12
  }
    
  // gravity
   monkey.velocityY=monkey.velocityY+0.8 
    
  //calling
  bananas()
  OBSTACLE()
    
    // dumb
   
  }else if(gameSate===END){
    if(obstacleGroup.isTouching(monkey)){
      
    console.log("hey i am done",gameState)
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
    monkey.veloctiyY=0
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1)
  }}

  
  if (FoodGroup.isTouching(monkey)){
  survival_score=survival_score+2
    FoodGroup.destroyEach()

  
  }
  
  
  
 
  
  drawSprites()
  text("Survival Time:"+score,185,75  )
  text("Score :"+survival_score,25,75)
    
}
function bananas(){
  if(World.frameCount%80===0){
    banana = createSprite(200,315,20,20)
    banana.y=Math.round(random(150,200))
    banana.scale=0.1
    banana.addImage(bananaImg)
    banana.velocityX=-4
    banana.lifetime=150
    FoodGroup.add(banana)
  }
}
function OBSTACLE(){
  if(World.frameCount%100===0){
    obstacle = createSprite(250,330,20,20)
    obstacle.x=Math.round(random(150,200))
    obstacle.scale=0.1
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-2
    obstacle.lifetime=150
    obstacleGroup.add(obstacle)
  }
}





