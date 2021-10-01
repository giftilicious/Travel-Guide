//working geo code api to change the locattion from name to geo location i.e. latitude and longitude.

var fetchbutton = document.getElementById('searchBtn');
var homebutton = document.getElementById('homeBtn');
// let selectDifficulty



function geocodeApiFunc(event) {
    event.preventDefault()
    //hide();
    var inputCity = document.getElementById("city-search").value;
    var province = document.getElementById("province-select").value;
    var geocodeUrl = "https://geocode.search.hereapi.com/v1/geocode?q=" + inputCity + "," + province + "&apiKey=h2Z7HjpBCGTzBXdH5jrId3cTFryvob9gDpL1Y5faxaI";
    fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var latitude = data.items[0].position.lat;
            var longitude = data.items[0].position.lng
            console.log(latitude, longitude);
            window.location.href = './results.html?lat=' + latitude + '&lon=' + longitude;

            trailApi(latitude, longitude)
            weatherApiFunc(latitude, longitude);
        });
}


fetchbutton.addEventListener('click', geocodeApiFunc);