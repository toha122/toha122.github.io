window.onload = function () {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0'; // Початкове значення
        setTimeout(() => {
            bar.style.width = width; // Плавно змінюємо ширину
        }, 500); // Невелика затримка
    });
};

document.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

