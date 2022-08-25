/* CARTE 1 : Etat des lieux dans les communes et quartiers */


/* Fond de carte et zoom */

var map = L.map('map');
var osmUrl = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
var osmAttrib = 'Mathilde Mauger-Vauglin ; &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
var osm = new L.TileLayer(osmUrl, { attribution: osmAttrib }).addTo(map);
map.setView([48.5701, 7.6622], 11);
map.options.maxZoom = 14;
map.options.minZoom = 10;
var bounds = [[48.9000, 7.2], [48.300, 8.20]];
map.setMaxBounds(bounds);


/* Ctrl + Scroll pour zoommer sur la carte */

map.scrollWheelZoom.disable();
$("#map").bind('mousewheel DOMMouseScroll', function (event) {
  event.stopPropagation();
  if (event.ctrlKey == true) {
    event.preventDefault();
    map.scrollWheelZoom.enable();
    $('#map').removeClass('map-scroll');
    setTimeout(function () {
      map.scrollWheelZoom.disable();
    }, 1000);
  } else {
    map.scrollWheelZoom.disable();
    $('#map').addClass('map-scroll');
  }
});
$(window).bind('mousewheel DOMMouseScroll', function (event) {
  $('#map').removeClass('map-scroll');
})


/* Ajout des communes */

function getColor(p) {
  return p > 98 ? '#090044' :
    p > 93 ? '#113975' :
      p > 87 ? '#1972a5' :
        p > 67 ? '#79b3d2' :
          '#00000';
};
function styleCommune(features) {
  return {
    fillColor: getColor(features.properties.C_Classe_n),
    color: 'white',
    weight: 0.4,
    fillOpacity: 0.8,
    zIndex: 1
  };
};
var Commune = L.geoJSON(Commune, {
  style: styleCommune,
  onEachFeature: onEachFeature
}).addTo(map);
function onEachFeature(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Commune : " + feature.properties.nom
    + "<br/>La classe noire représente "
    + feature.properties.C_Classe_n
    + "% de la commune", { className: 'mypop_Commune' })
};

var Commune_nodata = L.geoJSON(Commune_nodata, {
  style: styleCommune,
  onEachFeature: onEachFeature9
}).addTo(map);
function onEachFeature9(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Commune : " + feature.properties.nom
    + "<br/>Pas de données", { className: 'mypop_Commune' })
};

/* Ajout des quartiers  */

function getColor(i) {
  return i > 98 ? '#090044' :
    i > 93 ? '#113975' :
      i > 87 ? '#1972a5' :
        i > 67 ? '#79b3d2' :
          '#8e8e8e';
};
function styleQuartier(features) {
  return {
    fillColor: getColor(features.properties.Q_Classe_n),
    color: 'black',
    weight: 0,
    fillOpacity: 0.8,
    zIndex: 2
  };
};
var Quartier = L.geoJSON(Quartier, {
  style: styleQuartier,
  onEachFeature: onEachFeature1
}).addTo(map);
function onEachFeature1(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Quartier : " + feature.properties.nom
    + "<br/>La classe noire représente "
    + feature.properties.Q_Classe_n
    + "% du quartier", { className: 'mypop_Quartier' })
};

/* Limites */

var Stras_quartier_limite = L.geoJSON(Stras_quartier_limite, {
  color: 'black',
  dashArray: "5 2",
  weight: 0.9,
  zIndex: 10
}).addTo(map);
var Stras = L.geoJSON(Stras_limite, {
  color: 'white',
  zIndex: 3
}).addTo(map);

/* Legende */

var legend = L.control({ position: "bottomleft" });
legend.onAdd = function (legende) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<strong text-align='center'>Part de la classe noire dans les communes de l’Eurométropole et dans les quartiers de Strasbourg</strong><br>";
  div.innerHTML += '<i style="background: #090044"></i><span>98 % - 100 %</span><br>';
  div.innerHTML += '<i style="background: #113975"></i><span>93 % - 98 %</span><br>';
  div.innerHTML += '<i style="background: #1972a5"></i><span> 87 % - 93 %</span><br>';
  div.innerHTML += '<i style="background: #79b3d2"></i><span> < 87 %</span><br>';
  div.innerHTML += '<i style="background: #8e8e8e"></i><span>Pas de données</span><br>';
  div.innerHTML += '<br><l style="background: #ffffff"></l> <texte>Limite communale</texte><br>';
  div.innerHTML += '<m style="background: #000000"></m><m style="background: #000000"></m><m style="background: #000000"></m><m style="background: #000000"></m> <texte>Quartier</texte><br>';
  return div;
};
legend.addTo(map);

