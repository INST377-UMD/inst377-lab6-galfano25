var map;

function createMap() {
    map = L.map('map').setView([40, -100.5], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function generateCoordinates() {
    const markers = {
        "mark1": "local1",
        "mark2": "local2",
        "mark3": "local3"
    }

    Object.keys(markers).forEach(mark => {
        //generate coordinates
        let latitude = getRandomInRange(30, 35, 3);
        let longitude = getRandomInRange(-90, -100, 3);
        document.getElementById(mark).textContent +=
            `Latitude: ${latitude}, Longitude: ${longitude}`;

        //generate markers for the map
        var marker = L.marker([latitude, longitude]).addTo(map);

        //fetch locality
        const location = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(location)
            .then((res) => res.json())
            .then((localityData) => {
                let locality = localityData.locality
                document.getElementById(markers[mark]).textContent += `${locality}`
                marker.bindPopup(`${locality}`)
            })
    })
}

window.onload = function () {
    createMap();
    generateCoordinates();
}