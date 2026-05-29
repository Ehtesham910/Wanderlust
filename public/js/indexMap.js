const map = L.map("all-map").setView([22.9734, 78.6569], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

allListings.forEach((listing) => {

    if (listing.geometry && listing.geometry.coordinates) {

        const coords = listing.geometry.coordinates;

        L.marker([coords[1], coords[0]])
            .addTo(map)
            .bindPopup(`
                <h6>${listing.title}</h6>
                <p>${listing.location}</p>
            `);
    }
});