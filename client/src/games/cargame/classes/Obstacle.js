export default class Obstacle {

    constructor(id, x, y, spdY,width,height) {
        this.x = x;
        this.spdY = spdY;
        this.y = y;
        this.id = id;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "images/cargame/obstacle.png";
    }

    move () {
        this.y += this.spdY;
    }
}