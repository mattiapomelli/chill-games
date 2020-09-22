export default class PoliceCar {
    constructor() {
        this.width = 94;
        this.height = 160;
        this.x = 600;
        this.y = -200;
        this.spdX = 5;
        this.onposition = false;
        this.img = new Image();
        this.img.src = "images/cargame/policecar.png";
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