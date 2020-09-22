export default class Stripe {

    constructor (id, y, spdY) {
        this.spdY = spdY;
        this.y = y;
        this.id = id;
    }

    move() {
        this.y = this.y + this.spdY;
    }
}