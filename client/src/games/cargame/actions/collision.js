function testCollisionBetweenEntities (entity1, entity2){    //return if colliding (true/false)
    var rect1 = {
        x: entity1.x,
        y: entity1.y,
        width: entity1.width,
        height: entity1.height,
    }

    var rect2 = {
        x: entity2.x,
        y: entity2.y,
        width: entity2.width,
        height: entity2.height,
    }

    return testCollisionRectRect(rect1, rect2);
}

function testCollisionRectRect(rect1, rect2) {
    return rect1.x <= rect2.x + rect2.width
        && rect2.x <= rect1.x + rect1.width
        && rect1.y <= rect2.y + rect2.height
        && rect2.y <= rect1.y + rect1.height;
}

export {testCollisionBetweenEntities}