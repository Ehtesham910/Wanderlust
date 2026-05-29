const mapData = document.getElementById("map-data");

const coordinates = JSON.parse(
    mapData.dataset.coordinates
);

const map = L.map("map").setView(
    [coordinates[1], coordinates[0]],
    13
);

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
    }
).addTo(map);

L.marker([coordinates[1], coordinates[0]])
    .addTo(map)
    .bindPopup(mapData.dataset.location)
    .openPopup();