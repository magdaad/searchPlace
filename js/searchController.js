/**
 * Created by Magda on 2017-09-15.
 */

var searchController = (function () {

    function initSearch() {

        document.getElementById('submit').addEventListener('click', function() {
            var address = document.getElementById('address').value;
            var xxx = document.getElementById("loader");
            xxx.classList.add("loading");

            getDataService().getData(address);

        });
    }

    return {initSearch:initSearch}

})();