export default class Entity {
    constructor (x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = img
    }

    draw(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.spdY
    }
}