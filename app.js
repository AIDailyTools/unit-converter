// app.js

// --- Conversion Functions ---

function convertLength() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultValueSpan = document.getElementById('resultValue');
    const resultUnitSpan = document.getElementById('resultUnit');

    if (isNaN(inputValue) |
| inputValue === null |
| inputValue === "") {
        resultValueSpan.textContent = "Invalid input";
        resultUnitSpan.textContent = "";
        return;
    }

    // Step 1: Convert input to a common base unit (meters)
    let valueInMeters;
    switch (fromUnit) {
        case 'm': valueInMeters = inputValue; break;
        case 'km': valueInMeters = inputValue * 1000; break;
        case 'cm': valueInMeters = inputValue / 100; break;
        case 'mm': valueInMeters = inputValue / 1000; break;
        case 'in': valueInMeters = inputValue * 0.0254; break; // [1]
        case 'ft': valueInMeters = inputValue * 0.3048; break; // [1]
        case 'yd': valueInMeters = inputValue * 0.9144; break; // [1]
        case 'mi': valueInMeters = inputValue * 1609.34; break; // [1]
        default: valueInMeters = inputValue;
    }

    // Step 2: Convert from the base unit (meters) to the target unit
    let result;
    let displayUnit;
    switch (toUnit) {
        case 'm': result = valueInMeters; displayUnit = 'm'; break;
        case 'km': result = valueInMeters / 1000; displayUnit = 'km'; break;
        case 'cm': result = valueInMeters * 100; displayUnit = 'cm'; break;
        case 'mm': result = valueInMeters * 1000; displayUnit = 'mm'; break;
        case 'in': result = valueInMeters / 0.0254; displayUnit = 'in'; break;
        case 'ft': result = valueInMeters / 0.3048; displayUnit = 'ft'; break;
        case 'yd': result = valueInMeters / 0.9144; displayUnit = 'yd'; break;
        case 'mi': result = valueInMeters / 1609.34; displayUnit = 'mi'; break;
        default: result = valueInMeters; displayUnit = '';
    }

    resultValueSpan.textContent = result.toFixed(4);
    resultUnitSpan.textContent = displayUnit;
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const resultValueSpan = document.getElementById('currencyResult');
    const resultUnitSpan = document.getElementById('currencyResultUnit');

    if (isNaN(amount) |
| amount === null |
| amount === "") {
        resultValueSpan.textContent = "Invalid input";
        resultUnitSpan.textContent = "";
        return;
    }

    const API_BASE_URL = 'https://2024-03-06.currency-api.pages.dev/v1/currencies'; // [2]

    try {
        // Fetch exchange rates for the 'from' currency
        const response = await fetch(`${API_BASE_URL}/${from.toLowerCase()}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the rate for the 'to' currency
        const exchangeRate = data[from.toLowerCase()][to.toLowerCase()]; // [2]

        if (exchangeRate) {
            const result = amount * exchangeRate;
            resultValueSpan.textContent = result.toFixed(2);
            resultUnitSpan.textContent = to.toUpperCase();
        } else {
            resultValueSpan.textContent = "N/A";
            resultUnitSpan.textContent = "Conversion not available";
        }
    } catch (error) {
        console.error("Error fetching currency exchange rate:", error);
        resultValueSpan.textContent = "Error";
        resultUnitSpan.textContent = "API Issue";
    }
}

function convertTemperature() {
    const inputValue = parseFloat(document.getElementById('tempInput').value);
    const fromUnit = document.getElementById('fromTempUnit').value;
    const toUnit = document.getElementById('toTempUnit').value;
    const resultValueSpan = document.getElementById('tempResult');
    const resultUnitSpan = document.getElementById('tempResultUnit');

    if (isNaN(inputValue) |
| inputValue === null |
| inputValue === "") {
        resultValueSpan.textContent = "Invalid input";
        resultUnitSpan.textContent = "";
        return;
    }

    // Convert input to a common base unit (Kelvin) for comprehensive conversion
    let valueInKelvin;
    switch (fromUnit) {
        case 'c': valueInKelvin = inputValue + 273.15; break;
        case 'f': valueInKelvin = (inputValue - 32) * 5/9 + 273.15; break; // [3, 4, 5]
        case 'k': valueInKelvin = inputValue; break;
        default: valueInKelvin = inputValue;
    }

    // Convert from base unit (Kelvin) to target unit
    let result;
    let displayUnit;
    switch (toUnit) {
        case 'c': result = valueInKelvin - 273.15; displayUnit = '°C'; break;
        case 'f': result = (valueInKelvin - 273.15) * 9/5 + 32; displayUnit = '°F'; break; // [3, 4, 5]
        case 'k': result = valueInKelvin; displayUnit = 'K'; break;
        default: result = valueInKelvin; displayUnit = '';
    }

    resultValueSpan.textContent = result.toFixed(2);
    resultUnitSpan.textContent = displayUnit;
}

function convertWeight() {
    const inputValue = parseFloat(document.getElementById('weightInput').value);
    const fromUnit = document.getElementById('fromWeightUnit').value;
    const toUnit = document.getElementById('toWeightUnit').value;
    const resultValueSpan = document.getElementById('weightResult');
    const resultUnitSpan = document.getElementById('weightResultUnit');

    if (isNaN(inputValue) |
| inputValue === null |
| inputValue === "") {
        resultValueSpan.textContent = "Invalid input";
        resultUnitSpan.textContent = "";
        return;
    }

    // Step 1: Convert input to a common base unit (kilograms)
    let valueInKg;
    switch (fromUnit) {
        case 'kg': valueInKg = inputValue; break;
        case 'g': valueInKg = inputValue / 1000; break; // [6]
        case 'mg': valueInKg = inputValue / 1000000; break; // 1 kg = 1,000,000 mg
        case 'lb': valueInKg = inputValue * 0.45359237; break; // [7, 8]
        case 'oz': valueInKg = inputValue / 35.273962; break; // 1 kg = 35.273962 oz [6]
        default: valueInKg = inputValue;
    }

    // Step 2: Convert from base unit (kilograms) to target unit
    let result;
    let displayUnit;
    switch (toUnit) {
        case 'kg': result = valueInKg; displayUnit = 'kg'; break;
        case 'g': result = valueInKg * 1000; displayUnit = 'g'; break; // [6]
        case 'mg': result = valueInKg * 1000000; displayUnit = 'mg'; break;
        case 'lb': result = valueInKg * 2.20462262; displayUnit = 'lb'; break; // [7, 8]
        case 'oz': result = valueInKg * 35.273962; displayUnit = 'oz'; break; // [6]
        default: result = valueInKg; displayUnit = '';
    }

    resultValueSpan.textContent = result.toFixed(4);
    resultUnitSpan.textContent = displayUnit;
}

function convertArea() {
    const inputValue = parseFloat(document.getElementById('areaInput').value);
    const fromUnit = document.getElementById('fromAreaUnit').value;
    const toUnit = document.getElementById('toAreaUnit').value;
    const resultValueSpan = document.getElementById('areaResult');
    const resultUnitSpan = document.getElementById('areaResultUnit');

    if (isNaN(inputValue) |
| inputValue === null |
| inputValue === "") {
        resultValueSpan.textContent = "Invalid input";
        resultUnitSpan.textContent = "";
        return;
    }

    // Step 1: Convert input to a common base unit (square meters)
    let valueInSqm;
    switch (fromUnit) {
        case 'sqm': valueInSqm = inputValue; break;
        case 'sqkm': valueInSqm = inputValue * 1000000; break; // [9, 10]
        case 'sqcm': valueInSqm = inputValue / 10000; break; // [9, 10]
        case 'sqmm': valueInSqm = inputValue / 1000000; break; // [9, 10]
        case 'sqin': valueInSqm = inputValue * 0.00064516; break; // [10, 11]
        case 'sqft': valueInSqm = inputValue * 0.09290304; break; // [10, 11]
        case 'sqyd': valueInSqm = inputValue * 0.83612736; break; // [9, 10, 11]
        case 'acre': valueInSqm = inputValue * 4046.85642; break; // [9, 10]
        case 'hectare': valueInSqm = inputValue * 10000; break; // [9, 10]
        case 'sqmi': valueInSqm = inputValue * 2589988.11; break; // [9, 10]
        default: valueInSqm = inputValue;
    }

    // Step 2: Convert from the base unit (square meters) to the target unit
    let result;
    let displayUnit;
    switch (toUnit) {
        case 'sqm': result = valueInSqm; displayUnit = 'sqm'; break;
        case 'sqkm': result = valueInSqm / 1000000; displayUnit = 'sqkm'; break;
        case 'sqcm': result = valueInSqm * 10000; displayUnit = 'sqcm'; break;
        case 'sqmm': result = valueInSqm * 1000000; displayUnit = 'sqmm'; break;
        case 'sqin': result = valueInSqm / 0.00064516; displayUnit = 'sqin'; break;
        case 'sqft': result = valueInSqm / 0.09290304; displayUnit = 'sqft'; break;
        case 'sqyd': result = valueInSqm / 0.83612736; displayUnit = 'sqyd'; break;
        case 'acre': result = valueInSqm / 4046.85642; displayUnit = 'ac'; break;
        case 'hectare': result = valueInSqm / 10000; displayUnit = 'ha'; break;
        case 'sqmi': result = valueInSqm / 2589988.11; displayUnit = 'sqmi'; break;
        default: result = valueInSqm; displayUnit = '';
    }

    resultValueSpan.textContent = result.toFixed(4);
    resultUnitSpan.textContent = displayUnit;
}

function convertVolume() {
    const inputValue = parseFloat(document.getElementById('volumeInput').value);
    const fromUnit = document.getElementById('fromVolumeUnit').value;
    const toUnit = document.getElementById('toVolumeUnit').value;
    const resultValueSpan = document.getElementById('volumeResult');
    const resultUnitSpan = document.getElementById('volumeResultUnit');

    if (isNaN(inputValue) |
| inputValue === null |
| inputValue === "") {
        resultValueSpan.textContent = "Invalid input";
        resultUnitSpan.textContent = "";
        return;
    }

    // Step 1: Convert input to a common base unit (Liters)
    let valueInLiters;
    switch (fromUnit) {
        case 'L': valueInLiters = inputValue; break;
        case 'm3': valueInLiters = inputValue * 1000; break; // [12, 13]
        case 'cm3': valueInLiters = inputValue / 1000; break; // 1 L = 1000 cm3
        case 'mm3': valueInLiters = inputValue / 1000000; break; // 1 L = 1,000,000 mm3
        case 'in3': valueInLiters = inputValue * 0.01638706; break; // [11]
        case 'ft3': valueInLiters = inputValue * 28.31685; break; // [11]
        case 'gal': valueInLiters = inputValue * 3.785412; break; // US liquid gallon [11]
        case 'ml': valueInLiters = inputValue / 1; break; // 1 L = 1000 ml
        case 'pint': valueInLiters = inputValue * 0.4731765; break; // US liquid pint [11]
        default: valueInLiters = inputValue;
    }

    // Step 2: Convert from the base unit (Liters) to the target unit
    let result;
    let displayUnit;
    switch (toUnit) {
        case 'L': result = valueInLiters; displayUnit = 'L'; break;
        case 'm3': result = valueInLiters / 1000; displayUnit = 'm³'; break; // [12, 13]
        case 'cm3': result = valueInLiters * 1000; displayUnit = 'cm³'; break;
        case 'mm3': result = valueInLiters * 1000000; displayUnit = 'mm³'; break;
        case 'in3': result = valueInLiters / 0.01638706; displayUnit = 'in³'; break;
        case 'ft3': result = valueInLiters / 28.31685; displayUnit = 'ft³'; break;
        case 'gal': result = valueInLiters / 3.785412; displayUnit = 'gal'; break;
        case 'ml': result = valueInLiters * 1; displayUnit = 'ml'; break;
        case 'pint': result = valueInLiters / 0.4731765; displayUnit = 'pint'; break;
        default: result = valueInLiters; displayUnit = '';
    }

    resultValueSpan.textContent = result.toFixed(4);
    resultUnitSpan.textContent = displayUnit;
}

// --- UI and Event Handling ---

// Function to handle tab switching (displaying correct converter section)
function handleTabSwitch(event) {
    const targetConverter = event.target.dataset.converter;

    // Remove 'active' from all tabs and sections
    document.querySelectorAll('.converter-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.converter-section').forEach(section => section.classList.remove('active'));

    // Add 'active' to the clicked tab and corresponding section
    event.target.classList.add('active');
    document.getElementById(`${targetConverter}-converter`).classList.add('active');

    // Trigger conversion for the newly active tab
    switch (targetConverter) {
        case 'length': convertLength(); break;
        case 'currency': convertCurrency(); break;
        case 'temperature': convertTemperature(); break;
        case 'weight': convertWeight(); break;
        case 'area': convertArea(); break;
        case 'volume': convertVolume(); break;
    }
}

// Function to swap units for a given converter
function swapUnits(fromSelectId, toSelectId, convertFunction) {
    const fromSelect = document.getElementById(fromSelectId);
    const toSelect = document.getElementById(toSelectId);

    const tempValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempValue;

    convertFunction(); // Trigger conversion after swap
}

// Function to handle search input
function filterContent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Filter converter sections
    document.querySelectorAll('.converter-section').forEach(section => {
        const sectionName = section.dataset.name? section.dataset.name.toLowerCase() : '';
        if (sectionName.includes(searchTerm) |
| searchTerm === '') {
            section.style.display = 'block'; // Show if matches
        } else {
            section.style.display = 'none'; // Hide if no match
        }
    });

    // Filter category cards
    document.querySelectorAll('.category-card').forEach(card => {
        const cardName = card.dataset.name? card.dataset.name.toLowerCase() : '';
        if (cardName.includes(searchTerm) |
| searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Filter quick links (optional, can be more granular if needed)
    document.querySelectorAll('.link-group').forEach(group => {
        const groupText = group.textContent.toLowerCase();
        if (groupText.includes(searchTerm) |
| searchTerm === '') {
            group.style.display = 'block';
        } else {
            group.style.display = 'none';
        }
    });
}

// Function to handle quick link clicks
function handleQuickLinkClick(event) {
    event.preventDefault(); // Prevent default anchor link behavior

    const link = event.currentTarget;
    const targetConverter = link.dataset.converterTarget;
    const fromUnit = link.dataset.fromUnit;
    const toUnit = link.dataset.toUnit;

    // 1. Activate the correct converter tab
    document.querySelectorAll('.converter-tab').forEach(tab => {
        if (tab.dataset.converter === targetConverter) {
            tab.click(); // Simulate click to activate tab and run its conversion
        }
    });

    // 2. Set the units in the activated converter
    // Use a small timeout to ensure the tab has fully activated and elements are visible
    setTimeout(() => {
        const fromSelect = document.getElementById(`from${targetConverter.charAt(0).toUpperCase() + targetConverter.slice(1)}Unit`);
        const toSelect = document.getElementById(`to${targetConverter.charAt(0).toUpperCase() + targetConverter.slice(1)}Unit`);
        const inputField = document.getElementById(`${targetConverter}Input`) |
| document.getElementById('inputValue'); // For length

        if (fromSelect && toSelect) {
            fromSelect.value = fromUnit;
            toSelect.value = toUnit;
            // Trigger conversion after setting units
            switch (targetConverter) {
                case 'length': convertLength(); break;
                case 'currency': convertCurrency(); break;
                case 'temperature': convertTemperature(); break;
                case 'weight': convertWeight(); break;
                case 'area': convertArea(); break;
                case 'volume': convertVolume(); break;
            }
        }
        // Optionally scroll to the converter section
        document.getElementById('main-converter-section').scrollIntoView({ behavior: 'smooth' });
    }, 100); // Small delay
}

// --- Initialize on DOM Content Loaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for Length Converter
    document.getElementById('inputValue').addEventListener('input', convertLength);
    document.getElementById('fromUnit').addEventListener('change', convertLength);
    document.getElementById('toUnit').addEventListener('change', convertLength);
    document.getElementById('swapBtn').addEventListener('click', () => swapUnits('fromUnit', 'toUnit', convertLength));

    // Event listeners for Currency Converter
    document.getElementById('currencyAmount').addEventListener('input', convertCurrency);
    document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
    document.getElementById('toCurrency').addEventListener('change', convertCurrency);
    document.getElementById('currencySwapBtn').addEventListener('click', () => swapUnits('fromCurrency', 'toCurrency', convertCurrency));

    // Event listeners for Temperature Converter
    document.getElementById('tempInput').addEventListener('input', convertTemperature);
    document.getElementById('fromTempUnit').addEventListener('change', convertTemperature);
    document.getElementById('toTempUnit').addEventListener('change', convertTemperature);
    document.getElementById('tempSwapBtn').addEventListener('click', () => swapUnits('fromTempUnit', 'toTempUnit', convertTemperature));

    // Event listeners for Weight Converter
    document.getElementById('weightInput').addEventListener('input', convertWeight);
    document.getElementById('fromWeightUnit').addEventListener('change', convertWeight);
    document.getElementById('toWeightUnit').addEventListener('change', convertWeight);
    document.getElementById('weightSwapBtn').addEventListener('click', () => swapUnits('fromWeightUnit', 'toWeightUnit', convertWeight));

    // Event listeners for Area Converter
    document.getElementById('areaInput').addEventListener('input', convertArea);
    document.getElementById('fromAreaUnit').addEventListener('change', convertArea);
    document.getElementById('toAreaUnit').addEventListener('change', convertArea);
    document.getElementById('areaSwapBtn').addEventListener('click', () => swapUnits('fromAreaUnit', 'toAreaUnit', convertArea));

    // Event listeners for Volume Converter
    document.getElementById('volumeInput').addEventListener('input', convertVolume);
    document.getElementById('fromVolumeUnit').addEventListener('change', convertVolume);
    document.getElementById('toVolumeUnit').addEventListener('change', convertVolume);
    document.getElementById('volumeSwapBtn').addEventListener('click', () => swapUnits('fromVolumeUnit', 'toVolumeUnit', convertVolume));

    // Event listeners for converter tabs
    document.querySelectorAll('.converter-tab').forEach(tab => {
        tab.addEventListener('click', handleTabSwitch);
    });

    // Event listener for search input
    document.getElementById('searchInput').addEventListener('input', filterContent);

    // Event listeners for main navigation links (smooth scroll)
    document.querySelectorAll('.top-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Event listeners for main nav category links (filter categories)
    document.querySelectorAll('.main-nav.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.main-nav.nav-links a').forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;
            document.querySelectorAll('.category-card').forEach(card => {
                if (category === 'all' |
| card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Event listeners for quick links
    document.querySelectorAll('.quick-links a').forEach(link => {
        link.addEventListener('click', handleQuickLinkClick);
    });

    // Initial conversion for the active tab on page load
    const initialActiveTab = document.querySelector('.converter-tab.active');
    if (initialActiveTab) {
        const initialConverter = initialActiveTab.dataset.converter;
        switch (initialConverter) {
            case 'length': convertLength(); break;
            case 'currency': convertCurrency(); break;
            case 'temperature': convertTemperature(); break;
            case 'weight': convertWeight(); break;
            case 'area': convertArea(); break;
            case 'volume': convertVolume(); break;
        }
    }

    // Initial filter for categories (show all by default)
    document.querySelector('.main-nav.nav-links a[data-category="all"]').click();
});