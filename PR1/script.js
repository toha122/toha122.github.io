
    var input = document.querySelector("#phone");
    window.intlTelInput(input, {
        initialCountry: "ua", 
        preferredCountries: ["ua", "us", "gb"], 
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    document.addEventListener('DOMContentLoaded', function () {
        var input = document.querySelector("#phone");
        intlTelInput(input, {
        });
    });
    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.querySelector("#phone");
        intlTelInput(phoneInput);

        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(countries => {
                const locationSelect = document.querySelector('#location');
                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.cca2; 
                    option.text = country.name.common;
                    locationSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading country data:', error));
    });
