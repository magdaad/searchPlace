/**
 * Created by Magda on 2017-09-15.
 */
var getDataService = function () {

    var getData = function (address) {
        var generalPromise = new Promise(function(resolve, reject){
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

            var dataArray = [];
            var dataGeocoder = [];
            var dataTextSearch = [];

            var allPromises = Promise.all([promiseTextSearch, promiseGeocoder])
                .then(function(values){
                    var xxx = document.getElementById("loader");
                    xxx.classList.remove("loading");

                    for (var i=0; i<values[0].length; i++){
                        var place = new placeModel.Place(values[0][i].formatted_address);
                        dataTextSearch.push(place);
                    }

                    for (i=0; i<values[1].length; i++){
                        place = new placeModel.Place(values[1][i].formatted_address);
                        dataGeocoder.push(place);
                    }


                    dataArray.push(dataTextSearch);
                    dataArray.push(dataGeocoder);
                    resolve(dataArray);
                })
                .catch(function (err) {
                    console.log(err);
                });



           // reject("no");

        });



      return generalPromise;
    };

    return {getData:getData}


};

