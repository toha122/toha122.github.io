document.addEventListener('DOMContentLoaded', () => {
    let translations = {};

    async function loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            translations = await response.json();
            updateText();
        } catch (error) {
            console.error('Error loading translation:', error);
        }
    }

    function updateText() {
        document.getElementById('greeting').textContent = translations['greeting'] || 'greeting';
        document.getElementById('farewell').textContent = translations['farewell'] || 'farewell';
    }

    document.getElementById('language-selector').addEventListener('change', function () {
        const selectedLanguage = this.value;
        loadLanguage(selectedLanguage);
    });

    loadLanguage('en');
});

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

i18next.init({
    lng: 'en', 
    debug: true,
    resources
}, function (err, t) {
    if (err) return console.error(err);
    updateContent();
});

function updateContent() {
    document.getElementById('greeting').textContent = i18next.t('greeting');
    document.getElementById('farewell').textContent = i18next.t('farewell');
}

document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, updateContent);
});

const baseURL = "https://github.com/toha122/toha122.github.io/tree/main/LR7/locales";

async function loadLanguage(lang) {
    try {
        const response = await fetch(`${baseURL}${lang}.json`);
        const translations = await response.json();
        updateText(translations);
    } catch (error) {
        console.error("Error loading translation:", error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    let translations = {};

    async function loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            translations = await response.json();
            updateText();
        } catch (error) {
            console.error('Error loading translation:', error);
        }
    }


    function updateText() {
        document.getElementById('greeting').textContent = translations['greeting'] || 'greeting';
        document.getElementById('farewell').textContent = translations['farewell'] || 'farewell';
    }

    document.getElementById('language-selector').addEventListener('change', function () {
        const selectedLanguage = this.value;
        loadLanguage(selectedLanguage);
    });

    loadLanguage('en');
});

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

i18next.init({
    lng: 'en', 
    debug: true,
    resources
}, function (err, t) {
    if (err) return console.error(err);
    updateContent();
});

function updateContent() {
    document.getElementById('greeting').textContent = i18next.t('greeting');
    document.getElementById('farewell').textContent = i18next.t('farewell');
}


document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, updateContent);
});

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

function updateContent() {
    document.getElementById('greeting').textContent = i18next.t('greeting');
    document.getElementById('farewell').textContent = i18next.t('farewell');
}

document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, updateContent);
});

