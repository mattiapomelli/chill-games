import Entity from "./Entity"

export default class PoliceCar extends Entity{

    constructor (x, y, width, height, img) {

        super(x, y,  width, height, img)
        this.spdX = 5;
        this.onposition = false;
        this.continue_update = true
    }

    move(target){
        if(this.continue_update){
            if(target.x < this.x)
                this.x -= this.spdX;
            if(target.x > this.x)
                this.x += this.spdX;
        } else {
            this.y += 5;
        }
    }
}