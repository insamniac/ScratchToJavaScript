
PAUSED = false;

window.addEventListener('keydown', handleKeyEvent, false);
window.addEventListener('keyup', handleKeyEvent, false);

function handleKeyEvent(e) {
    if (PAUSED && e.key != 'p' && e.key != 'm') {
        return;
    }

    if (GAMEOVER) {
        resetState();
    }


    var keydown = e.type === 'keydown';
    //    console.log(e.key +": "+e.type);
    //    console.log(e);
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            if (keydown) {
                player.dir.y = -1;
            } else {
                player.dir.y = 0;
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if (keydown) {
                player.dir.x = -1;
                player.facing = 'left';
            } else {
                player.dir.x = 0;
            }
            break;
        case 's':
        case 'ArrowDown':
            if (keydown) {
                player.dir.y = 1;
            } else {
                player.dir.y = 0;
            }
            break;
        case 'd':
        case 'ArrowRight':
            if (keydown) {
                player.facing = 'right';
                player.dir.x = 1;
            } else {
                player.dir.x = 0;
            }
            break;
        case ' ':
            if (keydown) {
                shootNormal();
            }
            break;

        case 'p':
            if (keydown) {
                PAUSE_CONTROL.click();
            }
            break;
        case 'm':
            if (keydown) {
                VOLUME_CONTROL.click();
            }
            break;
    }
}
