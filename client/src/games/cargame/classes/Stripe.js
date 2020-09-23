import Entity from "../classes/Entity"

export default class Stripe extends Entity{

    constructor (x, y, width, height, id, spdY) {
        super(x, y,  width, height)

        this.spdY = spdY
        this.id = id
    }

    draw(context) {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}