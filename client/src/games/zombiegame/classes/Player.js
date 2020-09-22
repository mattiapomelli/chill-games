import {generateBullet} from "../actions/actions"


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


        this.leftPressed = false;
        this.rightPressed = false;
        this.jumpPressed = false;
        this.jumpUp = false;
        this.canMove = true;
        this.attackPressed = false;
        this.downPressed = false;
        this.attack = false;
        this.attack_go = false;
        this.attack_back = false;
        this.attack_x = 0;
        this.timer = 0; //timer per i pugni

        this.climbing = false;
        this.onTower = false;
        this.superjump_active = false;
        this.number_of_bullets = 50;
        this.can_shoot = true;
        this.got_recharge = false;
        this.special_bullets = 0;
        this.attack_speeded_up = false;    //true quando l'upgrade attackspeed e' attivato
        this.special_attack = false;
        this.sick = false;                 //true quando il giocatore e' infettato da uno zombie ed e' lento
        this.got_poison = false;
        this.confused = false;

        this.leftFace = false;  //true if player is facing left
        this.rightFace = false; //true if player is facing right
    }


    jump(){
        //console.log(this.climbing);
        if(this.x > 643 && this.x < 687 && this.y >= 183){
          if(this.jumpPressed && this.canMove){
            this.y -= 5;
            this.climbing = true;
            if(this.y < 183){
              this.y = 183;
              this.onTower = true;
            }
  
          }
        }
        else if(this.jumpPressed && !this.onTower && this.canMove){
          this.jumpUp = true;
          }
        if(this.jumpUp){
          this.y -= this.spdY;
          this.spdY --;
          if(this.spdY < -16)
            this.spdY = -16;
  
          if(this.y >= 385){
            this.y = 385;
            this.jumpUp = false;
            if(this.superjump_active)
              this.spdY = 22;
            else
              this.spdY = 15;
          }
        }
        if(this.downPressed && this.y < 385 && this.x > 640 && this.x < 690){
          this.y += 5;
          if(this.y > 200)
            this.onTower = false;
          if(this.y >= 385){
            this.y = 385;
          }
        }
        if(this.y === 385){
          this.climbing = false;
          this.onTower = false;
        }
    }

    performAttack(list) {
        //if(actor.attackCounter > 25){   //every 1 sec	
          //actor.attackCounter = 0;
        if(this.x === 650 && this.y === 183){        //checks if the player is in the right position to shoot(next to the cannon one)
          generateBullet(list, this,630,220,'one');
          //console.log('one
          this.number_of_bullets--;	}
  
        if(this.x === 685 && this.y === 183){        //checks if the player is in the right position to shoot(next to the cannon two)
          generateBullet(list, this,775,220,'two');
          //console.log('two');
          this.number_of_bullets--;
        }
    }

    performSpecialAttack(list) {
        if(this.x === 650 && this.y === 183){      
          generateBullet(list, this,630,220,'one');
          generateBullet(list, this,630,220,'one',this.aimAngle + 10);
          generateBullet(list, this,630,220,'one',this.aimAngle - 10);
  
          this.number_of_bullets--;	
        }
  
        if(this.x === 685 && this.y === 183){       
          generateBullet(list, this,775,220,'two');
          generateBullet(list, this,775,220,'two',this.aimAngle + 10);
          generateBullet(list, this,775,220,'two',this.aimAngle - 10);
          this.number_of_bullets--;
        }
        this.special_bullets ++;
    }

    attackRight(list) {
        if(this.attackPressed && this.timer > this.attack_timer){
          this.attack = true;
          this.attack_go = true;
          this.attack_back = false;
          this.timer = 0;
          }
        if(this.attack){
  
          if(this.attack_go){
            this.attack_x += this.attackSpd;
            for(var key in list){
              if(this.x + this.attack_x + 70 > list[key].x + 10 && this.x + this.w < list[key].x && 
              this.y + this.h/2 - 10 < list[key].y + list[key].h && this.y + this.h/2 - 10 + 20 > list[key].y ){
                this.attack_back = true;
                this.attack_go = false;
                list[key].x += list[key].push;
                list[key].hp --;
                if(list[key].hp === 0){
                  //delete list[key];
                  list[key].toRemove = true;
                }
              }
            }
          }
  
  
          if(this.attack_x > 65){
            this.attack_back = true;
            this.attack_go = false;
          }
          if(this.attack_back)
            this.attack_x -= this.attackSpd;
          if(this.attack_x < 0){
            this.attack = false;
            this.attack_x = 0;
          }
        }
    }

    attackLeft(list) {
        if(this.attackPressed && this.timer > this.attack_timer){
          this.attack = true;
          this.attack_go = true;
          this.attack_back = false;
          this.timer = 0;
          }
        if(this.attack){
  
          if(this.attack_go){
            this.attack_x -= this.attackSpd;
            for(var key in list){
            if(this.x + this.attack_x - 5 < list[key].x + list[key].w - 10 && this.x > list[key].x + list[key].w &&
              this.y + this.h/2 - 10 < list[key].y + list[key].h && this.y + this.h/2 - 10 + 20 > list[key].y){
                this.attack_back = true;
                this.attack_go = false;
                list[key].x -= list[key].push;
                list[key].hp --;
                if(list[key].hp === 0){
                  //delete list[key];
                  list[key].toRemove = true;
                }
  
              }
            }
          }
  
          if(this.attack_x < -65){
            this.attack_back = true;
            this.attack_go = false;
          }
          if(this.attack_back)
            this.attack_x += this.attackSpd;
          if(this.attack_x > 0){
            this.attack = false;
            this.attack_x = 0;
          }
        }
    }
}