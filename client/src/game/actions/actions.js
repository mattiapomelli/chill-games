import Bullet from "../classes/Bullet"
import Enemy from "../classes/Enemy"
import Upgrade from "../classes/Upgrade"
import EnemyBullet from "../classes/EnemyBullet"

function generateBullet (list, actor, x,y,cannon,overwriteAngle){
    var h = 15;    
    var w = 15;
    var id = Math.random();
    var toRemove = false;

    var angle = actor.aimAngle;
    if(overwriteAngle !== undefined){
        angle = overwriteAngle;
    }

    if(cannon === 'one'){       
        if(angle > -173 && angle < 0)  //non fa sparare il proiettile oltre la pendenza dell area consentita
          angle = -173;
        if(angle >= 0 && angle < 130)
          angle = 130;
    }
    else if(cannon === 'two'){
        if(angle > 55 && angle <= 180)
          angle = 55;
        if(angle < -6)
          angle = -6;
    }

    var spdX = Math.cos(angle/180*Math.PI)*5;   //convert angle in radiants
    var spdY = Math.sin(angle/180*Math.PI)*5;
    list[id] = new Bullet(id,x,y,spdX,spdY,w,h,cannon,toRemove)
    //Bullet(id,x,y,spdX,spdY,w,h,cannon,toRemove);
}

function randomlyGenerateEnemy (list, category,x,y,spdX,w,h,sprites,hp, side, power, score, push){
	var id = Math.random();
	var spdY;
	if(category === 'blob')
		spdY = 12;
	else
		spdY = 0;
	var toRemove = false;
	var atTower = false;
	var check = true;

	list[id] = new Enemy(id,x,y,spdX,spdY,w,h,sprites,hp,toRemove,atTower,check, side, power,category,score,push);
}

function randomlyGenerateUpgrade (list, frameCount, c,s){
	var x = Math.random() < 0.5 ? Math.random()*400 + 100 : Math.random()*400 + 900;						//Math.random() * 1200 + 100;
	var y = Math.random()*20 + 275;
	var h = 35;     //between 10 and 40
	var w = 35;
	var id = Math.random();
	var spdX = 0;
	var spdY = 0;
	var category;
	var sprites;
	
	if(frameCount <= 7000){     //<=7000
		let n = Math.random();
		if(n < 0.4){   //0.4
			category = 'recharge';
			sprites = [{x:130,y:20,w:35,h:35}];
		}
		else if(n >= 0.4 && n < 0.8){
			category = 'poison';
			sprites = [{x:130,y:56,w:35,h:35}];
		}
		else {
			category = 'attackspeed';
			sprites = [{x:130,y:90,w:35,h:35}];
		}
	}

	if(frameCount > 7000 && frameCount <= 11500){
		let n = Math.random();
		if(n < 0.5){
			category = 'recharge';
			sprites = [{x:130,y:20,w:35,h:35}];
		}
		else if(n >=0.5 && n < 0.9){
			category = 'jump';
			sprites = [{x:130,y:125,w:35,h:35}]
		}
		else if(n >=0.9 && n < 0.95){
			category = 'poison';
			sprites = [{x:130,y:55,w:35,h:35}];
		}
		else {
			category = 'attackspeed';
			sprites = [{x:130,y:90,w:35,h:35}];
		}
	}

	if(frameCount > 11500){
		var n = Math.random();
		if(n < 0.1){
			category = 'jump';
			sprites = [{x:130,y:125,w:35,h:35}]
		}
		else if(n >= 0.1 && n < 0.3){
			category = 'recharge';
			sprites = [{x:130,y:20,w:35,h:35}];
		}
		else if(n >= 0.3 && n < 0.5){
			category = 'attackspeed';
			sprites = [{x:130,y:90,w:35,h:35}];
		}
		else{
			category = 'special_attack';
			sprites = [{x:130,y:161,w:35,h:35}];
		}
	}

	if(c !== undefined && s!== undefined){
		category = c;
		sprites = s;
	}

	list[id] = new Upgrade(id,x,y,spdX,spdY,w,h,category,sprites)
}

function generateEnemyBullet (list, x,y,entity,side, target){
	var h = 15;    
	var w = 15;
	var id = Math.random();
	var toRemove = false;

	var angle = Math.atan2(target.y - (y + 160), target.x - (x + 125)) / Math.PI * 180;

	//var spdX = (target.x - entity.x) % 1000;
	//var spdY = (target.y - entity.y) % 1000;
	var spdX = Math.cos(angle/180*Math.PI)*5;   //convert angle in radiants
	var spdY = Math.sin(angle/180*Math.PI)*5;
	list[id] = new EnemyBullet(id,x + 125,y + 160,spdX,spdY,w,h,toRemove,side);
}

export { generateBullet, randomlyGenerateEnemy, randomlyGenerateUpgrade, generateEnemyBullet }