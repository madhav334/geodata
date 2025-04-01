// Function to fetch countries by continent from the API
async function fetchCountriesByContinent(continent) {
    const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`);
    const countries = await response.json();
    return countries;
}

// Show countries for the selected continent
async function showCountries(continent) {
    const countriesSection = document.getElementById('countries-section');
    const continentName = document.getElementById('continent-name');
    const countriesList = document.getElementById('countries-list');
    
    continentName.innerHTML = continent;
    countriesList.innerHTML = ''; // Clear previous countries
    
    // Fetch countries for this continent
    const continentCountries = await fetchCountriesByContinent(continent);

    continentCountries.forEach(country => {
        const countryBox = document.createElement('div');
        countryBox.classList.add('country-box');
        countryBox.style.backgroundImage = `url(${country.flags.png})`;

        const countryName = document.createElement('span');
        countryName.innerText = country.name.common;

        countryBox.appendChild(countryName);
        countryBox.onclick = () => showCountryInfo(country);

        countriesList.appendChild(countryBox);
    });

    countriesSection.style.display = 'block';
    document.getElementById('continent-grid').style.display = 'none';
}

// Show detailed information about a country
function showCountryInfo(country) {
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
        <h3>${country.name.common}</h3>
        <img src="${country.flags.png}" alt="${country.name.common} Flag" width="100">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
    `;
    document.getElementById('country-info-section').style.display = 'block';
    document.getElementById('countries-section').style.display = 'none';
}

// Go back to the continents list
function goBackToContinents() {
    document.getElementById('countries-section').style.display = 'none';
    document.getElementById('continent-grid').style.display = 'block';
}

// Go back to the country list
function goBackToCountryList() {
    document.getElementById('country-info-section').style.display = 'none';
    document.getElementById('countries-section').style.display = 'block';
}

