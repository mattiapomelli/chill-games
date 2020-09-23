import React, { useEffect, useContext } from "react"
import { testCollisionBetweenEntities } from "../games/cargame/actions/collision"
import {randomlyGenerateObstacle, randomlyGenerateStripe, randomlyGenerateBush, randomlyGenerateOil, randomlyGenerateGas} from "../games/cargame/actions/actions"
import Car from "../games/cargame/classes/Car"
import PoliceCar from "../games/cargame/classes/PoliceCar"
import { GameContext } from "../context/GameContext"
import { AuthContext } from "../context/AuthContext"
import {Link } from "react-router-dom"
import Register from "../components/Register"

const CarGame = () => {
    const { gameOver, setGameOver, endGame} = useContext(GameContext)
    const {isAuthenticated} = useContext(AuthContext)

    useEffect(() => {

        setGameOver(false)
        console.log('game started')
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        var myRequest;

        var gameEnded = false

        var gameStats = {obstaclesHit: 0, gasCollected: 0}

        var canvas = document.getElementById("carCanvas");
        var context = canvas.getContext("2d");
        context.font = '20px Arial';

        //Images
        var startline = new Image();
        startline.src = "images/cargame/startline.png";
        var oil = new Image();
        oil.src = "images/cargame/oil.png";
        var background = new Image();
        background.src = "images/cargame/background.png";

        var car = new Car(450 - 94/2, 470, 94, 160, "images/cargame/car.png")
        var policecar = new PoliceCar(600, -200, 94, 160, "images/cargame/policecar.png")


        var obstacleList = {};
        var stripeList = {};
        var bushList = {};
        var gasList = {};
        var oilList = {};

        var startline_y = -350;   //posizione iniziale della linea di partenza
        var start_y = -190;
        var speed_y_objects = 5;  //velocita con cui ostacoli,striscie,arbusti si muovono verso il basso;

        var continue_update = true; //se true continua a muovere ostacoli macchina striscie ecc. false quando ce game over;

        var frameCount = 0;
        var score = 0;
        var gaslevel = 5;
        var frequency = [30,60,60,90];
        var gameover = false;

        function keyDownHandler(event){
            if(event.keyCode === 37){
                car.leftPressed = true;
            }
            else if(event.keyCode === 39){
                car.rightPressed = true;
            }
        }

        function keyUpHandler(event){
            if(event.keyCode === 37){
                car.leftPressed = false;
            }
            else if(event.keyCode === 39){
                car.rightPressed = false;
            }
        }

        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

        function updateEntity(entity) {
            entity.draw(context)
            if(continue_update)
                entity.move()
        }

        function updateCar(){
            car.draw(context)
            car.move()	
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

        function updatePoliceCar(){
            policecar.draw(context)
            if(policecar.onposition)
                policecar.move(car)
        }

        function gameLoop(){
            if(gameEnded){
                console.log('end loop')
                myRequest = requestAnimationFrame(gameLoop);
                return
            }

            context.clearRect(0,0,canvas.width,canvas.height);
            frameCount++;

            context.drawImage(background, 0, 0)

            //BUSHES
            if(frameCount % frequency[Math.floor(Math.random()*3)] === 0){
                randomlyGenerateBush(bushList, Math.random()*90 + 10,-250);
                randomlyGenerateBush(bushList, Math.random()*100 + 730,-200);
            }
            for(let key in bushList){
                updateEntity(bushList[key]);
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
                randomlyGenerateStripe(stripeList);
            }
            for(let key in stripeList){
                updateEntity(stripeList[key]);
            }

            //OIL
            if(score > 28 && score < 48){
                if(frameCount % 30 === 0)
                    randomlyGenerateOil(oilList);
            }
            for(let key in oilList){
                context.drawImage(oil,oilList[key].x,oilList[key].y);
                if(continue_update)
                    oilList[key].y += oilList[key].spdY;
                let isColliding = testCollisionBetweenEntities(oilList[key], car);
                if(isColliding && continue_update)
                    car.y ++;
            }

            //GAS
            if(frameCount % 249 === 0 && continue_update){
                randomlyGenerateGas(gasList);
            }
            if(frameCount % 332 === 0 && continue_update){
                gaslevel--;
                if(gaslevel === 0)
                    gameover = true;
            }

            for(let key in gasList){
                updateEntity(gasList[key]);
                let isColliding = testCollisionBetweenEntities(gasList[key], car);
                if(isColliding){
                    delete gasList[key];
                    if(gaslevel < 5)
                        gaslevel ++;
                    console.log(gaslevel);
                }
            }
            drawGasLevel();

            

            //POLICECAR
            if(score > 26){
                policecar.y += 5;
                if(policecar.y > 530 && policecar.continue_update){
                    policecar.y = 530;
                    policecar.onposition = true;
                }
                updatePoliceCar();
                let isColliding = testCollisionBetweenEntities(policecar, car);
                if(isColliding)
                    gameover = true;
                
            }

            //OBSTACLES
            if(frameCount % 83 === 0 && continue_update && (score < 20 || score > 50)){
                randomlyGenerateObstacle(obstacleList);
            }

            for(let key in obstacleList){
                updateEntity(obstacleList[key]);
                let isColliding = testCollisionBetweenEntities(obstacleList[key], car);
                if(isColliding){
                    gameover = true;
                    continue_update = false;
                    car.speed = 0;
                    obstacleList[key].spdY = 0;
                    //console.log('collide');
                }
                if(score > 50){
                    let isCollidingPolice = testCollisionBetweenEntities(obstacleList[key], policecar);
                    if(isCollidingPolice){
                        //policecar.spdX = 0;
                        policecar.continue_update = false;
                        //console.log('police colliding');
                    }
                }
                
                }

            //CAR
            updateCar();

            if(score > 20 && score < 25)
                car.y --;

            if(score > 48 && car.y + car.height + 10 < policecar.y && policecar.continue_update)
                car.y ++;

            if(score > 50)
                policecar.spdX = 7;
            
            //GAME OVER
            if(gameover){
                    gameEnded = true
                    endGame(score, gameStats, "cargame")
                    //obstacleList[key].spdY = 0;
                    car.speed = 0;
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

            myRequest = requestAnimationFrame(gameLoop);
            console.log('loop')
        }

        myRequest = requestAnimationFrame(gameLoop);

        function startNewGame (){
            setGameOver(false)
            obstacleList = {};
            stripeList = {};
            bushList = {};
            gasList = {};
            oilList = {};
            continue_update = true;
            policecar.continue_update = true;
            frameCount = 0;
            car.speed = 8;
            car.x  = 450 - car.width/2;
            policecar.x = 600;
            policecar.y = -200;
            policecar.spdX = 5;
            startline_y = -350;
            start_y = -190;
            score = 0;
            gaslevel = 5;
            policecar.onposition = false;
            car.y = 470;
            gameover = false;
            gameEnded = false
        }

        return () => {
            cancelAnimationFrame(myRequest)
        }

    }, [endGame, setGameOver])

    return (
        <div>
        <canvas id="carCanvas" width="900" height="700"></canvas>

            { gameOver ?
                isAuthenticated ?  "New record!" :  <Register />
                :
                "playing"
            }

            <Link to="/">Quit game</Link>
        </div>
    )
}

export default CarGame