/**
 * Created by Magda on 2017-09-15.
 */

var searchController = (function () {

    function initMap() {
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
            address = document.getElementById('address').value;
            var xxx = document.getElementById("loader");
            xxx.classList.add("loading");

            getDataService(geocoder).getData(address);

        });
    }

    return {initMap:initMap}

})();