const map = L.map("map").setView([19.45927, 72.80042], 15);

L.marker([19.45927, 72.80042])
    .addTo(map)
    .bindPopup("<strong>New Viva College</strong>")
    .openPopup();

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


// Store markers by service ID
const serviceMarkers = {};

const markerClusterGroup = L.markerClusterGroup();

map.addLayer(markerClusterGroup);

function showServiceMarkers(services) {

    markerClusterGroup.clearLayers();

    services.forEach(service => {

        const marker = L.marker([
            service.latitude,
            service.longitude
        ]);

        marker.bindPopup(`
            <strong>${service.name}</strong><br>
            ${service.address}<br>
            ${service.hours}
        `);

        serviceMarkers[service.id] = marker;

        markerClusterGroup.addLayer(marker);
    });
}

// Load service data
fetch("data/services.json")
    .then(response => response.json())
    .then(services => {

        services.forEach(service => {
    serviceMarkers[service.id] = service;
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