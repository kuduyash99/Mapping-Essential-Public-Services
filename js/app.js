const nearbySection = document.querySelector(".nearby-section");

let userLocation = null;


fetch("data/services.json")
    .then(response => response.json())
    .then(services => {

        const serviceList = document.getElementById("serviceList");
        const searchInput = document.getElementById("searchInput");
        const categoryButtons = document.querySelectorAll(".service-category");

        let selectedCategory = "all";


        // Calculate distance between two coordinates
        function calculateDistance(lat1, lon1, lat2, lon2) {

            const R = 6371;

            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c =
                2 * Math.atan2(
                    Math.sqrt(a),
                    Math.sqrt(1 - a)
                );

            return R * c;
        }


        // Display services
        function displayServices(serviceData) {

            serviceList.innerHTML = "";

            serviceData.forEach(service => {

                const card = document.createElement("div");

                card.className = "service-card";


                let distanceText = "";

                if (userLocation) {

                    const distance = calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        service.latitude,
                        service.longitude
                    );

                    distanceText = `
                        <p>${distance.toFixed(1)} km away</p>
                    `;
                }


                card.innerHTML = `
                    <h3>${service.name}</h3>

                    <p>${service.address}</p>

                    <p>${service.hours}</p>

                    ${distanceText}

                    <div class="service-actions">

                        <a href="tel:${service.phone}">
                            Call
                        </a>

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
        }


        // Filter and sort services
        function filterServices() {

            const searchText =
                searchInput.value.toLowerCase().trim();


            let filteredServices = services.filter(service => {

                const matchesSearch =
                    service.name
                        .toLowerCase()
                        .includes(searchText) ||

                    service.category
                        .toLowerCase()
                        .includes(searchText) ||

                    service.address
                        .toLowerCase()
                        .includes(searchText);


                const matchesCategory =
                    selectedCategory === "all" ||
                    service.category === selectedCategory;


                return matchesSearch && matchesCategory;

            });


            // Sort by distance when location is available
            if (userLocation) {

                filteredServices.sort((a, b) => {

                    const distanceA = calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        a.latitude,
                        a.longitude
                    );


                    const distanceB = calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        b.latitude,
                        b.longitude
                    );


                    return distanceA - distanceB;

                });
            }


            displayServices(filteredServices);

        }


        // Show all services initially
        displayServices(services);


        // Search
        searchInput.addEventListener("input", () => {

            selectedCategory = "all";

            filterServices();

        });


        // Category buttons
        categoryButtons.forEach(button => {

            button.addEventListener("click", () => {

                selectedCategory = button.dataset.category;

                searchInput.value = "";

                filterServices();


                // Scroll to map and service list
                nearbySection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


        // Find user's location
        const locationButton =
            document.getElementById("locationButton");


        locationButton.addEventListener("click", () => {

            if (!navigator.geolocation) {

                alert(
                    "Location is not supported by your browser."
                );

                return;
            }


            navigator.geolocation.getCurrentPosition(

                // SUCCESS
                (position) => {

                    userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };


                    console.log(
                        "Location found:",
                        userLocation.latitude,
                        userLocation.longitude
                    );


                    // Show user's location and all service locations
                    const bounds = L.latLngBounds([
                        [
                            userLocation.latitude,
                            userLocation.longitude
                        ]
                    ]);


                    services.forEach(service => {

                        bounds.extend([
                            service.latitude,
                            service.longitude
                        ]);

                    });


                    map.fitBounds(bounds, {
                        padding: [40, 40]
                    });


                    // Add user marker
                    L.marker([
                        userLocation.latitude,
                        userLocation.longitude
                    ])
                        .addTo(map)
                        .bindPopup("You are here")
                        .openPopup();


                    // Re-filter and sort services
                    filterServices();


                    // Scroll to map and service list
                    nearbySection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },


                // ERROR
                (error) => {

                    console.error(
                        "Location error:",
                        error.code,
                        error.message
                    );

                },


                // Location options
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 0
                }

            );

        });

    })


    .catch(error => {

        console.error(
            "Error loading services:",
            error
        );

    });