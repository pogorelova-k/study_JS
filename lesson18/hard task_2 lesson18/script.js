'strict()';

let   circle = document.querySelector('.circle'),
        start = document.querySelector('.btn-start'),
        reset = document.querySelector('.btn-reset'),
        count = 0,
        idInterval,
        animate = false;

reset.disabled = true;

let animationDown = () => {
    idInterval = requestAnimationFrame(animationDown);
    count++;
    if (count < 180) {
        circle.style.top = count*3 + 'px';
    } else {
        cancelAnimationFrame(idInterval);
    }

}

start.addEventListener('click', () => {
    
    if (!animate) {
        idInterval = requestAnimationFrame(animationDown);
        animate = true;
        reset.disabled = false;
    } else {
        animate = false;
        cancelAnimationFrame(idInterval);
        reset.disabled = false;
    }
})

reset.addEventListener('click', () => {
    cancelAnimationFrame(idInterval);
    count = 0;
    circle.style.top = count;
    reset.disabled = true;
});