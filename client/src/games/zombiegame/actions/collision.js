function testCollisionEntity (entity1, entity2){ //between enemies and bullets  
    var rect1 = {
      x:entity1.x, //- entity1.w/2,
      y:entity1.y, //- entity1.w/2,
      width:entity1.w,
      height:entity1.h,
    }

    var rect2 = {
      x:entity2.x - entity2.w/2,
      y:entity2.y - entity2.w/2,
      width:entity2.w,
      height:entity2.h,
    }


    return testCollisionRectRect(rect1, rect2);	
}

function testCollisionEntity2 (entity1, entity2){  //between player and upgrades     
    var rect1 = {
      x:entity1.x, //- entity1.w/2,
      y:entity1.y, //- entity1.w/2,
      width:entity1.w,
      height:entity1.h,
    }

    var rect2 = {
      x:entity2.x, //- entity2.w/2,
      y:entity2.y, //- entity2.w/2,
      width:entity2.w,
      height:entity2.h,
    }


    return testCollisionRectRect(rect1, rect2);	
}

function testCollisionRectRect (rect1, rect2) {
    return rect1.x <= rect2.x + rect2.width
      && rect2.x <= rect1.x + rect1.width
      && rect1.y <= rect2.y + rect2.height
      && rect2.y <= rect1.y + rect1.height;
}

export {testCollisionEntity, testCollisionEntity2}