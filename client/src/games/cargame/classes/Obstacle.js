import Entity from "./Entity"

export default class Obstacle extends Entity {

    constructor(x, y,  width, height, img, id, spdY) {
        super(x, y,  width, height, img)


        this.spdY = spdY;
        this.id = id;
    }

}