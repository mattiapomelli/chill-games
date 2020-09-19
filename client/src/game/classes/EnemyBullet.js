export default class EnemyBullet {
    constructor(id, x, y, spdX, spdY, w, h, toRemove,side) {
     this.x =x;
     this.spdX =spdX;
     this.y =y;
     this.spdY =spdY;
     this.id =id;
     this.w = w;
     this.h = h;
     this.toRemove = toRemove;
     this.side = side;
     this.timer = 0;
    }
}