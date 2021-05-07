// popup
const togglePopup = () => {
    const 	popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn');

    let count = 0,
        AnimationInterval;

    const animationPopup = () => {

        AnimationInterval = requestAnimationFrame(animationPopup);
        count++;
        if (count < 25) {
            popupContent.style.top = count * 9 + 'px';
        } else {
            cancelAnimationFrame(AnimationInterval);
        }
    };

    popupBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';

            if (window.innerWidth > 768) {
                AnimationInterval = requestAnimationFrame(animationPopup);
            }
        });
    });

    popup.addEventListener('click', event => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
            cancelAnimationFrame(AnimationInterval);
            popup.style.top = 0;
            count = 0;
        } else {
            // при клике по МО - получим МО. Если вне его, получим null
            target = target.closest('.popup-content');

            if (!target) {
                popup.style.display = 'none';
                cancelAnimationFrame(AnimationInterval);
                popup.style.top = 0;
                count = 0;
            }
        }
    });
};

export default togglePopup;
