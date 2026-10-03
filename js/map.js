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

// Track the currently selected service marker
let selectedServiceMarker = null;

// Focus on a selected service
function focusService(serviceId) {

    const marker = serviceMarkers[serviceId];

    if (marker) {

        // Reset the previously selected marker
        if (selectedServiceMarker) {
            selectedServiceMarker.setIcon(
                L.icon({
                    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            );
        }

        // Highlight the selected marker
        marker.setIcon(
            L.icon({
                iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        );

        selectedServiceMarker = marker;

        markerClusterGroup.zoomToShowLayer(marker, () => {
            marker.openPopup();
        });

    }

}