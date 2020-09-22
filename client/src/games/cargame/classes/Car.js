export default class Car {
    constructor() {
        this.width = 94;
        this.height = 160;
        this.x = 450 - this.width/2;
        this.y = 470;
        this.speed = 8;
        this.leftPressed = false;
        this.rightPressed = false;
        this.img = new Image();
        this.img.src = "images/cargame/car.png";
    }

    move(){
        if(this.leftPressed && this.x > 227)
            this.x -= this.speed;
        if(this.rightPressed && this.x + this.width < 673)
            this.x += this.speed;
    }
}