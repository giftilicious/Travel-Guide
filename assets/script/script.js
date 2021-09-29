//working geo code api to change the locattion from name to geo location i.e. latitude and longitude.
function geocodeApiFunc() {
    var geocodeUrl = "https://geocode.search.hereapi.com/v1/geocode?q=waterloo,ON&apiKey=h2Z7HjpBCGTzBXdH5jrId3cTFryvob9gDpL1Y5faxaI";
    fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var latitude = data.items[0].position.lat;
            var longitude = data.items[0].position.lng
            console.log(latitude, longitude);
            trailApi(latitude, longitude)
            weatherApiFunc(latitude, longitude);
        });


    var tablebody = document.getElementById('results');


    function trailApi(lat, lon) {
        fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + lat + "&lon=" + lon + "&per_page=20", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": "8d865802b7msh2e691d434973416p1b41cejsnb0d8a7dd6a50"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                // var desc = document.createElement('p');
                // document.getElementById('results').innerHTML = " ";
                // desc.textContent = data.data[0].description;
                // tablebody.appendChild(desc);

                //filters trails by difficulty
                var selectDifficulty = data.data.filter(function (difi) {
                    return difi.difficulty == "Beginner";
                });
                console.log(selectDifficulty);

                //creates div of all the names of the filtred trails
                for (var i = 0; i < selectDifficulty.length; i++) {
                    //console.log(selectDifficulty[i].name)
                    var trailName = document.createElement('p');
                    trailName.textContent = "Name of the trail: " + selectDifficulty[i].name;
                    tablebody.appendChild(trailName);

                    var trailCity = document.createElement('p');
                    trailCity.textContent = "City: " + selectDifficulty[i].city;
                    tablebody.appendChild(trailCity);

                    var trailDescription = document.createElement('p');
                    trailDescription.textContent = "Description: " + selectDifficulty[i].description;
                    tablebody.appendChild(trailDescription);

                    var trailDifficulty = document.createElement('p');
                    trailDifficulty.textContent = "Difficulty of the trail: " + selectDifficulty[i].difficulty;
                    tablebody.appendChild(trailDifficulty);

                    var trailLength = document.createElement('p');
                    trailLength.textContent = "Length of the trail: " + selectDifficulty[i].length + " Kms";
                    tablebody.appendChild(trailLength);

                    var trailRating = document.createElement('p');
                    trailRating.textContent = "Rating of the trail: " + selectDifficulty[i].rating;
                    tablebody.appendChild(trailRating);

                    var trailUrl = document.createElement('p');
                    trailUrl.textContent = "Webpage of the trail: " + selectDifficulty[i].url;
                    tablebody.appendChild(trailUrl);

                    var trailThumbnail = document.createElement('img');
                    trailThumbnail.src = selectDifficulty[i].thumbnail;
                    tablebody.appendChild(trailThumbnail);
                }
            });

    }


}

geocodeApiFunc();


//working weather api that accepts latitude and longitude as the parameters to show the current weather and the forecast weather for upto hourly 7 days.
function weatherApiFunc(latitude, longitude) {
    var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m&current_weather=true";
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
}