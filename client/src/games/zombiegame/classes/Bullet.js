export default class Bullet {
    constructor(id, x, y, spdX, spdY, w, h,cannon,toRemove) {
      this.type ='bullet';
      this.x =x;
      this.spdX =spdX;
      this.y =y;
      this.spdY =spdY;
      this.name ='E';
      this.id =id;
      this.w = w;
      this.h = h;
      this.cannon = cannon;
      this.toRemove = toRemove;
      this.color = 'black';
      this.timer = 0;
    }
}