class Map {
    constructor() {
        this.markerOption = {
            title: 'MyLocation',
            clickable: true,
            draggable: true,
        }
        this.mapOptions = {
            center: [54.5, 36.3],
            zoom: 10,
            scrollWheelZoom:true
        }

        this.map = new L.map('map', this.mapOptions);
        this.layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        this.map.addLayer(this.layer);
        this.cuurentCoords = [];
        this.marker = null;

        this.button = document.getElementById('service-panel').insertAdjacentHTML('beforeend',
            '<button onclick="map.zoom()">zoom</button>')
        this.geoloc = document.getElementById('service-panel').insertAdjacentHTML('beforeend',
            '<button onclick="map.geolocation()">current position</button>');
        this.input = document.getElementById('service-panel').insertAdjacentHTML('beforeend',
            '<div class="add-marker"><input id="inputWidth" type="number" style="width: 60px" placeholder="width">' +
            '<input id="inputLong" type="number" style="width: 60px" placeholder="long">' +
            '<button onclick="map.addMarkByCoords()">add marker</button></div>');
        this.deleteMarker = document.getElementById('service-panel').insertAdjacentHTML('beforeend',
            '<button onclick="map.deleteMark()">delete marker</button>');
        this.addMarkOnMapClick = ((option) => {
            let markerOptions = option;
                this.map.on('click', (e)=> {
                    console.log(e)
                    let coords = [e.latlng.lat, e.latlng.lng];
                    this.cuurentCoords = coords;
                    this.deleteMark()
                    this.marker = new L.Marker(coords, markerOptions).addTo(this.map);
                    // mark.bindPopup('Hello').openPopup(); // сразу открываает попап
                    this.marker.bindPopup('Hello');
                })
        })()
    }


    addMarkByCoords() {

        this.deleteMark()
        let inpW = document.getElementById('inputWidth');
        let inpL = document.getElementById('inputLong');

        if (inpW.value.trim() !== '' && inpL.value.trim() !== '') {
            this.cuurentCoords = [inpW.value, inpL.value]
        }
        if (this.cuurentCoords.length) {
            this.marker = new L.Marker(this.cuurentCoords, this.markerOption).addTo(this.map);
            this.marker.bindPopup('Hi');
        }

    }

    zoom() {
        if (this.cuurentCoords.length) {
            this.map.setView(this.cuurentCoords, 13, {animate: true})
        }
    }

    deleteMark() {
        if (this.marker) {
            this.map.removeLayer(this.marker)
        }
    }

    geolocation() {
        this.map.locate({setView: true, watch: true})
            .on('locationfound', (e) =>{
                this.deleteMark();
                this.cuurentCoords = [e.latitude, e.longitude];
                this.marker = new L.Marker(this.cuurentCoords, this.markerOption).bindPopup('Your are here :)');
                this.map.addLayer(this.marker);
            })
        setTimeout(() => this.map.stopLocate(), 1000)
    }

}


let map = new Map();
