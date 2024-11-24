document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'uk';
    fetchProducts(savedLanguage);

    document.querySelector('#language-selector').value = savedLanguage;
    document.querySelector('#language-selector').addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem('language', selectedLanguage);
        fetchProducts(selectedLanguage);
    });
});

async function fetchProducts(language) {
    const response = await fetch('products.json');
    const data = await response.json();
    renderProducts(data.products, language);
}

function renderProducts(products, language) {
    const container = document.querySelector('.product-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                ${product.badge ? `<span class="badge ${product.badge.color}">${product.badge.label[language]}</span>` : ''}
                <h2>${product.category[language]}</h2>
                <img src="${product.image}" alt="${product.name[language]}">
                <p class="product-name">${product.name[language]}</p>
                ${product.price ? `
                    <p class="price">
                        ${product.price.old ? `<span class="old-price">${product.price.old} ГРН</span>` : ''}
                        <span class="new-price">${product.price.new ? product.price.new + ' ГРН' : ''}</span>
                    </p>` : ''}
                <button class="add-to-cart">${product.status[language]}</button>
            </div>`;
        container.innerHTML += productHTML;
    });
}


