export default class Oil {

    constructor (id,x, y, spdY,width,height) {
        this.spdY = spdY
        this.x = x
        this.y = y
        this.id = id
        this.width = width
        this.height = height
        this.img = new Image();
        this.img.src = "images/cargame/oil.png";
    }
}