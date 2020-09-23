export default class Stripe {

    constructor (id, spdY) {

        this.x = 442;
        this.y = -250;
        this.width = 16;
        this.height = 100;
        this.spdY = spdY
        this.id = id
    }

    draw(context) {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    move() {
        this.y += this.spdY
    }
}