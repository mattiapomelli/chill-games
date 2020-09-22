export default class Bush {

    constructor (id,x, y, spdY){
        this.spdY = spdY
        this.x = x
        this.y = y
        this.id = id
        this.width = 80
        this.height = 60
        this.img = new Image();
        this.img.src = "images/cargame/bush.png";
    }

}