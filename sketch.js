var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var obstaculo1,obstaculo2;
var obstaculo1Img,obstaculo2Img;
var medalhaBronze,medalhaPrata,medalhaOuro;
var medalhaBronzeImg,medalhaPrataImg,medalhaOuroImg;
var gameOverImg,cycleBell;


var pinkCG, yellowCG,redCG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  obstaculo1Img = loadImage("obstacle1.png");
  obstaculo2Img = loadImage("obstacle2.png");

  medalhaBronzeImg = loadImage("bronze.png");
  medalhaPrataImg = loadImage("prata.png");
  medalhaOuroImg = loadImage("ouro.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("circle",0,0,40);
mainCyclist.debug = true
  
medalhaBronze = createSprite(550,70);
medalhaBronze.addImage(medalhaBronzeImg);
medalhaBronze.visible = false;

medalhaPrata = createSprite(550,70);
medalhaPrata.addImage(medalhaPrataImg);
medalhaPrata.visible = false;

medalhaOuro = createSprite(550,70);
medalhaOuro.addImage(medalhaOuroImg);
medalhaOuro.visible = false;

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 
gameOver.tint = "magenta";
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obstaculo1G = new Group();
obstaculo2G = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,450,30);
  
  if(gameState === END && distance < 400){
  
    medalhaBronze.visible = true;
    text("3º lugar",600,70);
  }
    
    if(gameState === END && distance >400 && distance <= 800){
      medalhaPrata.visible = true;
      text("2º lugar",600,70);
  }
  
    if(gameState === END && distance >800 && distance <= 1200){
      medalhaOuro.visible = true;
      text("1º lugar",600,70);
  }
  
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);

   camera.position.x = width/2;
   camera.position.y = mainCyclist.y;
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    } 
    
  }

  if (World.frameCount % 170 == 0) {
    obstacle1();
  }

  if (World.frameCount % 110 == 0) {
    obstacle2();
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(obstaculo1G.isTouching(mainCyclist)){
      gameState = END;
    }

    if(obstaculo2G.isTouching(mainCyclist)){
      gameState = END;
    }
    
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
  text("Pressione a seta acima para reiniciar o jogo!", 450, 200)
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    obstaculo1G.setVelocityXEach(0);
    obstaculo1G.setLifetimeEach(-1);

    obstaculo2G.setVelocityXEach(0);
    obstaculo2G.setLifetimeEach(-1);

    

    //write condition for calling reset( )
}if(mousePressedOver(gameOver)){
  reset();
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function obstacle1(){
  obstaculo1 =createSprite(1100,Math.round(random(50, 250)));
  obstaculo1.scale =0.08;
  obstaculo1.velocityX = -(6 + 2*distance/150);
  obstaculo1.addImage(obstaculo1Img);
  obstaculo1.setLifetime=170;
  obstaculo1G.add(obstaculo1);
}

function obstacle2(){
  obstaculo2 =createSprite(1100,Math.round(random(50, 250)));
  obstaculo2.scale =0.08;
  obstaculo2.velocityX = -(6 + 2*distance/150);
  obstaculo2.addImage(obstaculo2Img);
  obstaculo2.setLifetime=170;
  obstaculo2G.add(obstaculo2);
}


  
  



  
  


//create reset function here
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  medalhaBronze.visible = false;
  medalhaPrata.visible = false;
  medalhaOuro.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  obstaculo1G.destroyEach();
  obstaculo2G.destroyEach();
  
  distance = 0;
}






