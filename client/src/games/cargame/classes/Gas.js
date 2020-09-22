export default class Gas {

    constructor (id,x, y, spdY) {
        this.spdY = spdY
        this.x = x
        this.y = y
        this.id = id
        this.width = 50
        this.height = 60
        this.img = new Image();
        this.img.src = "images/cargame/gas.png";
    }
}