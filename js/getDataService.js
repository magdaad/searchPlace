/**
 * Created by Magda on 2017-09-15.
 */


var getDataService = function () {

    var getData = function (address) {
        var geocoder = new google.maps.Geocoder();
        var promiseTextSearch = new Promise(
            function (resolve, reject) {
                var pyrmont = new google.maps.LatLng(51.7592, 19.4560);
                map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15
                });
                var request = {
                    query: address
                };

                var service = new google.maps.places.PlacesService(map);
                service.textSearch(request, function callback(results, status) {
                        console.log("callback");
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            resolve(results);
                        }
                        else {
                            reject("failed");
                        }
                    }
                );
            }
        );

        var promiseGeocoder = new Promise (
            function (resolve, reject) {
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === 'OK') {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                });
                console.log("hello")
            });

        var allPromises = Promise.all([promiseTextSearch, promiseGeocoder])
            .then(function(values){
                console.log(values);
                var xxx = document.getElementById("loader");
                xxx.classList.remove("loading");

                for (var i=0; i<values[0].length; i++){
                    var place = new placeModel.Place(values[0][i].formatted_address);
                    placeModel.addToDataTextSearch(place);
                }

                for (i=0; i<values[1].length; i++){
                    place = new placeModel.Place(values[1][i].formatted_address);
                    placeModel.addToGeocoder(place);
                }

                view.showResults(placeModel.getDataTextSearch(), "right");
                view.showResults(placeModel.getDataGeocoder(), "left");


            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return {getData:getData}


};

