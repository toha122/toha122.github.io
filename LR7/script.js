document.addEventListener('DOMContentLoaded', () => {
    let translations = {};

    // Завантаження мови з JSON-файлу
    async function loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            translations = await response.json();
            updateText();
        } catch (error) {
            console.error('Error loading translation:', error);
        }
    }

    // Оновлення тексту на сторінці
    function updateText() {
        document.getElementById('greeting').textContent = translations['greeting'] || 'greeting';
        document.getElementById('farewell').textContent = translations['farewell'] || 'farewell';
    }

    // Слухач події для вибору мови
    document.getElementById('language-selector').addEventListener('change', function () {
        const selectedLanguage = this.value;
        loadLanguage(selectedLanguage);
    });

    // Завантажити переклади за замовчуванням
    loadLanguage('en');
});

// Ініціалізація i18next для локалізації
const resources = {
    en: {
        translation: {
            "greeting": "Hello",
            "farewell": "Goodbye"
        }
    },
    uk: {
        translation: {
            "greeting": "Привіт",
            "farewell": "До побачення"
        }
    }
};

// Ініціалізація i18next
i18next.init({
    lng: 'en',
    debug: true,
    resources
}, function (err, t) {
    if (err) return console.error(err);
    updateContent();
});

// Оновлення контенту через i18next
function updateContent() {
    document.getElementById('greeting').textContent = i18next.t('greeting');
    document.getElementById('farewell').textContent = i18next.t('farewell');
}

// Слухач події для зміни мови через i18next
document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, updateContent);
});

// Ініціалізація i18next з backend для завантаження перекладів з JSON
i18next.use(i18nextHttpBackend).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    backend: {
        loadPath: './locales/{{lng}}.json'
    }
}, function (err, t) {
    if (err) return console.error('Помилка ініціалізації i18next:', err);
    updateContent();
});

