/**
 * Created by Magda on 2017-09-15.
 */



var view = (function () {

    function showResults(results, where) {
        for (var i = 0; i < results.length; i++) {
            // var place = results[i];
            var y;
            var x = document.createTextNode(results[i].address);
            if (where == "right"){
                y = document.getElementById("placeListSearch");
            }
            else{
                y = document.getElementById("placeList");
            }

            var z = document.createElement("DIV");
            z.appendChild(x);
            y.appendChild(z);
        }
    }

    return {showResults:showResults}

})();