/* Gestion des couches */

var baseLayers = {
  "Fond de carte": osm
};
var overlays = {
  "Quartiers de Strasbourg": Quartier,
  "Communes de l'Eurométropole de Strasbourg": Commune,
  "Délimitation quartiers": Stras_quartier_limite,
  "Délimitation de Strasbourg": Stras,
};
L.control.layers(baseLayers, overlays).addTo(map);


/* CARTE 2 : Etat des lieux dans les zones artificialisées des communes */


var map3 = L.map('map3');
var osmUrl = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
var osmAttrib = 'Mathilde Mauger-Vauglin ; &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
var osm = new L.TileLayer(osmUrl, { attribution: osmAttrib }).addTo(map3);
map3.setView([48.5701, 7.6622], 11);
map3.options.maxZoom = 14;
map3.options.minZoom = 10;
var bounds = [[48.9000, 7.2], [48.300, 8.20]];
map3.setMaxBounds(bounds);

/* Ctrl + Scroll pour zoommer sur la carte */
map3.scrollWheelZoom.disable();
$("#map3").bind('mousewheel DOMMouseScroll', function (event) {
  event.stopPropagation();
  if (event.ctrlKey == true) {
    event.preventDefault();
    map3.scrollWheelZoom.enable();
    $('#map3').removeClass('map3-scroll');
    setTimeout(function () {
      map3.scrollWheelZoom.disable();
    }, 1000);
  } else {
    map3.scrollWheelZoom.disable();
    $('#map3').addClass('map3-scroll');
  }
});
$(window).bind('mousewheel DOMMouseScroll', function (event) {
  $('#map3').removeClass('map3-scroll');
})

/* Ajout des communes */

function getColor4(r) {
  return r > 98 ? '#090044' :
    r > 93 ? '#113975' :
      r > 87 ? '#1972a5' :
        r > 67 ? '#79b3d2' :
          'grey';
};
function styleCommune3(features) {
  return {
    fillColor: getColor4(features.properties.OCS_Classe),
    color: 'white',
    weight: 0.4,
    fillOpacity: 0.8,
    zIndex: 1,
  };
};

var OCS = L.geoJSON(OCS, {
  style: styleCommune3,
  onEachFeature: onEachFeature4
}).addTo(map3);
function onEachFeature4(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map3.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Commune : " + feature.properties.nom
    + "<br/>La classe noire représente "
    + feature.properties.OCS_Classe
    + "% de la commune", { className: 'mypop_Commune' })
};

var Commune_nodata2 = L.geoJSON(Commune_nodata2, {
  style: styleCommune3,
  onEachFeature: onEachFeature5
}).addTo(map3);
function onEachFeature5(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Commune : " + feature.properties.nom
    + "<br/>Pas de données", { className: 'mypop_Commune' })
};

function getColor6(t) {
  return t == 218 ? '#ffffff' :
                '#ffffff';
};
function styleCommune8(features) {
  return {
    fillColor: getColor6(features.properties.num_com),
    color: 'black',
    weight: 0,
    fillOpacity: 0.2,
    zIndex: 1,
  };
};
var zone_artif = L.geoJSON(Zone_artif, {
  style: styleCommune8,
  onEachFeature:onEachFeature6
}).addTo(map3);


function onEachFeature6(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map3.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Zone artificialisée de la commune de " + feature.properties.nom
    , { className: 'mypop_Commune' })
};

/* Limites */

var Stras = L.geoJSON(Stras_limite, {
  color: 'white',
  weight: 1
}).addTo(map3);

var C_Limite_line2 = L.geoJSON(C_Limite_line2, {
  color: 'black',
  weight: 1
}).addTo(map3);

/* Légende  */

var legend = L.control({ position: "bottomleft" });
legend.onAdd = function (legende) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<strong text-align='justify'><test>Part de la classe noire dans les zones artificialisées des communes de l'Eurométropole</test><br>";
  div.innerHTML += '<i style="background: #113975"></i><span>93 % - 98 %</span><br>';
  div.innerHTML += '<i style="background: #1972a5"></i><span> 87 % - 93 %</span><br>';
  div.innerHTML += '<i style="background: #79b3d2"></i><span> < 87 %</span><br>';
  div.innerHTML += '<i style="background: #8e8e8e"></i><span>Pas de données</span><br>';
  div.innerHTML += '<br><i style="background: #ffffff"></i><span>Zone artificialisée</span><br>';
  div.innerHTML += '<br><l style="background: #ffffff"></l> <texte>Limite communale</texte><br>';
  return div;
};
legend.addTo(map3);

/* Gestion des couches  */

