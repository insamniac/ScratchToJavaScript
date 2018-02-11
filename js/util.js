function randomBetween(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

function areTouching(obj1, obj2) {
    var dx = obj1.pos.x - obj2.pos.x;
    var dy = obj1.pos.y - obj2.pos.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < (obj1.size / 2 + obj2.size / 2));
}