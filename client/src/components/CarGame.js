import React, { useEffect } from "react"

const CarGame = () => {

    useEffect(() => {
        var canvas = document.getElementById("carCanvas");
        var context = canvas.getContext("2d");
        context.font = '20px Arial';

        var carImage = new Image();
        carImage.src = "images/cargame/car.png";
        var obstacle = new Image();
        obstacle.src = "images/cargame/obstacle.png";
        var startline = new Image();
        startline.src = "images/cargame/startline.png";
        var bush = new Image();
        bush.src = "images/cargame/bush.png";
        var gas = new Image();
        gas.src = "images/cargame/gas.png";
        var policecar = new Image();
        policecar.src = "images/cargame/policecar.png";
        var oil = new Image();
        oil.src = "images/cargame/oil.png";
        var background = new Image();
        background.src = "images/cargame/background.png";

        var car_width = 94;
        var car_height = 160;
        var car_x = 450 - car_width/2;
        var car_y = 470;
        var car_speed = 8;

        var policecar_x = 600;
        var policecar_y = -200;
        var policecar_spdX = 5;
        var police_car_onposition = false;   ///true quando la macchina della polizia parte e inizia a inseguire il giocatore

        var leftPressed = false;
        var rightPressed = false;

        var obstacleList = {};
        var stripeList = {};
        var bushList = {};
        var gasList = {};
        var oilList = {};

        var startline_y = -350;   //posizione iniziale della linea di partenza
        var start_y = -190;
        var speed_y_objects = 5;  //velocita con cui ostacoli,striscie,arbusti si muovono verso il basso;

        var continue_update = true; //se true continua a muovere ostacoli macchina striscie ecc. false quando ce game over;
        var continue_update_police = true; //se true fa muovere la polizia con la macchia. se false si ferma

        var frameCount = 0;
        var score = 0;
        var gaslevel = 5;
        var frequency = [30,60,60,90];
        var gameover = false;

        function keyDownHandler(event){
            if(event.keyCode === 37){
                leftPressed = true;
            }
            else if(event.keyCode === 39){
                rightPressed = true;
            }
        }

        function keyUpHandler(event){
            if(event.keyCode === 37){
                leftPressed = false;
            }
            else if(event.keyCode === 39){
                rightPressed = false;
            }
        }

        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

        function drawCar(){
            context.drawImage(carImage,car_x,car_y,94,160);
            //
        }

        function moveCar(){
            if(leftPressed && car_x > 227)
                car_x -= car_speed;
            if(rightPressed && car_x + car_width < 673)
                car_x += car_speed;
        }

        function updateCar(){
            drawCar();
            moveCar();	
        }

        function Obstacle (id, x, y, spdY,width,height){
            var obs = {
                x:x,
                spdY:spdY,
                y:y,
                id:id,
                width:width,
                height:height,
            };
            obstacleList[id] = obs;
        }

        function randomlyGenerateObstacle(){
                var ox = Math.random()*217+220;
                var oy = -50;
                var id = Math.random();
                var spdY = speed_y_objects;
                var width = 243;
                var height = 50;

                Obstacle(id,ox,oy,spdY,width,height);
        }

        function updateObstacle(entity){
            drawObstacle(entity);
            if(continue_update)
                moveObstacle(entity);
        }

        function drawObstacle(entity){
            context.drawImage(obstacle,entity.x,entity.y,entity.width,entity.height);
            //console.log('draw');
        }

       function moveObstacle(entity){
            entity.y += entity.spdY;
            //console.log('moving');
        }

        function testCollisionWithCar(entity1,x,y){    //return if colliding (true/false)
            var rect1 = {
                x:entity1.x,// - entity1.width/2,
                y:entity1.y,// - entity1.width/2,
                width:entity1.width,
                height:entity1.height,
            }

            var rect2 = {
                x:x,
                y:y,
                width:car_width,
                height:car_height,
            }

            return testCollisionRectRect(rect1, rect2);
        }

        function testCollisionWithPolice (px,py,pwidth,pheight){    //return if colliding (true/false)
            var rect1 = {
                x:px,// - entity1.width/2,
                y:py,// - entity1.width/2,
                width:pwidth,
                height:pheight,
            }

            var rect2 = {
                x:car_x,
                y:car_y,
                width:car_width,
                height:car_height,
            }

            return testCollisionRectRect(rect1, rect2);
        }

        function testCollisionRectRect(rect1, rect2) {
            return rect1.x <= rect2.x + rect2.width
                && rect2.x <= rect1.x + rect1.width
                && rect1.y <= rect2.y + rect2.height
                && rect2.y <= rect1.y + rect1.height;
        }

        function drawStripe(entity){

            context.fillStyle = 'white';
            context.fillRect(442,entity.y,16,100)
        }

        function moveStripe(entity){
            entity.y = entity.y + entity.spdY;
            //
        }

        function Stripe (id, y, spdY){
            var strp = {
                spdY:spdY,
                y:y,
                id:id,
            };
            stripeList[id] = strp;
        }

        function randomlyGenerateStripe(){
                var stripe_y = -250;
                var id = Math.random();
                var spdY = speed_y_objects;

                Stripe(id,stripe_y,spdY);
        }

        function updateStripe(entity){
            drawStripe(entity);
            if(continue_update)
                moveStripe(entity);
        }

        function randomlyGenerateBush(x,y){
                var bush_x = x;
                var bush_y = y;
                var id = Math.random();
                var spdY = speed_y_objects;

                Bush(id,bush_x,bush_y,spdY);
        }

        function drawBush(entity){
            context.drawImage(bush,entity.x,entity.y,80,60);
            //console.log('draw');
        }

        function updateBush(entity){
            drawBush(entity);
            if(continue_update)
                moveStripe(entity);
        }

        function Bush (id,x, y, spdY){
            var bsh = {
                spdY:spdY,
                x:x,
                y:y,
                id:id,
            };
            bushList[id] = bsh;
        }

        function randomlyGenerateGas(){
                var gas_x = Math.random()*410 + 220;
                var gas_y = -260;
                var id = Math.random();
                var spdY = speed_y_objects;
                var width = 50;
                var height = 60;

                Gas(id,gas_x,gas_y,spdY,width,height);
        }

        function Gas (id,x, y, spdY,width,height){
            var gs = {
                spdY:spdY,
                x:x,
                y:y,
                id:id,
                width:width,
                height:height,
            };
            gasList[id] = gs;
        }

        function drawGas(entity){
            context.drawImage(gas,entity.x,entity.y);
            //
        }

        function updateGas(entity){
            drawGas(entity);
            if(continue_update)
                moveStripe(entity);
        }

        function drawGasLevel(){
            context.fillStyle = 'black';
            context.fillText('GAS LEVEL: ',20,30);
            context.fillRect(18,38,54,14);
            if(gaslevel<2){
                context.fillStyle = 'red';}
            else if(gaslevel<4){
                context.fillStyle = 'orange';} 
            else context.fillStyle = 'green';
            context.fillRect(20,40,gaslevel*10,10);
            context.fillStyle = 'black';
        }

        function drawPoliceCar(){
            context.drawImage(policecar,policecar_x,policecar_y,94,160);
            //
        }

        function updatePoliceCar(){
            drawPoliceCar();
            if(police_car_onposition)
                movePoliceCar();
        }

        function movePoliceCar(){
            if(continue_update_police){
                if(car_x < policecar_x)
                    policecar_x -= policecar_spdX;
                if(car_x > policecar_x)
                    policecar_x += policecar_spdX;
            } else {
                policecar_y += 5;
            }
        }

        function randomlyGenerateOil(){
                var oil_x = Math.random()*390 + 220;
                var oil_y = -50;
                var id = Math.random();
                var spdY = speed_y_objects;
                var width = 75;
                var height = 50;

                Oil(id,oil_x,oil_y,spdY,width,height);
        }

        function Oil (id,x, y, spdY,width,height){
            var ol = {
                spdY:spdY,
                x:x,
                y:y,
                id:id,
                width:width,
                height:height,
            };
            oilList[id] = ol;
        }

        function draw(){
            context.clearRect(0,0,canvas.width,canvas.height);
            frameCount++;

            context.drawImage(background, 0, 0)

            //BUSHES
            if(frameCount % frequency[Math.floor(Math.random()*3)] === 0){
                randomlyGenerateBush(Math.random()*90 + 10,-250);
                randomlyGenerateBush(Math.random()*100 + 730,-200);
            }
            for(let key in bushList){
                updateBush(bushList[key]);
            }

            //SCORE
            if(frameCount % 60 === 0 && continue_update){
                score++;	
            }
            context.fillStyle = 'black';
            context.fillText('SCORE: ' + score,775,30);



            //START LINE
            context.drawImage(startline,220,startline_y,460,86);		
            context.fillStyle = 'white';
            context.font = '70px Arial';
            context.fillText('START',340,start_y);
            if(continue_update){
                startline_y += speed_y_objects;
                start_y += speed_y_objects;
            }
            context.font = '20px Arial';

            //STRIPES
            if(frameCount % 60 === 0 && continue_update){
                randomlyGenerateStripe();
            }
            for(let key in stripeList){
                updateStripe(stripeList[key]);
            }

            //OIL
            if(score > 28 && score < 48){
                if(frameCount % 30 === 0)
                    randomlyGenerateOil();
            }
            for(let key in oilList){
                context.drawImage(oil,oilList[key].x,oilList[key].y);
                if(continue_update)
                    oilList[key].y += oilList[key].spdY;
                let isColliding = testCollisionWithCar(oilList[key],car_x,car_y);
                if(isColliding && continue_update)
                    car_y ++;
            }

            //GAS
            if(frameCount % 249 === 0 && continue_update){
                randomlyGenerateGas();
            }
            if(frameCount % 332 === 0 && continue_update){
                gaslevel--;
                if(gaslevel === 0)
                    gameover = true;
            }

            for(let key in gasList){
                updateGas(gasList[key]);
                let isColliding = testCollisionWithCar(gasList[key],car_x,car_y);
                if(isColliding){
                    delete gasList[key];
                    if(gaslevel < 5)
                        gaslevel ++;
                    console.log(gaslevel);
                }
            }
            drawGasLevel();

            

            //POLICECAR
            if(score>26){
                policecar_y += 5;
                if(policecar_y > 530 && continue_update_police){
                    policecar_y = 530;
                    police_car_onposition = true;
                }
                updatePoliceCar();
                let isColliding = testCollisionWithPolice(policecar_x,policecar_y,94,160);
                if(isColliding)
                    gameover = true;
                
            }

            //OBSTACLES
            if(frameCount % 83 === 0 && continue_update && (score < 20 || score > 50)){
                randomlyGenerateObstacle();
            }

            for(let key in obstacleList){
                    updateObstacle(obstacleList[key]);
                let isColliding = testCollisionWithCar(obstacleList[key],car_x,car_y);
                if(isColliding){
                    gameover = true;
                    continue_update = false;
                    car_speed = 0;
                    obstacleList[key].spdY = 0;
                    //console.log('collide');
                }
                if(score > 50){
                    let isCollidingPolice = testCollisionWithCar(obstacleList[key],policecar_x,policecar_y);
                    if(isCollidingPolice){
                        //policecar_spdX = 0;
                        continue_update_police = false;
                        //console.log('police colliding');
                    }
                }
                
                }

            //CAR
            updateCar();

            if(score > 20 && score < 25)
                car_y --;

            if(score > 48 && car_y + car_height + 10 < policecar_y && continue_update_police)
                car_y ++;

            if(score > 50)
                policecar_spdX = 7;
            
            //GAME OVER
            if(gameover){
                    //obstacleList[key].spdY = 0;
                    car_speed = 0;
                    continue_update = false;
                    //console.log('collide');
                    context.fillStyle = 'black';
                    context.fillRect(332,282,236,86);
                    context.fillStyle = 'white';
                    context.fillRect(335,285,230,80);
                    context.fillStyle = 'black';
                    //context.font = '20px Arial';

                    context.fillText('GAME OVER',390,310);
                    context.fillText('SCORE: ' + score,400,330);
                    context.fillText('CLICK TO PLAY AGAIN',340,350);

                    document.onclick = function(mouse){
                        startNewGame();
                    }
                }

            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);

        function startNewGame (){
            obstacleList = {};
            stripeList = {};
            bushList = {};
            gasList = {};
            oilList = {};
            continue_update = true;
            continue_update_police = true;
            frameCount = 0;
            car_speed = 8;
            car_x  = 450 - car_width/2;
            policecar_x = 600;
            policecar_y = -200;
            policecar_spdX = 5;
            startline_y = -350;
            start_y = -190;
            score = 0;
            gaslevel = 5;
            police_car_onposition = false;
            car_y = 470;
            gameover = false;
        }


    })

    return (
        <canvas id="carCanvas" width="900" height="700"></canvas>
    )
}

export default CarGame