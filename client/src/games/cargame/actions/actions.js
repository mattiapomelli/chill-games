import Obstacle from "../classes/Obstacle"
import Stripe from "../classes/Stripe"
import Bush from "../classes/Bush"
import Oil from "../classes/Oil"
import Gas from "../classes/Gas"

function randomlyGenerateObstacle(list){
    var ox = Math.random()*217+220;
    var oy = -50;
    var id = Math.random();
    var spdY = 5;
    var width = 243;
    var height = 50;

    list[id] = new Obstacle(ox, oy, width, height, "images/cargame/obstacle.png", id, spdY);
}

function randomlyGenerateStripe(list){
    var stripe_y = -250;
    var id = Math.random();
    var spdY = 5;

    list[id] = new Stripe(442, stripe_y, 16, 100, id, spdY);
}

function randomlyGenerateBush(list, x, y){
    var bush_x = x;
    var bush_y = y;
    var id = Math.random();
    var spdY = 5;

    list[id] = new Bush(bush_x,bush_y, 80, 60, "images/cargame/bush.png", id, spdY);
}

function randomlyGenerateOil(list){
    var oil_x = Math.random()*390 + 220;
    var oil_y = -50;
    var id = Math.random();
    var spdY = 5;
    var width = 75;
    var height = 50;

    list[id] = new Oil(oil_x, oil_y, width, height, "images/cargame/oil.png", id, spdY);
}

function randomlyGenerateGas(list){
    var gas_x = Math.random()*410 + 220;
    var gas_y = -260;
    var id = Math.random();
    var spdY = 5;

    list[id] = new Gas(gas_x, gas_y, 50, 60, "images/cargame/gas.png", id, spdY);
}

export {randomlyGenerateObstacle, randomlyGenerateStripe, randomlyGenerateBush, randomlyGenerateOil, randomlyGenerateGas}