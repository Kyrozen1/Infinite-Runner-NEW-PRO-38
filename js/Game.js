class Game{
  constructor(){
    
  }

  getState(){
    var getState = database.ref('gameState');
    getState.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      console.log("hhi")
    }
    person2 = createSprite(300, 430);
    person2.addAnimation("running", person_running);
    person2.scale=0.28;
    person2.debug=true;
    person2.setCollider("rectangle", 0, 0, 200, 450); 
    console.log(person2)
    person = createSprite(300, 635);
    person.addAnimation("runnings", person_running);
    person.scale=0.28;
    person.debug=true;
    person.setCollider("rectangle", 0, 0, 200, 450);  
    console.log(person) 
    people = [person, person2];

    bull = createSprite(300, 430, 10, 10);
    bull.addAnimation("bull", bull_running);
    bull.scale=0.35;
    bull.debug=true;
    bull.setCollider("rectangle", 0, 0, 370, 300);
    bull2 = createSprite(300, 635, 10, 10);
    bull2.addAnimation("bull", bull_running);
    bull2.scale=0.35;
    bull2.debug=true;
    bull2.setCollider("rectangle", 0, 0, 370, 300);

    obstacle1Group = new Group();
    obstacle2Group = new Group();
    score1Group = new Group();
    obstacle3Group = new Group();
    obstacle4Group = new Group();
    score2Group = new Group();
  }
  
  play(){
    form.hide();
    Player.getPlayerInfo(); 
    player.getPersonsRank();

    if(Players !== undefined){
      background(rgb("24,22,23"))
      image(roadImage,-340,300,4000,440);
      image(roadImage,1660,300,4000,440);
      image(roadImage,3660,300,4000,440);
      image(roadImage,5660,300,4000,440);
      image(roadImage,6380,300,4000,440);

      var index = 0;
      var x = 0;
      var y = 190;

      for(var plr in Players){
        index = index + 1 ;
        y = y + 205;
        x = 300-Players[plr].distance;
        people[index-1].x = x;
        people[index-1].y = y;

        if(keyDown(DOWN_ARROW)){
          person.y = person.y + 200;
        }
        if(keyDown("UP_ARROW")){
          person2.y = person2.y - 200;
        }
        if(keyDown(RIGHT_ARROW)){
          player.distance -= 10;
          player.update();
        }
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          people[index - 1].shapeColor = "red";
          camera.position.x = people[index-1].x;
          camera.position.y = displayHeight/2;
        }
        image(backImage,9040,-90,displayWidth+60,400);
        image(backImage,7860,-90,displayWidth+60,400);
        image(backImage,6680,-90,displayWidth+60,400);
        image(backImage,5500,-90,displayWidth+60,400);
        image(backImage,4320,-90,displayWidth+60,400);
        image(backImage,3140,-90,displayWidth+60,400);
        image(backImage,1960,-90,displayWidth+60,400);
        image(backImage,780,-90,displayWidth+60,400);
        image(backImage,-400,-90,displayWidth+60,400);
        textSize(25);
        fill("blue");
        text("Player 1 :" +score1,camera.x-500,50);
        text("Player 2 :" +score2,camera.x-500,100);
      }

      bull.y=people[0].y;
      bull.x=people[0].x-200;
      bull2.y=people[1].y;
      bull2.x=people[1].x-200;

      obstacles1();
      obstacles2();
      obstacles3();
      obstacles4();
      coins1();
      coins2();

      if(obstacle1Group.isTouching(bull)){
        obstacle1Group.destroyEach();
      }
      if(obstacle2Group.isTouching(bull)){
        obstacle2Group.destroyEach();
      }
      if(obstacle2Group.isTouching(person)){
        gameState = 2;
        die.play();
        alert("Game Over! You Lost!")
      }
      if(obstacle1Group.isTouching(person)){
        gameState = 2;
        die.play();
        alert("Game Over! You Lost!")
      }
      if(score1Group.isTouching(person)){
        score1 = score1 + 1;
        score1Group.destroyEach();
      }
      if(obstacle3Group.isTouching(bull2)){
        obstacle3Group.destroyEach();
      }
      if(obstacle4Group.isTouching(bull2)){
        obstacle4Group.destroyEach();
      }
      if(obstacle4Group.isTouching(person2)){
        gameState = 2;
        die.play();
        alert("Game Over! You Lost!")
      }
      if(obstacle3Group.isTouching(person2)){
        gameState = 2;
        die.play();
        alert("Game Over! You Lost!")
      }
      if(score2Group.isTouching(person2)){
        score2 = score2 + 1;
        score2Group.destroyEach();
      }

      if(player.distance < -9980){
        gameState = 3;
        player.rank+=1;
        Player.updatePersonsRank(player.rank);
      }
    }
    drawSprites();
  }
  
  end(){
    console.log("Game Ended");
  }

  finish(){
    console.log(player.rank);
    if(player.rank===1){
      alert("You Survived! Congragulations "+player.rank+"st Place")
    }else{
      alert("better luck next time! "+player.rank+"nd Place")
    }
  }
}
