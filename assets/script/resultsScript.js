let tName
let tCity
let tDescription
let tDifficulty
let tLength
let tRating
let tUrl
let tThumbnail
let dynaEl

let queryString = document.location.search;

let latitudeArray1 = queryString.split('=')[1];
let longitude = queryString.split('=')[2];
let latString = latitudeArray1.toString();
let latitude = latString.split('&')[0];
console.log(latitude,
    longitude);

window.onload = function () {
    trailApi(), weatherApiFunc();
};

function trailApi() {
    fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + latitude + "&lon=" + longitude + "&per_page=20", {
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

            //filters trails by difficulty
            // var difficultySelector = document.querySelector('input[name="difficulty"]:checked').value;
            // selectDifficulty = data.data.filter(function (difi) {
            //     return difi.difficulty == difficultySelector;
            // });
            // console.log(selectDifficulty);

            data.data.forEach(diffi => {
                if (diffi.thumbnail == null) {
                    diffi.thumbnail = "https://images.unsplash.com/photo-1600284536251-8bb98db53468?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                }


                document.getElementById('divContainer').insertAdjacentHTML("beforeend",

                    `<div class="bg-white rounded-lg border border-gray-200 shadow-md">
                            <!-- image -->
                            <div class="flex">
                                <img src="${diffi.thumbnail}" class="rounded-l-lg h-80 w-1/3 object-cover" />
                                <!-- title & body-->
                                <div class="p-8">
                                    <h2 class="text-xl font-extrabold mb-5">${diffi.name}</h2>
                                    <p>Descrition:  ${diffi.description}</p>
                                    <p>City:  ${diffi.city}</p>
                                    <p>Difficulty of the Trail:  ${diffi.difficulty}</p>
                                    <p>Length of the Trail:  ${diffi.length}</p>
                                    <p>Rating of the Trail:  ${diffi.rating}</p>
                                    <a href="${diffi.url}">Visit Trail!</a>

                                </div>
                            </div>
                        </div>`)

            });

            //creates div of all the names of the filtred trails
            // for (var i = 0; i < selectDifficulty.length; i++) {

            //     dynaEl = document.querySelector("#divContainer")
            //     var dynaCard = document.querySelector("#cardList");

            //     var cardName = document.createElement('li');
            //     var cardCity = document.createElement('li');
            //     var cardDescription = document.createElement('li');
            //     var cardDifficulty = document.createElement('li');
            //     var cardLength = document.createElement('li');
            //     var cardRating = document.createElement('li');
            //     var cardUrl = document.createElement('a');
            //     cardUrl.setAttribute('href', selectDifficulty[i].url);
            //     cardUrl.setAttribute('target', "_blank");
            //     cardUrl.innerText = "Visit Trail";
            //     var cardThumbnail = document.createElement('img');
            //     cardThumbnail.setAttribute('src', selectDifficulty[i].thumbnail);
            //     cardThumbnail.setAttribute('class', 'rounded-t-lg h-80 w-1/3 object-cover');
            //     if (selectDifficulty[i].thumbnail == null) {
            //         cardThumbnail = "No image available"
            //     }



            //     dynaCard.append(cardName, cardCity, cardDescription, cardDifficulty, cardLength, cardRating, cardUrl, cardThumbnail);

            //     tName = selectDifficulty[i].name;
            //     tCity = selectDifficulty[i].city;
            //     tDescription = selectDifficulty[i].description;
            //     tDifficulty = selectDifficulty[i].difficulty;
            //     tLength = selectDifficulty[i].length;
            //     tRating = selectDifficulty[i].rating;
            //     tUrl = selectDifficulty[i].url;
            //     tThumbnail = selectDifficulty[i].thumbnail;
            //     //console.log(cardName.textContent = tName, tCity, tDescription, tDifficulty, tLength, tRating);
            //     cardName.textContent = "Name of the Trail: " + tName;
            //     cardCity.textContent = "Trail located in: " + tCity;
            //     cardDescription.textContent = "Trail info: " + tDescription;
            //     cardDifficulty.textContent = "Trail difficulty level: " + tDifficulty;
            //     cardLength.textContent = "Trail length: " + tLength + " Kms";
            //     cardRating.textContent = "Trail ratings: " + tRating;
            // }
        });
}
function weatherApiFunc() {
    var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=sunrise,sunset,winddirection_10m_dominant&current_weather=true&timezone=America%2FNew_York";
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var dynaWeather = document.querySelector('#headerDiv');
            dynaWeather.setAttribute('style', "justify-content: space-between");
            //dynaWeather.setAttribute('style', "align-items-center");

            var trailTemperature = "   Current Temperature: " + data.current_weather.temperature + " °C";
            var trailWeathercode = data.current_weather.weathercode;
            var trailWindspeed = "   Current Windspeed: " + data.current_weather.windspeed + " Kmh";

            var wclearsky = document.createElement('img');
            wclearsky.setAttribute('src', "assets/images/clearsky.png");
            var wDrizzle = document.createElement('img');
            wDrizzle.setAttribute('src', "assets/images/drizzle.png");
            var wFoggy = document.createElement('img');
            wFoggy.setAttribute('src', "assets/images/foggy.png");
            var wHeavyrain = document.createElement('img');
            wHeavyrain.setAttribute('src', "assets/images/heavyrain.png");
            var wOvercast = document.createElement('img');
            wOvercast.setAttribute('src', "assets/images/overcast.png");
            var wPartlycloudy = document.createElement('img');
            wPartlycloudy.setAttribute('src', "assets/images/partlycloudy.png");
            wPartlycloudy.setAttribute('style', "max-width:6% ");


            if (data.current_weather.weathercode === 0) {
                dynaWeather.append(wclearsky);
            } else if (data.current_weather.weathercode === 1 || data.current_weather.weathercode === 2) {
                dynaWeather.append(wPartlycloudy);
            } else if (data.current_weather.weathercode === 3) {
                weatherIcon.append(wOvercast)
            } else if (data.current_weather.weathercode === 45 || data.current_weather.weathercode === 45) {
                weatherIcon.append(wFoggy)
            } else if (data.current_weather.weathercode === 51 || data.current_weather.weathercode === 53 || data.current_weather.weathercode === 55) {
                weatherIcon.append(wDrizzle)
            } else if (data.current_weather.weathercode === 61 || data.current_weather.weathercode === 63 || data.current_weather.weathercode === 65 || data.current_weather.weathercode === 80 || data.current_weather.weathercode === 81 || data.current_weather.weathercode === 82) {
                weatherIcon.append(wHeavyrain)
            }

            var headerTemp = document.createElement('p');
            headerTemp.textContent = trailTemperature;
            headerTemp.style.color = "#ffffff";
            var headerWindspeed = document.createElement('p');
            headerWindspeed.textContent = trailWindspeed;
            headerWindspeed.style.color = "#ffffff";

            dynaWeather.append(headerTemp, headerWindspeed);


            console.log(trailTemperature, trailWeathercode, trailWindspeed);
        });
}

