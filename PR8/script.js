document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        if (button.classList.contains('disabled')) {
            button.addEventListener('click', () => {
                alert('Цей товар ще не доступний для замовлення.');
            });
        } else if (button.classList.contains('add-to-cart')) {
            button.addEventListener('click', () => {
                alert('Товар додано до кошика!');
            });
        }
    });

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    let currentIndex = 0;

    function updateCarousel() {
        const productWidth = document.querySelector('.product').offsetWidth;
        carouselWrapper.style.transform = `translateX(-${currentIndex * (productWidth + 20)}px)`;
    }

    nextButton.addEventListener('click', () => {
        const totalProducts = document.querySelectorAll('.product').length;
        if (currentIndex < totalProducts - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    updateCarousel();
});