var baseLayers = {
  "Fond de carte": osm
};
var overlays = {
  "Classe noire communes": Commune,
  "Classe noire zone artificialisées": OCS,
  "Zone artificialisées": zone_artif,
  "Communes" : C_Limite_line2

};
L.control.layers(baseLayers, overlays).addTo(map3);


/* CARTE 3 : Etat des lieux dans les réservoirs de biodiversité de la TVB */


/* Fond de carte et zoom */

var map2 = L.map('map2');
var osmUrl = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
var osmAttrib = 'Mathilde Mauger-Vauglin ; &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
var osm = new L.TileLayer(osmUrl, { attribution: osmAttrib }).addTo(map2);

var osm2Url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
var osm2Attrib = 'Mathilde Mauger-Vauglin ; &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
var osm2 = new L.TileLayer(osm2Url, { attribution: osm2Attrib })

var satUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var satAttrib = 'Mathilde Mauger-Vauglin ; Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, GIS User Community';
var sat = new L.TileLayer(satUrl, { attribution: satAttrib })

map2.setView([48.5701, 7.6622], 11);
map2.options.maxZoom = 14;
map2.options.minZoom = 10;
var bounds = [[48.9000, 7.2], [48.300, 8.20]];
map2.setMaxBounds(bounds);

/* Ctrl + Scroll pour zoommer sur la carte */
map2.scrollWheelZoom.disable();
$("#map2").bind('mousewheel DOMMouseScroll', function (event) {
  event.stopPropagation();
  if (event.ctrlKey == true) {
    event.preventDefault();
    map2.scrollWheelZoom.enable();
    $('#map2').removeClass('map2-scroll');
    setTimeout(function () {
      map2.scrollWheelZoom.disable();
    }, 1000);
  } else {
    map2.scrollWheelZoom.disable();
    $('#map2').addClass('map2-scroll');
  }
});
$(window).bind('mousewheel DOMMouseScroll', function (event) {
  $('#map2').removeClass('map2-scroll');
})

/* Ajout des données TVB */

function getColor2(p) {
  return p > 99.89 ? '#090044' :
    p > 99.77 ? '#113975' :
      p > 99.39 ? '#1972a5' :
        p > 96.8 ? '#79b3d2' :
          p > 0 ? '#d9f4ff' :
            '#00000';
};
function styleTVB(features) {
  return {
    fillColor: getColor2(features.properties.TVB_Classe_noire),
    color: 'white',
    weight: 0.4,
    fillOpacity: 0.8,
    zIndex: 1
  };
};
var TVB = L.geoJSON(TVB, {
  style: styleTVB,
  onEachFeature: onEachFeature2
}).addTo(map2);
function onEachFeature2(feature, layer) {
  layer.on('click', function (event) {
    var my_leaflet_object = event.target;
    map2.fitBounds(my_leaflet_object.getBounds())
  }
  );
  layer.bindPopup("Revervoir : " + feature.properties.nom
    + "<br/>La classe noire représente "
    + feature.properties.TVB_Classe_noire
    + "% du reservoir", { className: 'mypop_Commune' })
};

/* Limites */

var Stras = L.geoJSON(Stras_limite, {
  color: 'white',
  weight: 1
}).addTo(map2);
var C_Limite_line = L.geoJSON(C_Limite_line, {
  color: 'white',
  weight: 0.3
}).addTo(map2);

/* Legende */

var legend = L.control({ position: "bottomleft" });
legend.onAdd = function (legende) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<strong text-align='center'>Part de la classe noire dans les reservoirs de biodiversité de la Trame Verte et Bleue<br>";
  div.innerHTML += '<i style="background: #090044"></i><span>99.9 % - 100 %</span><br>';
  div.innerHTML += '<i style="background: #113975"></i><span>99.8 % - 99.9 %</span><br>';
  div.innerHTML += '<i style="background: #1972a5"></i><span> 99.3 % - 99.8 %</span><br>';
  div.innerHTML += '<i style="background: #d9f4ff"></i><span> < 99.3 %</span><br>';
  return div;
};
legend.addTo(map2);

/* Gestion des couches */

var baseLayers = {
  "Satellite": sat,
  "Fond de carte clair": osm2,
  "Fond de carte sombre": osm
};
var overlays = {
  "Communes": C_Limite_line,
  "Strasbourg": Stras,
  "Réservoirs de la TVB": TVB
};
L.control.layers(baseLayers, overlays).addTo(map2);


/* Grossissement des tableaux */


// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.getElementsByClassName('myImages');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  // and attach our click listener for this image.
  img.onclick = function (evt) {
    console.log(evt);
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
}
