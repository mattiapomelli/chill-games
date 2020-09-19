export default class Player {
    constructor(x,y,sprites,punch) {
        this.x = x;
        this.y = y;
        this.w = 65;
        this.h = 65;
        this.spdX = 7;
        this.spdY = 15;
        this.attackSpd = 5;        //quanto e' veloce un pugno
        this.attack_timer = 30;    //ogni quanto puo tirare un pugno
        //this.img = tileset;
    
        //this.sprites = {};
        this.sprites = sprites;
        this.punch = punch;
        this.aimAngle = 0;
    }      
}