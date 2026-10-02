fetch("data/services.json")
    .then(response => response.json())
    .then(services => {

        const serviceList = document.getElementById("serviceList");

        services.forEach(service => {

            const card = document.createElement("div");

            card.className = "service-card";

            card.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.address}</p>
                <p>${service.hours}</p>

                <div class="service-actions">
                    <a href="tel:${service.phone}">Call</a>

                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}"
                        target="_blank"
                    >
                        Directions
                    </a>
                </div>
            `;

            card.addEventListener("click", () => {
                focusService(service.id);
            });

            serviceList.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Error loading services:", error);
    });


// Find user's location
const locationButton = document.getElementById("locationButton");

locationButton.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Location is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Location found:", latitude, longitude);

            map.setView([latitude, longitude], 15);

            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("You are here")
                .openPopup();
        },

        (error) => {

            console.error("Location error:", error.code, error.message);

            alert(
                "Unable to get your location.\n\n" +
                "Error " + error.code + ": " + error.message
            );
        },

        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
        }
    );
});