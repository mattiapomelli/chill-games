import React, { useEffect } from "react"
import Player from "../game/classes/Player"
import Enemy from "../game/classes/Enemy"
import Upgrade from "../game/classes/Upgrade"
import EnemyBullet from "../game/classes/EnemyBullet"
import {testCollisionEntity, testCollisionEntity2 } from "../game/actions/collision"

const Game = () => {

    useEffect(() => {

        //VARIABLES
      
        var canvas = document.getElementById("ctx");
        var ctx = canvas.getContext('2d');
        ctx.font = '20px Arial';
      
        // timers
        var timer_a = 0;                  //timer per l'upgrade attackspeed
        var poison_active = false;        //true quaando e' attivo l upgrade poison
        var timer_p = 0;                  //timer per upgrade poison
        var timer_j = 0;
        var timer_sick = 0;
        var confused_time = 0;
      
        // lists
        var enemyList = {};
        var enemiesAtTowerLeft = 0;
        var enemiesAtTowerRight = 0;
        var bulletList = {};
        var upgradeList = {};
        var enemyBulletList = {};

        // game logic 
        var enemies_generated = 0;  //numero di nemici generati dall inizio
    
        var towerLife = 100;
        var tower_start = 628;//564;    //definisce il punto in cui i nemici si fermano per attaccare la torre
        var tower_end = 770;
        var tower_distance_left= 0;   //distance between two enemies at tower
        var tower_distance_right = 0;
    
        var continue_update = true;
        var frameCount = 0;
        var score = 0;
        var enemy_frequency = 300;
        var upgrade_frequency = 1580;
        var damage = 0;                 //quanto i mostri messi insieme tolgono alla torre ogni secondo
      
        var right = true;    //quando false i nemici non arrivano da destra ( e da sinistra per left) --- usata quando ce il boss
        var left = true;
        var boss_shooting = false;
    
        var mouseX;
        var mouseY;

        // poison
        var poison_x;
        var placing_poison = false;
        var poison_placed = false;
      
        // key codes
        var keyCodeA = 65;
        var keyCodeD = 68;
        var keyCodeW = 87;
        var keyCodeS = 83;
      
        //IMAGES
        let tileset = new Image();
        tileset.src = 'images/tileset8.png';
        let tower = new Image();
        tower.src = 'images/cannontower.png';
        let bullet_rect = new Image();
        bullet_rect.src = 'images/rectbullet.png';
        let poison = new Image();
        poison.src = 'images/poison.png';
        let poison2 = new Image();
        poison2.src = 'images/poison2.png';
        let background = new Image();
        background.src = 'images/background2.png';
        let enemybullet = new Image();
        enemybullet.src = 'images/enemybullet.png';

        //PLAYER
        var player1 = new Player(555,385,[{x:0,y:0,w:65,h:65},{x:0,y:65,w:65,h:65}],     [{x:130,y:0,w:70,h:19},{x:200,y:0,w:70,h:19}]);
      
        //HANDLE KEYS
        function keyDownHandler(event){
      
            if(player1.confused){
              keyCodeD = 65;
              keyCodeA = 68;
              keyCodeW = 83;
              keyCodeS = 87;
            }
            else{
              keyCodeA = 65;
              keyCodeD = 68;
              keyCodeW = 87;
              keyCodeS = 83;
            }
      
            if(event.keyCode === keyCodeA){
              player1.leftPressed = true;
              player1.leftFace = true;
              player1.rightFace = false;
            }
            else if(event.keyCode === keyCodeD){
              player1.rightPressed = true;
              player1.rightFace = true;
              player1.leftFace = false;
            }
            if(event.keyCode === keyCodeW){
              player1.jumpPressed = true;
            }
            if(event.keyCode === 32){  //67: c
              player1.attackPressed = true;
            }
            if(event.keyCode === keyCodeS){
              player1.downPressed = true;
            }
            if(event.keyCode === 80 && player1.got_poison){
              poison_active = true;
              placing_poison = true;
              player1.got_poison = false;
            }
            if(event.keyCode === 82 && player1.got_recharge){
              player1.can_shoot = true;
              player1.number_of_bullets = 50;
              player1.got_recharge = false;
            }
            if(event.keyCode === 32 && !continue_update){
              startNewGame();
            }
        }

        function keyUpHandler(event){
            if(event.keyCode === keyCodeA){
              player1.leftPressed = false;
            }
            else if(event.keyCode === keyCodeD){
              player1.rightPressed = false;
            }
            if(event.keyCode === keyCodeW){
              player1.jumpPressed = false;
            }
            if(event.keyCode === 32){
              player1.attackPressed = false;
            }
            if(event.keyCode === keyCodeS){
              player1.downPressed = false;
            }
        }
      
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

      
        //ENEMIES    
        function randomlyGenerateEnemy (category,x,y,spdX,w,h,sprites,hp, side, power, score, push){
            var id = Math.random();
            var spdY;
            if(category === 'blob')
              spdY = 12;
            else
              spdY = 0;
            var toRemove = false;
            var atTower = false;
            var check = true;

            enemyList[id] = new Enemy(id,x,y,spdX,spdY,w,h,sprites,hp,toRemove,atTower,check, side, power,category,score,push);
        }
      
        //UPGRADES   
        function randomlyGenerateUpgrade (c,s){
            var x = Math.random() < 0.5 ? Math.random()*400 + 100 : Math.random()*400 + 900;						//Math.random() * 1200 + 100;
            var y = Math.random()*20 + 275;
            var h = 35;     //between 10 and 40
            var w = 35;
            var id = Math.random();
            var spdX = 0;
            var spdY = 0;
            var category;
            var sprites;
            
            if(frameCount <= 7000){     //<=7000
              let n = Math.random();
              if(n < 0.4){   //0.4
                  category = 'recharge';
                  sprites = [{x:130,y:20,w:35,h:35}];
              }
              else if(n >= 0.4 && n < 0.8){
                  category = 'poison';
                  sprites = [{x:130,y:56,w:35,h:35}];
              }
              else {
                  category = 'attackspeed';
                  sprites = [{x:130,y:90,w:35,h:35}];
              }
            }

            if(frameCount > 7000 && frameCount <= 11500){
              let n = Math.random();
              if(n < 0.5){
                  category = 'recharge';
                  sprites = [{x:130,y:20,w:35,h:35}];
              }
              else if(n >=0.5 && n < 0.9){
                  category = 'jump';
                  sprites = [{x:130,y:125,w:35,h:35}]
              }
              else if(n >=0.9 && n < 0.95){
                  category = 'poison';
                  sprites = [{x:130,y:55,w:35,h:35}];
              }
              else {
                  category = 'attackspeed';
                  sprites = [{x:130,y:90,w:35,h:35}];
              }
            }

            if(frameCount > 11500){
              var n = Math.random();
              if(n < 0.1){
                  category = 'jump';
                  sprites = [{x:130,y:125,w:35,h:35}]
              }
              else if(n >= 0.1 && n < 0.3){
                  category = 'recharge';
                  sprites = [{x:130,y:20,w:35,h:35}];
              }
              else if(n >= 0.3 && n < 0.5){
                  category = 'attackspeed';
                  sprites = [{x:130,y:90,w:35,h:35}];
              }
              else{
                  category = 'special_attack';
                  sprites = [{x:130,y:161,w:35,h:35}];
              }
            }

            if(c !== undefined && s!== undefined){
              category = c;
              sprites = s;
            }

            upgradeList[id] = new Upgrade(id,x,y,spdX,spdY,w,h,category,sprites)
            //Upgrade(id,x,y,spdX,spdY,w,h,category,sprites);
        }
      
        //BULLETS
        document.onmousemove = function(mouse){
      
            mouseX = mouse.clientX;
            mouseY = mouse.clientY;
      
            if(player1.x === 650 && player1.y === 183){
              mouseX -= 630;
              mouseY -= 220;
            }
            else if(player1.x === 685 && player1.y === 183){
              mouseX -= 775;
              mouseY -= 180;
            }
            else{
            mouseX -= 700;
            mouseY -= 200;
            }
      
            player1.aimAngle = Math.atan2(mouseY, mouseX) / Math.PI * 180;
            //if(player1.aimAngle < -170)
                //player1.aimAngle = 170
            //if(player1.aimAngle < 123 && player1.aimAngle > -)
            //	player1.aimAngle = 123;
      
            //console.log('mousemove: ' + player1.aimAngle);
      
            if(placing_poison){
              poison_x = mouseX + 440;
              //poison_y = mouseY + 185;
            }
        }
      
        function generateEnemyBullet (x,y,entity,side){
            var h = 15;    
            var w = 15;
            var id = Math.random();
            var toRemove = false;

            var angle = Math.atan2(player1.y - (y + 160), player1.x - (x + 125)) / Math.PI * 180;

            //var spdX = (player1.x - entity.x) % 1000;
            //var spdY = (player1.y - entity.y) % 1000;
            var spdX = Math.cos(angle/180*Math.PI)*5;   //convert angle in radiants
            var spdY = Math.sin(angle/180*Math.PI)*5;
            enemyBulletList[id] = new EnemyBullet(id,x + 125,y + 160,spdX,spdY,w,h,toRemove,side);
            //EnemyBullet(id,x,y,spdX,spdY,w,h,toRemove,side);
        }
      
        document.onclick = function(mouse){   //on left click
            if(continue_update && player1.can_shoot){
              if(player1.special_attack)
                player1.performSpecialAttack(bulletList);
              else
                player1.performAttack(bulletList);
            }
           
            if(poison_active){
              placing_poison = false;
              poison_placed = true;
            }
        }
      
        function updateEntity (entity){
            updateEntityPosition (entity);
            drawEntity (entity);
        }
      
        function updateEntityPosition (entity) {
      
            entity.x += entity.spdX;
            entity.y += entity.spdY;
            
            /*if(entity.x < 0 || entity.x > WIDTH){
              entity.spdX = -entity.spdX;		
            }
      
            if(entity.y < 0 || entity.y > HEIGHT){
              entity.spdY = -entity.spdY;		
            }*/
        }
      
        function drawEntity (entity) {
            ctx.save();
            ctx.fillStyle = entity.color;
            ctx.fillRect(entity.x - entity.w/2, entity.y - entity.h/2, entity.w, entity.h);
            ctx.restore();
        }

      
        //LOOP------------------------------------------------------------------------------------------------------------------------------------
        function gameLoop() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          ctx.font = '20px Arial';
          if(towerLife > 0)
		        frameCount++;
	        ctx.fillText(frameCount,400,100);
      
          if(player1.got_poison){
            ctx.fillStyle = 'white';
            ctx.fillRect(1020,40,45,45);
            ctx.drawImage(tileset,130,55,35,35,1030,50,25,25);
            ctx.fillStyle = 'black';
            ctx.fillText('P',1037,30);
          }
          if(player1.got_recharge){
            ctx.fillStyle = 'white';
            ctx.fillRect(960,40,45,45);
            ctx.drawImage(tileset,130,20,35,35,970,50,25,25);
            ctx.fillStyle = 'black';
            ctx.fillText('R',977,30);
          }
      
        //SCORE
          ctx.fillStyle = 'red';
          if(frameCount % 60 === 0 && continue_update)
            score++;
          ctx.fillText('SCORE: ' + score,80,40);
      
        //BULLETS
          for(var key in bulletList){
            updateEntity(bulletList[key]);
            if(bulletList[key].y + bulletList[key].h > 455)
              delete bulletList[key];
          }
      
          if(player1.number_of_bullets === 0)
            player1.can_shoot = false;
      
          ctx.fillStyle = 'red';
          ctx.fillText('NUMBER OF BULLETS',1100,40);
          ctx.fillStyle = 'white';
          ctx.fillRect(1100,50,250,24);
          ctx.fillStyle = '#EFCA55';
          ctx.fillRect(1100,50,player1.number_of_bullets*5,24);
          ctx.drawImage(bullet_rect,1100,50);
      
        //DRAWING
          ctx.drawImage(tower,575,200);
            
          if(poison_active){
            if(poison_x === undefined)
              poison_x = mouseX + 440;
            ctx.drawImage(poison,poison_x,440);
          }
      
        //ENEMY FREQUENCY
          if(frameCount === 600)      //fa aumentare col tempo la frequenza con cui arrivano nemici e upgrade
            enemy_frequency = 240;
          if(frameCount === 1200){
            enemy_frequency = 180;
            upgrade_frequency = 1460;
          }
          if(frameCount === 8000){
            enemy_frequency = 140;
            upgrade_frequency = 1200;
          }
          //if(frameCount === 11500)
          //	enemy_frequency = 180;
          if(frameCount === 13500)
            enemy_frequency = 240;
          if(frameCount === 18000)
            enemy_frequency = 180;
      
        //ENEMIES
          if(frameCount % enemy_frequency === 0){ 
          if(Math.random() < 0.5){								
                              //category,  x,     y,   spdX,  w, h,   sprites,  			   hp,   side,    power,  score,    push
          if(left){
            let n = Math.random();
      
            if(frameCount <= 2000)
                randomlyGenerateEnemy('zombie',  -65,   385,   0.7,  65, 65, [{x:65,y:0,w:64,h:65}],  4,   'left',     1,       5,      10);   
            if(frameCount > 2000 && frameCount <= 7000)
              if(n < 0.7)
                randomlyGenerateEnemy('zombie',  -65,   385,   0.7,  65, 65, [{x:65,y:0,w:64,h:65}],  4,   'left',     1,       5,      10);
              else
                randomlyGenerateEnemy('wolf',    -70,   380,    2,   70, 70, [{x:270,y:0,w:70,h:70}], 6,   'left',     2,       15,     20);
            if(enemies_generated === 25){	
                randomlyGenerateEnemy('bosszombie',-120,  330,   0.5,  120,120,[{x:340,y:0,w:120,h:120}],30, 'left',    10,     50,      5);
                right = false;
              }
            if(frameCount > 7000 && frameCount <= 11700 )
              if(n < 0.3)
                randomlyGenerateEnemy('zombie',  -65,   385,   0.7,  65, 65, [{x:65,y:0,w:64,h:65}],  4,   'left',     1,       5,      10);
              else if(n >= 0.3 && n < 0.5)
                randomlyGenerateEnemy('wolf',    -70,   380,    2,   70, 70, [{x:270,y:0,w:70,h:70}], 6,   'left',     2,       15,     20);
              else
                randomlyGenerateEnemy('dragon',  -87,Math.random()*30 + 200,0.6, 87,46,[{x:461,y:0,w:84,h:45}],3,'left',2,       8,      2);
            if(enemies_generated === 50){
              randomlyGenerateEnemy('bossdragon', -201,   210,    0.4, 201,89,[{x:548,y:0,w:200,h:89}],30, 'left',       8,        80,     1);
              right = false;
            }
            if(frameCount > 11700)
              if(n < 0.4)
                randomlyGenerateEnemy('blob',   -80,  370,  1.6,  80,80, [{x:749,y:0,w:80,h:80}],5,     'left',        2,        20,    8);
              else if (n >= 0.4 && n < 0.6)
                randomlyGenerateEnemy('zombie',  -65,   385,   0.7,  65, 65, [{x:65,y:0,w:64,h:65}],  4,   'left',     1,       5,      10);
              else
                randomlyGenerateEnemy('digger',Math.random()*90+240, 460,    1.2,  55,55,  [{x:830,y:0,w:55,h:55}], 3, 'left',  1, 7,   5);
            if(enemies_generated === 86){
              randomlyGenerateEnemy('finalboss',-250,200,0.3,250,250, [{x:886,y:0,w:250,h:250},{x:1144,y:0,w:250,h:250}], 100, 'left', 20, 200, 1 );
              left = false;
              right = false;
            }
            if(frameCount > 18000){
              if(n < 0.2)
                randomlyGenerateEnemy('zombie',  -65,   385,   0.7,  65, 65, [{x:65,y:0,w:64,h:65}],  4,   'left',     1,       5,      10);
              else if(n >= 0.2 && n < 0.4)
                randomlyGenerateEnemy('wolf',    -70,   380,    2,   70, 70, [{x:270,y:0,w:70,h:70}], 6,   'left',     2,       15,     20);
              else if(n >= 0.4 && n < 0.6)
                randomlyGenerateEnemy('dragon',  -87,Math.random()*30 + 200,0.6, 87,46,[{x:461,y:0,w:84,h:45}],3,'left',2,       8,      2);
              else if(n >= 0.6 && n < 0.8)
                randomlyGenerateEnemy('blob',   -80,  370,  1.6,  80,80, [{x:749,y:0,w:80,h:80}],5,     'left',        2,        20,    8);
              else
                randomlyGenerateEnemy('digger',Math.random()*90+240, 460,    1.2,  55,55,  [{x:830,y:0,w:55,h:55}], 3, 'left',  1, 7,   5);
              }
            }
          }
      
          else{
          if(right){
      
            let n = Math.random();
      
            if(frameCount < 2000) 
              randomlyGenerateEnemy('zombie',   1400, 385,  -0.7,   65,65, [{x:65,y:64,w:65,h:65}], 4,   'right',    1,        5,     10);  
            if(frameCount > 2000 && frameCount <= 7000)
              if(n < 0.7)
                randomlyGenerateEnemy('zombie',   1400, 385,  -0.7,   65,65, [{x:65,y:64,w:65,h:65}], 4,   'right',    1,        5,     10);
              else
                randomlyGenerateEnemy('wolf',     1400, 380,    -2,   70,70, [{x:270,y:70,w:70,h:70}], 6,  'right',    2,       15,     20);
            if(enemies_generated === 25){	
                randomlyGenerateEnemy('bosszombie',1400, 330,  -0.5, 120,120, [{x:341,y:120,w:120,h:120}],30,'right',   10,      50,     5);
                left = false;
              }
            if(frameCount > 7000 && frameCount <= 11700)
              if(n < 0.3)
                randomlyGenerateEnemy('zombie',   1400, 385,  -0.7,   65,65, [{x:65,y:64,w:65,h:65}], 4,   'right',    1,        5,     10);
              else if(n >= 0.3 && n< 0.5)
                randomlyGenerateEnemy('wolf',     1400, 380,    -2,   70,70, [{x:270,y:70,w:70,h:70}], 6,  'right',    2,       15,     20);
              else
                randomlyGenerateEnemy('dragon',1400,Math.random()*30 + 200,-0.6,87,46,[{x:461,y:47,w:84,h:45}],3,'right',2,       8,     0);
            if(enemies_generated === 50){
              randomlyGenerateEnemy('bossdragon', 1400,   210,   -0.4,201,89,[{x:548,y:89,w:200,h:89}],30,'right',       8,        80,     1);
              left = false;
            }
            if(frameCount > 11700)
              if(n < 0.4)
                randomlyGenerateEnemy('blob',   1400,  370,  -1.6,  80,80, [{x:749,y:80,w:80,h:80}],5,'right',         2,        20,    8);
              else if(n >= 0.4 && n < 0.6)
                randomlyGenerateEnemy('zombie',   1400, 385,  -0.7,   65,65, [{x:65,y:64,w:65,h:65}], 4,   'right',    1,        5,     10);
              else
                randomlyGenerateEnemy('digger',Math.random()*90+1015, 460, -1.2,55,55,[{x:830,y:55,w:55,h:55}], 3, 'right',  1, 7,     5);
            if(enemies_generated === 86){
              randomlyGenerateEnemy('finalboss',1400,200,-0.3,250,250, [{x:886,y:255,w:250,h:250},{x:1144,y:255,w:250,h:250}], 100, 'right', 20, 200, 1 );
              left = false;
              right = false;
            }
            if(frameCount > 18000){
              if(n < 0.2)
                randomlyGenerateEnemy('zombie',   1400, 385,  -0.7,   65,65, [{x:65,y:64,w:65,h:65}], 4,   'right',    1,        5,     10);
              else if(n >= 0.2 && n < 0.4)
                randomlyGenerateEnemy('wolf',     1400, 380,    -2,   70,70, [{x:270,y:70,w:70,h:70}], 6,  'right',    2,       15,     20);
              else if(n >= 0.4 && n < 0.6)
                randomlyGenerateEnemy('dragon',1400,Math.random()*30 + 200,-0.6,87,46,[{x:461,y:47,w:84,h:45}],3,'right',2,       8,     0);
              else if(n >= 0.6 && n < 0.8)
                randomlyGenerateEnemy('blob',   1400,  370,  -1.6,  80,80, [{x:749,y:80,w:80,h:80}],5,'right',         2,        20,    8);
              else
                randomlyGenerateEnemy('digger',Math.random()*90+1015, 460, -1.2,55,55,[{x:830,y:55,w:55,h:55}], 3, 'right',  1, 7,     5);
              }
            }
          }
          enemies_generated++;
          }
      
          //console.log(tower_start);
          //console.log(tower_end);
          for(let key in enemyList){
            tower_distance_left = enemiesAtTowerLeft * 30;
            tower_distance_right = enemiesAtTowerRight * 30;
      
            //if(enemyList[key].category === 'finalboss')
            ctx.fillRect(enemyList[key].x, enemyList[key].y - 30, enemyList[key].hp * 10, 15);  //enemy hp bar
      
            let i;
            if(enemyList[key].category === 'finalboss' && boss_shooting && continue_update)
              i = 1;
            else
              i = 0;
      
            ctx.drawImage(tileset,
              enemyList[key].sprites[i].x,enemyList[key].sprites[i].y,enemyList[key].sprites[i].w,enemyList[key].sprites[i].h,
              enemyList[key].x,enemyList[key].y,enemyList[key].w,enemyList[key].h);
      
            if(enemyList[key].category === 'digger' && enemyList[key].y > 395 && continue_update)
              enemyList[key].y --;
            else
              enemyList[key].x += enemyList[key].spdX;
      
      
            if(enemyList[key].x + enemyList[key].w > tower_start - tower_distance_left && enemyList[key].x < tower_end + tower_distance_right &&
              enemyList[key].check) {  //checks if the enemy is arrived at the tower
              
              enemyList[key].spdX = 0;
                                          
              enemyList[key].atTower = true;
      
              }
      
            if(enemyList[key].category === 'blob' && continue_update && !(enemyList[key].spdX === 0 && enemyList[key].y === 370))
              enemyList[key].jump()
      
            if(enemyList[key].atTower){
              //if(enemyList[key])
      
              //if(enemyList[key].category != 'dragon'){
                if(enemyList[key].side === 'left' )
                  enemiesAtTowerLeft ++;
                else
                  enemiesAtTowerRight ++;
              //}
      
              damage += enemyList[key].power;
              //enemiesAtTower = enemiesAtTowerRight + enemiesAtTowerLeft;
              enemyList[key].atTower = false;
              enemyList[key].check = false;
            }	
                                  
      
          
          }
      
        //MOVE PLAYER, JUMP, ATTACK
          if(continue_update){
            if(player1.leftPressed && player1.canMove)
              player1.x -= player1.spdX;
            else if(player1.rightPressed && player1.canMove)
              player1.x += player1.spdX;
            player1.jump();
        
            player1.timer++;
            if(player1.leftFace){
              player1.attackLeft(enemyList);
              if(player1.attack){
                ctx.drawImage(tileset, player1.punch[1].x, player1.punch[1].y, player1.punch[1].w, player1.punch[1].h,
                  player1.x + player1.attack_x - 5, player1.y + player1.h/2 - 10, 70, 20);
              }
            }
            else{
              player1.attackRight(enemyList);
              if(player1.attack){
                ctx.drawImage(tileset, player1.punch[0].x, player1.punch[0].y, player1.punch[0].w, player1.punch[0].h,
                  player1.x + player1.attack_x, player1.y + player1.h/2 - 10, 70, 20);
              }
            }
          }
      
      
          if((player1.y === 183 || player1.climbing) && !player1.jumpUp){
            if(player1.x < 650)
              player1.x = 650;
            if(player1.x > 685)
              player1.x = 685;
          }
          if(player1.x < 0)
            player1.x = 0;
          if(player1.x + player1.w > 1400)
            player1.x = 1400 - player1.w;
      
        //DRAW PLAYER
          let index = 0;
          if(continue_update){
            index = player1.leftFace ? 1 : 0
          }
          ctx.drawImage(tileset,
            player1.sprites[index].x, player1.sprites[index].y, player1.sprites[index].w, player1.sprites[index].h,
            player1.x, player1.y, player1.w, player1.h);
      
          //DRAW BACKGROUND AND POISON
          ctx.drawImage(background,0,0);
      
          if(poison_active){
            if(poison_x === undefined)
              poison_x = mouseX + 440;
            ctx.drawImage(poison2,poison_x,449);
          }
      
        //FINAL BOSS
          if((frameCount + 20 )% 120 === 0){
            boss_shooting = true;
          }
      
          if((frameCount - 20 )% 120 === 0){
            boss_shooting = false;
          }
      
      
          if(frameCount % 120 === 0 && continue_update){
            for(let key in enemyList){
              if(enemyList[key].category === 'finalboss'){
                
                if(enemyList[key].side === 'left')
                  generateEnemyBullet(enemyList[key].x,enemyList[key].y,enemyList[key],'left');
                else
                  generateEnemyBullet(enemyList[key].x,enemyList[key].y,enemyList[key],'right');
              }
            }
          }
      
          for(let key in enemyBulletList){
            if(continue_update)
              updateEntityPosition(enemyBulletList[key]);
            ctx.drawImage(enemybullet, enemyBulletList[key].x,enemyBulletList[key].y,35,35);
          }
      
        //UPGRADE
          if(frameCount % upgrade_frequency === 0 && continue_update){ //1800  //1580
            randomlyGenerateUpgrade();
          }
      
          for(let key in upgradeList){
            ctx.drawImage(tileset,
              upgradeList[key].sprites[0].x,upgradeList[key].sprites[0].y,upgradeList[key].sprites[0].w,upgradeList[key].sprites[0].h,
              upgradeList[key].x,upgradeList[key].y,upgradeList[key].w,upgradeList[key].h);
            let isColliding = testCollisionEntity2(player1, upgradeList[key]);
            if(isColliding){
              
              if(upgradeList[key].category === 'recharge'){
                //player1.can_shoot = true;
                //player1.number_of_bullets = 50;
                player1.got_recharge = true;
              }
              else if(upgradeList[key].category === 'attackspeed'){
                player1.attackSpd = 10;
                player1.attack_timer = 15;
                player1.attack_speeded_up = true;
                timer_a = 0;
              }
              else if(upgradeList[key].category === 'poison'){
                player1.got_poison = true;
              }
              else if(upgradeList[key].category === 'jump'){
                //player1.spdY = 22;
                timer_j = 0;
                player1.superjump_active = true;
              }
              else if(upgradeList[key].category === 'special_attack'){
                player1.special_attack = true;
                player1.special_bullets = 0;
              }
      
      
              delete upgradeList[key];
            }
          }
      
          if(player1.attack_speeded_up){
            timer_a ++;
            if(timer_a > 900){
              player1.attackSpd = 5;
              player1.attack_timer = 30;
              player1.attack_speeded_up = false;
            }
          }
      
          if(poison_placed){
            timer_p++;
              if(timer_p > 720){
                poison_active = false;
                poison_placed = false;
                timer_p = 0;
              }
          }
      
          if(player1.superjump_active){
            timer_j ++;
              if(timer_j > 540  && !player1.jumpUp){
                player1.superjump_active = false;
                timer_j = 0;
                //player1.spdY = 15;
              }
          }
      
          if(player1.special_attack){
            if(player1.special_bullets === 30){			
              player1.special_attack = false;
              player1.special_bullets = 0;
            }
          }
      
          //GIVEN UPGRADES
          if(frameCount === 30) 
            randomlyGenerateUpgrade('poison', [{x:130,y:125,w:35,h:35}])
          if(frameCount === 8000)
            randomlyGenerateUpgrade('recharge',[{x:130,y:20,w:35,h:35}]);
          if(frameCount === 11500)
            randomlyGenerateUpgrade('recharge',[{x:130,y:20,w:35,h:35}]);
          if(frameCount === 11200)
            randomlyGenerateUpgrade('poison',[{x:130,y:55,w:35,h:35}]);
      
          //if(frameCount === 60)
          //	randomlyGenerateUpgrade('special_attack',[{x:130,y:161,w:35,h:35}]);
          //if(frameCount === 60)
          //	randomlyGenerateUpgrade('poison',[{x:130,y:55,w:35,h:35}]);
          //if(frameCount === 60)
          //	randomlyGenerateUpgrade('recharge',[{x:130,y:20,w:35,h:35}]);
      
        //COLLISION
          for(let key in enemyList){
            for(let key2 in bulletList){
              let isColliding = testCollisionEntity(enemyList[key], bulletList[key2])
              if(isColliding){
                bulletList[key2].toRemove = true;
                enemyList[key].hp --;
                  //
                }
              }
      
              var isColliding2 = testCollisionEntity2(enemyList[key], player1);
              if(isColliding2 && enemyList[key].category === 'zombie'){
                player1.spdX = 1.3;
                player1.sick = true;
                }
              if(isColliding2 && enemyList[key].category === 'dragon' && player1.superjump_active){
                enemyList[key].y -= 10;
                enemyList[key].hp --;
                }
              /*if(isColliding2 && enemyList[key].category === 'blob' && superjumpEnemy){
                player1.x += 100;
                }*/
      
              if(poison_placed){
                if(enemyList[key].x + enemyList[key].w > poison_x && enemyList[key].x < poison_x + 400 && enemyList[key].category !== 'dragon' && enemyList[key].category !== 'bossdragon'){
                  if(frameCount % 60 === 0 && continue_update)
                    enemyList[key].hp --;
              }
            }
      
            if(enemyList[key].hp === 0)
              enemyList[key].toRemove = true;
          }
          if(player1.sick)
            timer_sick ++;
      
          if(timer_sick >= 120){
            player1.spdX = 7;
            timer_sick = 0;
          }
      
          for(let key in enemyBulletList){
          var isColliding = testCollisionEntity2(player1, enemyBulletList[key])
          if (isColliding){
                console.log('colliding' + isColliding);
                player1.x += enemyBulletList[key].spdX;
                enemyBulletList[key].timer++;
                if(player1.y === 385)
                  player1.canMove = false;
                else{
                  player1.confused = true;
                  confused_time = 0;
                }
      
      
                if(player1.x < 0 || player1.x + player1.w > 1400)
                  player1.canMove = true;
                }
      
          if(enemyBulletList[key].timer === 90){
                  enemyBulletList[key].timer = 0;
                  delete enemyBulletList[key];					
                  player1.canMove = true;
      
      
              } 
      
          }
      
          if(player1.confused){
            ctx.drawImage(tileset,0,130,65,40,player1.x,player1.y - 30,65,40);
            confused_time ++;
            if(confused_time === 360){
              player1.confused = false;
              confused_time = 0;
            }
          }
      
        //DELETE ENEMIES AND BULLETS
          for(let key in enemyList){
            if(enemyList[key].toRemove){
              
              if(enemyList[key].check === false){ 
                if(enemyList[key].side === 'left')
                  enemiesAtTowerLeft --;
                else
                  enemiesAtTowerRight --;
              damage -= enemyList[key].power;
              //enemiesAtTower = enemiesAtTowerRight + enemiesAtTowerLeft;
              }
              //if(enemiesAtTower < 0)
                //enemiesAtTower = 0;
              score += enemyList[key].score;
      
              if(enemyList[key].category === 'bosszombie' || enemyList[key].category === 'bossdragon' || enemyList[key].category === 'finalboss'){   
      
              //se e' il boss che e' morto fa ripartire i nemici anche dalla parte in cui si 												erano fermati
      
                right = true;
                left = true;
              }
      
              delete enemyList[key];		}
          }
          for(let key in bulletList){
            if(bulletList[key].toRemove)
              delete bulletList[key];
          }
      
        //GAME OVER
          //DRAW TOWER LIFE
          if(frameCount % 60 === 0)
            towerLife -= damage;
          if(towerLife < 0)
            towerLife = 0;
          //console.log('zombies: ' + enemiesAtTower);
          //console.log('life; ' + towerLife);
      
          ctx.fillStyle = 'black';
          ctx.fillRect(598,48,204,24);
          ctx.fillStyle = 'white';
          ctx.fillRect(600,50,200,20);
          ctx.fillStyle = 'red';
          ctx.fillRect(600,50,towerLife*2,20);
          ctx.fillText('TOWER LIFE',640,40);
      
          if(towerLife === 0){
            player1.spdX = 0;
            player1.spdY = 0;
            continue_update = false;
            for(let key in enemyList)
              enemyList[key].spdX = 0;
            ctx.fillStyle = 'white';
            ctx.fillRect(560,160,275,60);
            ctx.fillStyle = 'red';
            ctx.fillText('GAME OVER',640,180);
            ctx.font = '15px Arial';
            ctx.fillText('Press SpaceBar to play again', 600,210);
            
          }
      
      
      
          requestAnimationFrame(gameLoop);	
        }
      
        requestAnimationFrame(gameLoop);
      
        function startNewGame() {
            player1.spdX = 7;
            player1.spdY = 15;
            player1.x = 555;
            player1.y = 385;
            player1.number_of_bullets = 50;
            player1.can_shoot = true;
            player1.superjump_active = false;
            player1.got_recharge = false;
            player1.confused = false;
            player1.special_attack = false;
            player1.got_poison = false;
        
            score = 0;
            towerLife = 100;
            frameCount = 0;
            
            enemyList = {};
            bulletList = {};
            upgradeList = {};
            enemyBulletList = {};
            enemiesAtTowerRight = 0;
            enemiesAtTowerLeft = 0;
            damage = 0;
            enemies_generated = 0;
            enemy_frequency = 300;
            continue_update = true;
            
            right = true;
            left = true;
            
            poison_active = false;
            
        }
    }, [])

    return (
        <div>
            <canvas id="ctx" width="1400" height="600"></canvas>
        </div>
    )
}

export default Game