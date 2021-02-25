var dog, dogHappy, dogSad;
var db, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;

function preload(){
    dogImg = loadImage("images/Dog.png");
    dogImg2 = loadImage("images/happydog.png");
}
function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();

  db = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(700, 30);
  addFood.mousePressed(addFood);

foodStock = db.ref('Food');
foodStock.on("value", readStock);
}

function draw() {  
  background(140, 210, 144);
foodObj.display();

fedTime = db.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})
if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 350, 30);
}else {
  text("LAST FEED :"+ lastFed+'am', 350, 30);
}
  drawSprites();
  
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}
function addFood(){
  foodS++
  db.ref('/').update({
    Food:foodS
  })
}