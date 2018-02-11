function handleKeyEvent(e) {
    var keydown = e.type === 'keydown';
    //    console.log(e.key +": "+e.type);
    //    console.log(e);
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            if (keydown) {
                state.player.dir.y = -1;
            } else {
                state.player.dir.y = 0;
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if (keydown) {
                state.player.dir.x = -1;
            } else {
                state.player.dir.x = 0;
            }
            break;
        case 's':
        case 'ArrowDown':
            if (keydown) {
                state.player.dir.y = 1;
            } else {
                state.player.dir.y = 0;
            }
            break;
        case 'd':
        case 'ArrowRight':
            if (keydown) {
                state.player.dir.x = 1;
            } else {
                state.player.dir.x = 0;
            }
            break;
        case ' ':
            if (keydown) {
                shootNormal();
            }
            break;
        case 'f':
            if (keydown) {
                shootBig();
            }
            break;
        case 't':
            if (keydown) {
                shootTiny();
            }
            break;
        case 'g':
            if (keydown) {
                shootIcy();
            }
            break;
    }
}