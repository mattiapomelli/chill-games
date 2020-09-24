import React, { useEffect, useContext } from "react"
import { testCollisionBetweenEntities } from "../games/cargame/actions/collision"
import {randomlyGenerateObstacle, randomlyGenerateStripe, randomlyGenerateBush, randomlyGenerateOil, randomlyGenerateGas} from "../games/cargame/actions/actions"
import Car from "../games/cargame/classes/Car"
import PoliceCar from "../games/cargame/classes/PoliceCar"
import { GameContext } from "../context/GameContext"
import { AuthContext } from "../context/AuthContext"
import {Link } from "react-router-dom"
import "../css/games.css"

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

        /* Buffer */
        let buffer;

        let screen_h, screen_w;

        let map_ratio = 900/700;
        //let map_scale = 1;

        let canvas = document.getElementById("carCanvas");
        let context = canvas.getContext("2d");
        context.font = '20px Arial';
        context.imageSmoothingEnabled = false;

        buffer = document.createElement('canvas').getContext('2d')
        buffer.imageSmoothingEnabled = false;
        buffer.font = '20px Arial';

        screen_h = document.documentElement.clientHeight * 0.8
        screen_w = document.documentElement.clientWidth

        buffer.canvas.height = 700;
        buffer.canvas.width = 900;

        function scaleCanvas(){
            screen_h = document.documentElement.clientHeight *0.8
            screen_w = document.documentElement.clientWidth
          
            if(screen_h / buffer.canvas.height < screen_w / buffer.canvas.width) screen_w = screen_h * map_ratio;
                  else screen_h = screen_w / map_ratio;
          
            //map_scale = screen_h / (700);
          
            canvas.height = screen_h;
            canvas.width = screen_w;
          
            context.imageSmoothingEnabled = false;
        }

        //Images
        var startline = new Image();
        startline.src = "/images/cargame/startline.png";
        var oil = new Image();
        oil.src = "/images/cargame/oil.png";
        var background = new Image();
        background.src = "/images/cargame/background.png";

        var car = new Car(450 - 94/2, 470, 94, 160, "/images/cargame/car.png")
        var policecar = new PoliceCar(600, -200, 94, 160, "/images/cargame/policecar.png")


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

            if(event.keyCode === 32 && gameover){
                startNewGame();
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
            buffer.drawImage(entity.img, entity.x, entity.y, entity.width, entity.height);
            //entity.draw(buffer)
            if(continue_update)
                entity.move()
        }

        function updateCar(){
            buffer.drawImage(car.img, car.x, car.y, car.width, car.height);
            car.move()	
        }

        function drawGasLevel(){
            buffer.fillStyle = 'black';
            buffer.fillText('GAS LEVEL: ',20,30);
            buffer.fillRect(18,38,54,14);
            if(gaslevel<2){
                buffer.fillStyle = 'red';}
            else if(gaslevel<4){
                buffer.fillStyle = 'orange';} 
            else buffer.fillStyle = 'green';
            buffer.fillRect(20,40,gaslevel*10,10);
            buffer.fillStyle = 'black';
        }

        function updatePoliceCar(){
            buffer.drawImage(policecar.img, policecar.x, policecar.y, policecar.width, policecar.height);
            if(policecar.onposition)
                policecar.move(car)
        }

        function gameLoop(){
            scaleCanvas();
            if(gameEnded){
                console.log('end loop');
                context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, canvas.width, canvas.height);
                myRequest = requestAnimationFrame(gameLoop);
                return
            }

            buffer.clearRect(0,0,canvas.width,canvas.height);
            frameCount++;

            buffer.drawImage(background, 0, 0)

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
            buffer.fillStyle = 'black';
            buffer.fillText('SCORE: ' + score,775,30);



            //START LINE
            buffer.drawImage(startline,220,startline_y,460,86);		
            buffer.fillStyle = 'white';
            buffer.font = '70px Arial';
            buffer.fillText('START',340,start_y);
            if(continue_update){
                startline_y += speed_y_objects;
                start_y += speed_y_objects;
            }
            buffer.font = '20px Arial';

            //STRIPES
            if(frameCount % 60 === 0 && continue_update){
                randomlyGenerateStripe(stripeList);
            }
            for(let key in stripeList){
                stripeList[key].draw(buffer)
                stripeList[key].move()
            }

            //OIL
            if(score > 28 && score < 48){
                if(frameCount % 30 === 0)
                    randomlyGenerateOil(oilList);
            }
            for(let key in oilList){
                buffer.drawImage(oil,oilList[key].x,oilList[key].y);
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
            if(frameCount % 300 === 0 && continue_update){    //332
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
                let isColliding = testCollisionBetweenEntities(obstacleList[key], car);
                if(isColliding){
                    gameover = true;
                    continue_update = false;
                    car.speed = 0;
                    obstacleList[key].spdY = 0;
                    //console.log('collide');
                }
                updateEntity(obstacleList[key]);
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
                    buffer.fillStyle = 'black';
                    buffer.fillRect(332,282,236,86);
                    buffer.fillStyle = 'white';
                    buffer.fillRect(335,285,230,80);
                    buffer.fillStyle = 'black';
                    //buffer.font = '20px Arial';

                    buffer.fillText('GAME OVER',390,310);
                    buffer.fillText('SCORE: ' + score,400,330);
                    buffer.font = '17px Arial';
                    buffer.fillText('Press spacebar to play again',340,350);
                    buffer.font = '20px Arial';
                }

            context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, canvas.width, canvas.height);

            myRequest = requestAnimationFrame(gameLoop);
            console.log('loop')
        }

        myRequest = requestAnimationFrame(gameLoop);

        function startNewGame (){
            setGameOver(false)
            car.speed = 8;
            car.x  = 450 - car.width/2;
            car.y = 470;

            policecar.x = 600;
            policecar.y = -200;
            policecar.spdX = 5;
            policecar.continue_update = true;
            policecar.onposition = false;

            obstacleList = {};
            stripeList = {};
            bushList = {};
            gasList = {};
            oilList = {};
            continue_update = true;
            
            frameCount = 0;
            
            startline_y = -350;
            start_y = -190;
            score = 0;
            gaslevel = 5;
            
            gameover = false;
            gameEnded = false
        }

        return () => {
            cancelAnimationFrame(myRequest)
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }

    }, [endGame, setGameOver])

    return (
        <div>
        <div className="canvas-container">
            <canvas id="carCanvas" width="900" height="700"></canvas>
        </div>



        <div className="controls-container">
            {gameOver && !isAuthenticated && <div className="gameover-message">Register to keep track of your scores and statistics</div>}

            <div className="buttons-container">
                {gameOver && !isAuthenticated && <Link to="/register" className="primary-button button">Sign up</Link>}
                <Link to="/" className="secondary-button button">Comands</Link>
                <Link to="/" className="secondary-button button">Exit</Link>
            </div>
        </div>

        </div>
    )
}

export default CarGame