// menu
const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', event => {
        const target = event.target;

        if (menu.classList.contains('active-menu')) {
            if (target.closest('menu')) {
                if (target.classList.contains('close-btn') || target.classList.contains('scroll-link')) {
                    handlerMenu();
                }
            }

            if (!target.closest('menu')) {
                handlerMenu();
            }
        } else if (target.closest('.menu')) {
            handlerMenu();
        }
    });
};

export default toggleMenu;
