//declaring variables and gamestates
var PLAY = 1, END = 0, gameState = 1
var sword
var fruit1, fruit2, fruit3, fruit4
var enemy1, enemy2
var gameOver
var score
    
function preload(){
  //assigning images to variables
  swordImage = loadImage("sword.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  enemy1Image = loadImage("alien1.png")
  enemy2Image = loadImage("alien2.png")
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3")
  swordSound = loadSound("knifeSwooshSound.mp3")
}


function setup()
{
  //creating the sword
  sword = createSprite(40, 200, 20, 20);
  //adding the image
  sword.addImage(swordImage);
  sword.scale = 0.7
    
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage)
  gameOver.visible = false
  
  //creating groups for the fruits and enemies
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
}

function draw(){
  background("pink");
  
  //displaying score
  text("Score: "+ score, 500,50);
   
  //call fruits and enemy function
  fruits();
  createEnemy()
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  if(gameState === PLAY)
    { 
        sword.visible = true;
        if(sword.isTouching(fruitGroup))
      {
        fruitGroup.destroyEach();
        swordSound.play();
        score = score + 1;
      }
              if(sword.isTouching(enemyGroup))
      {
        gameState = END;
        enemyGroup.destroyEach();
        gameOver.visible = true;
        gameOverSound.play();
       
      }  
      
    }

  if(gameState === END)
    {
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);  
     sword.visible = false;
    }

  drawSprites();
}

function fruits()
 {
 if(World.frameCount%80 === 0)
   {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2; 
    fruit.velocityX = -7
    //fruit.debug = true
    r = Math.round(random(1,4));
    if (r == 1) {
    fruit.addImage(fruit1Image);
    } else if (r == 2) {
    fruit.addImage(fruit2Image);
    } else if (r == 3) {
    fruit.addImage(fruit3Image);
    } else {
    fruit.addImage(fruit4Image);
    }

    fruit.y = Math.round(random(50, 340));
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    }
}

function createEnemy()
 {
 if(World.frameCount%200===0)
 {
  enemy = createSprite(400,200,20,20);
  enemy.addImage(enemy1Image);
  enemy.y=Math.round(random(100,300));
  enemy.velocityX=-8;
  enemy.setLifetime = 50;
  
  enemyGroup.add(enemy);
 }
 }