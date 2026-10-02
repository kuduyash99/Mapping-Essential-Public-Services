const map = L.map("map").setView([19.4559, 72.8110], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


// Store markers by service ID
const serviceMarkers = {};


// Load service data
fetch("data/services.json")
    .then(response => response.json())
    .then(services => {

        services.forEach(service => {

            const marker = L.marker([
                service.latitude,
                service.longitude
            ]).addTo(map);

            marker.bindPopup(`
                <strong>${service.name}</strong><br>
                ${service.address}<br>
                ${service.hours}
            `);

            serviceMarkers[service.id] = marker;

        });

    })
    .catch(error => {
        console.error("Error loading service data:", error);
    });


// Focus on a selected service
function focusService(serviceId) {

    const marker = serviceMarkers[serviceId];

    if (marker) {
        map.setView(marker.getLatLng(), 16);
        marker.openPopup();
    }

}