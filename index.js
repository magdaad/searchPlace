/**
 * Created by Magda on 2017-09-14.
 */
var address;
var map;
var service;
var promiseTextSearch;
var promiseGeocoder;


function initMap() {
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        address = document.getElementById('address').value;
        //geocodeAddress(geocoder);

        promiseTextSearch = new Promise(
            function (resolve, reject) {
                var pyrmont = new google.maps.LatLng(51.7592, 19.4560);
                map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15
                });
                var request = {
                    query: address
                };

                service = new google.maps.places.PlacesService(map);
                service.textSearch(request, function callback(results, status) {
                        console.log("callback");
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            resolve(results);
                           // console.log("result");
                            //showResults(results, "left");
                        }
                        else {
                            reject("failed");
                        }
                    }
                );

            }
        );

        promiseGeocoder = new Promise (
            function (resolve, reject) {
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === 'OK') {
                        resolve(results);
                        //showResults(results, "right");
                    } else {
                        reject(status);
                        //alert('Geocode was not successful for the following reason: ' + status);
                    }
                });

        });

        var allPromises = Promise.all([promiseTextSearch, promiseGeocoder]).then(function(values){
            console.log(values);
            showResults(values[0], "right");
            showResults(values[1], "left");
        })
            .catch(function (err) {
                console.log(err);
            });
    });
}




/*function geocodeAddress(geocoder) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            console.log(results);
            var x = document.createTextNode(results[0].formatted_address);
            var y = document.getElementById("placeList");
            var z = document.createElement("DIV");
            z.appendChild(x);
            y.appendChild(z);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}*/


/*function initialize() {
    console.log("init");
    var pyrmont = new google.maps.LatLng(51.7592, 19.4560);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        query: address
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}*/

/*function callback(results, status) {

    console.log("callback");
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var x = document.createTextNode(place.formatted_address);
            var y = document.getElementById("placeListSearch");
            var z = document.createElement("DIV");
            z.appendChild(x);
            y.appendChild(z);
            console.log(place);
        }
    }
}*/



function showResults(results, where) {
    for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var y;
        var x = document.createTextNode(place.formatted_address);
        if (where == "right"){
            y = document.getElementById("placeListSearch");
        }
        else{
            y = document.getElementById("placeList");
        }

        var z = document.createElement("DIV");
        z.appendChild(x);
        y.appendChild(z);
        //console.log(place);
    }
}