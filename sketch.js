var PLAY = 1;
var END = 0 ;
var sky;
var bird,bird_flying;
var lightning; 
var edges;
var gameOver;
var score = 0;
var gameState = PLAY 

function preload(){
    skyImg = loadImage("sky image.png");
    bird_flying = loadAnimation("bird1.png", "bird2.png");
    lightningImg = loadImage("lightning.png");
    gameOverImg = loadImage("game over.png")
}

function setup() {
    createCanvas(800,600);

    sky = createSprite(480,290,800,400);
    sky.addImage("sky",skyImg); 
    sky.scale = 1;
    console.log("Hello********in setup**********"+sky.x)
    sky.velocityX = -2; 

    bird = createSprite(100,300);
    bird.addAnimation("flying", bird_flying);
   // bird.scale = 0.5

    lightningsGroup = new Group();

    bird.setCollider("circle",0,0,80);
    bird.debug = true; 


}  

function draw() {
    background(180);
    //console.log("before score display*************"+score)
    textSize(20);
    //console.log("game state********###############*****"+gameState)
    if(gameState === PLAY){
        score = score + Math.round(getFrameRate()/60); 
        console.log("game state*****inside gamestate=PLAY***###############*****"+gameState)
        sky.velocityX = -2;

    if(keyDown("left")){ 
        bird.x = bird.x - 10
    } 

    if(keyDown("right")){
        bird.x = bird.x + 10
    } 



    if(sky.x < 0){ 
        sky.x = sky.width/2
    } 

    Spawnlightning();
    console.log("gameState--------------------------*******"+gameState)
    if (lightningsGroup.isTouching(bird)){
        console.log("beforeGameState = END*******")
        gameState = END;
    } 
    
}
    

    else if (gameState === END)   {
        console.log("insideGameState = END*******")
        bird.destroy();
        sky.velocity = 0
        lightningsGroup.setVelocityEach(0);
        gameOver = createSprite(400,300);
        gameOver.addImage(gameOverImg); 
    }   

    
    drawSprites();

    text("Score : " + score, 30,50)
    
 
}

function Spawnlightning() {
    console.log("game state*****inside spawnlightning***###############*****")
   if(World.frameCount % 200 === 0){
    var lightning = createSprite(Math.round(random(100,700),60,15,15));
    lightning.addImage(lightningImg);
    lightning.scale = 0.5
    lightning.velocityY = 3;
    lightning.lifetime = 250;
    lightningsGroup.add(lightning)
   }
}