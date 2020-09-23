import Entity from "./Entity"

export default class Car extends Entity{

    constructor(x, y, width, height, img) {
        super(x, y,  width, height, img)


        this.speed = 16;
        this.leftPressed = false;
        this.rightPressed = false;
    }

    move(){
        if(this.leftPressed && this.x > 227)
            this.x -= this.speed;
        if(this.rightPressed && this.x + this.width < 673)
            this.x += this.speed;
    }
}