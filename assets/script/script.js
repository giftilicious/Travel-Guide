
var fetchbutton = document.getElementById('searchBtn');
var homebutton = document.getElementById('homeBtn');
var recentResults = JSON.parse(localStorage.getItem('results')) || []
var lastSearch = "Recent Search: " + recentResults.at(-1);

console.log(recentResults);
console.log(lastSearch);
var recentSearch = document.getElementById('recentSearch');
recentSearch.append(lastSearch);

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
            recentResults.push(inputCity);
            localStorage.setItem("results", JSON.stringify(recentResults));
            window.location.href = './results.html?lat=' + latitude + '&lon=' + longitude;

        });
}

fetchbutton.addEventListener('click', geocodeApiFunc);

