/**
 * Created by Magda on 2017-09-15.
 */

var placeModel = (function(){
    var id = 0;

    var Place = function(address){
        this.id = id;
        id = id + 1;
        this.address = address;
    };

    // var addToDataTextSearch = function (place) {
    //     dataTextSearch.push(place);
    // };
    // var addToGeocoder = function (place) {
    //     dataGeocoder.push(place);
    // };
    //
    // var getDataTextSearch = function(){
    //     return dataTextSearch;
    // };
    //
    // var getDataGeocoder = function(){
    //     return dataGeocoder;
    // };

    return {
        Place: Place
        // addToGeocoder:addToGeocoder,
        // addToDataTextSearch:addToDataTextSearch,
        // getDataGeocoder:getDataGeocoder,
        // getDataTextSearch:getDataTextSearch}
    }
})();
