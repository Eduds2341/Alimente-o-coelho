const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

var rope,rope2,rope3

var fruit
var link1,link2,link3

var sad
var blink
var eat

var bunny

var bgImg,food,rabbit

var btn1,btn2,btn3


var backgroundSound,sadSound,airSound,eatingSound,cuttingSound

var btnBlower
var muteBtn

var canH,canW

function preload()
{
  bgImg=loadImage("./assets/background.png")
  food=loadImage("./assets/melon.png")
  rabbit=loadImage("./assets/Rabbit-01.png")

  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png"); 
  eat = loadAnimation("./assets/eat_0.png" , "./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png"); 
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png","./assets/sad_3.png"); 

  eatingSound = loadSound("./assets/eating_sound.mp3");
  backgroundSound = loadSound("./assets/sound1.mp3");
  sadSound = loadSound("./assets/sad.wav");
  airSound = loadSound("./assets/air.wav");
  cuttingSound = loadSound("./assets/rope_cut.mp3");


  blink.playing = true; 
  eat.playing = true; 
  sad.playing = true; 
  sad.looping= false; 
  eat.looping = false;
}

function setup() 
{

 var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canW=displayWidth
    canH=displayHeight
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW=displayWidth
    canH=displayHeight
    createCanvas(displayWidth,displayHeight);
  }

 
  frameRate(80);

  backgroundSound.play()
  backgroundSound.setVolume(0.2)

  engine = Engine.create();
  world = engine.world;
  var fruitoptions={
    density:0.001
  }
  fruit=Bodies.circle(300,300,15)
  ground = new Ground(200,canH,600,20);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  

  bunny=createSprite(170,canH-80,100,100);
  bunny.addImage(rabbit)
  bunny.scale=0.2

  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)

  bunny.changeAnimation("blinking")
  

  
  rope=new Rope(6,{x:40,y:30})
  Matter.Composite.add(rope.body,fruit)
  link1=new Link(rope,fruit)

  rope2=new Rope(6,{x:360,y:40})
  Matter.Composite.add(rope2.body,fruit)
  link2=new Link(rope2,fruit)

  rope3=new Rope(6,{x:400,y:225})
  Matter.Composite.add(rope3.body,fruit)
  link3=new Link(rope3,fruit)

  btn1=createImg("./assets/cut_btn.png")
  btn1.position(20,30)
  btn1.size(50,50)
  btn1.mouseClicked(drop)

  btn2=createImg("./assets/cut_btn.png")
  btn2.position(330,35)
  btn2.size(50,50)
  btn2.mouseClicked(drop2)

  btn3=createImg("./assets/cut_btn.png")
  btn3.position(360,200)
  btn3.size(50,50)
  btn3.mouseClicked(drop3)

  btnBlower=createImg("./assets/balloon.png")
  btnBlower.position(10,220)
  btnBlower.size(150,100)
  btnBlower.mouseClicked(airBlow)
  muteBtn=createImg("./assets/mute.png");
  muteBtn.position(450,20);
  muteBtn.size(50,50);
  muteBtn.mouseClicked(mute)



}

function draw() 
{
  background(51);
  image(bgImg,0,0,canW+80,canH)
  imageMode(CENTER)
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  if (fruit!==null) {
    image(food,fruit.position.x,fruit.position.y,70,60)

  }
  if (collide(fruit,bunny)==true) {
    bunny.changeAnimation("eating")
    eatingSound.play()
  }
  if (fruit!==null&&fruit.position.y>=650) {
    bunny.changeAnimation("crying")
    sadSound.play()
    backgroundSound.stop()
    fruit=null
  }
   drawSprites()
}
function drop(){
  rope.break()
  link1.detach()
  link1=null
  cuttingSound.play()
}
function drop2(){
  rope2.break()
  link2.detach()
  link2=null
  cuttingSound.play()
}
function drop3(){
  rope3.break()
  link3.detach()
  link3=null
  cuttingSound.play()
}
function collide(body,sprite){
  if (body!==null) {
    var D=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (D<=80) {
      World.remove(world,fruit)
      fruit=null
      return true
    }
    else{
      return false 
    }
  }
  
}
function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airSound.play()

}
function mute(){
  if (backgroundSound.isPlaying()) {
    backgroundSound.stop()
  } else {
    backgroundSound.play()
  }
}
