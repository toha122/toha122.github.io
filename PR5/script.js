let map, currentMarker, watchId = null;
let destinationMarker = null;

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initializeMap, displayError, { enableHighAccuracy: true });

        document.getElementById("watch").onclick = watchLocation;
        document.getElementById("clearWatch").onclick = clearWatch;
        document.getElementById("goToDestination").onclick = goToDestination;
    } else {
        alert("Oops, no geolocation support");
    }
}

function initializeMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Ініціалізація карти з центром на поточному місцезнаходженні
    map = L.map('map').setView([latitude, longitude], 13);

    // Додавання базової карти з OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Додавання маркера з інформаційним вікном на поточне місце розташування
    addMarker(latitude, longitude, "You are here");
}

function addMarker(lat, lng, message) {
    if (currentMarker) {
        currentMarker.remove(); // Видаляємо попередній маркер
    }
    currentMarker = L.marker([lat, lng]).addTo(map).bindPopup(message).openPopup();
    map.setView([lat, lng], 13);
}

function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    document.getElementById("location").innerHTML = `Latitude: ${latitude}, Longitude: ${longitude} (Accuracy: ${accuracy} meters)`;

    // Координати коледжу
    const collegeCoords = { latitude: 50.4501, longitude: 30.5234 };
    let distance = computeDistance({ latitude, longitude }, collegeCoords);
    document.getElementById("distance").innerHTML = `You are ${distance.toFixed(2)} km from the College`;

    addMarker(latitude, longitude, `Current position at ${new Date().toLocaleTimeString()}`);
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code] || "An unknown error occurred.";
    document.getElementById("location").innerHTML = errorMessage;
}

function watchLocation() {
    if (!watchId) {
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError, { enableHighAccuracy: true });
    }
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

// Додавання функції для переходу до координат призначення
function goToDestination() {
    const destLat = parseFloat(document.getElementById("destinationLat").value);
    const destLng = parseFloat(document.getElementById("destinationLng").value);
    if (!isNaN(destLat) && !isNaN(destLng)) {
        if (destinationMarker) {
            destinationMarker.remove();
        }
        destinationMarker = L.marker([destLat, destLng]).addTo(map).bindPopup("Destination").openPopup();
        map.setView([destLat, destLng], 13);
    } else {
        alert("Please enter valid coordinates.");
    }
}

function computeDistance(startCoords, destCoords) {
    const startLatRads = degreesToRadians(startCoords.latitude);
    const startLongRads = degreesToRadians(startCoords.longitude);
    const destLatRads = degreesToRadians(destCoords.latitude);
    const destLongRads = degreesToRadians(destCoords.longitude);
    const Radius = 6371; // Радіус Землі у км
    const distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function addMarker(lat, lng) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`You are here: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();

    // Додаємо обробник події для оновлення повідомлення при натисканні на маркер
    marker.on('click', () => {
        marker.bindPopup(`You are here: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    });

    map.setView([lat, lng], 13);
}
