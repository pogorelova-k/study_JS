const dateImg = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    // Изменение картинок команды, при наведении
    commandPhoto.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.src = image.dataset.img;
        });
    });
};

export default dateImg;
