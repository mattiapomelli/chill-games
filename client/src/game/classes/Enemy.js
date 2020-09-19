export default class Enemy {
    constructor(id, x, y, spdX, spdY, w, h, sprites,hp, toRemove,atTower,check,side, power,category,score,push) {
      this.x = x;
      this.spdX = spdX;
      this.y = y;
      this.spdY = spdY;
      this.id = id;
      this.w =  w;
      this.h =  h;
      this.sprites =  sprites;
      this.hp =  hp;
      this.toRemove =  toRemove;
      this.atTower =  atTower;
      this.check =  check;
      this.side =  side;
      this.power =  power;
      this.score =  score;        //di quanto fa aumentare lo score quando viene ucciso
      this.push =  push;          //quanto indietreggia quando viene colpito col pugno
      this.category =  category
    }

    //enemyList[this.id] = this;
  }