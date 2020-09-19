require('./bootstrap');
//leaflet

var L = require('leaflet');
var $ = require('jquery');
var leafletDraw = require('leaflet-draw');

// // console.log($('#mapid'));
// var mymap = L.map('mapid', {editable: true}).setView([51.505, -0.09], 13);
// // L.Icon.Default.imagePath = 'lib/leaflet/images/';
//
// // Use OpenStreetMap tiles and attribution
// var osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// var attribution = '© OpenStreetMap contributors';
//
// // Create the basemap and add it to the map
// L.tileLayer(osmTiles, {
//     maxZoom: 18,
//     attribution: attribution
// }).addTo(mymap);
//
//




var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
    map = new L.Map('mapid', { center: new L.LatLng(51.505, -0.04), zoom: 13 }),
    drawnItems = L.featureGroup().addTo(map);
L.control.layers({
    'osm': osm.addTo(map),
    "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: 'google'
    })
}, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
});

// StyleEditor
var styleCtrl = L.control.styleEditor({
    openOnLeafletDraw: true,
    showTooltip: false
});
map.addControl(styleCtrl);  

var marker = L.marker([51.5, -0.09]).addTo(map);

var pointA = new L.LatLng(51.5, -0.09);
var pointB = new L.LatLng(51.509, -0.12);
var pointC = new L.LatLng(51.512, 0.01);
var pointList = [pointA, pointB];
var pointList2 = [pointB, pointC];

let dificil = 'red';
let medio = 'orange';
let facil = 'blue';
let asfalto = '0';
let tierra = '5,10';
let noSeSabe = '1,8';

addPoliline(pointList2, facil, asfalto);
addPoliline(pointList, medio, tierra);

function addPoliline(arrayPoints, dificultad, tipoCarretera) {
    var Spolyline = new L.Polyline(arrayPoints, {
        color: dificultad,
        weight: 3,
        opacity: 1,
        smoothFactor: 1,
        dashArray: tipoCarretera,
    });
    Spolyline.addTo(map);
}


