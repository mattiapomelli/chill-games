import Bullet from "../classes/Bullet"

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

export {generateBullet}