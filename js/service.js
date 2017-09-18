/**
 * Created by Magda on 2017-09-15.
 */


var getDataService = function (geocoder) {

    var getData = function (address) {
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

                service = new google.maps.places.PlacesService(map);
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

                view.showResults(values[0], "right");
                view.showResults(values[1], "left");
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return {getData:getData}


};

