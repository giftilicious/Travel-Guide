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
            data.data.forEach(diffi => {
                if (diffi.thumbnail == null) {
                    diffi.thumbnail = "https://images.unsplash.com/photo-1600284536251-8bb98db53468?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                }

                document.getElementById('divContainer').insertAdjacentHTML("beforeend",
                    `<div class="bg-white rounded-lg border border-gray-200 shadow-md">
                    <!-- image -->
                    <div class="flex">
                        <img src="${diffi.thumbnail}" class="rounded-l-lg w-1/3 object-cover" />
                        <!-- title & body-->
                        <div class="p-8">
                            <h2 class="text-xl font-extrabold mb-5">${diffi.name}</h2>
                            <p><span class="font-semibold">City: </span>${diffi.city}</p>
                            <br>
                            <p><span class="font-semibold">Description: </span>${diffi.description}</p>
                            <br>
                            <p><span class="font-semibold">Level: </span>${diffi.difficulty}</p>
                            <br>
                            <p><span class="font-semibold">Length: </span>${diffi.length} miles</p>
                            <br>
                            <p><span class="font-semibold">Rating: </span>${diffi.rating} ⭐</p>
                            <br>
                            <a href="${diffi.url}">Learn More</a>           
                        </div>
                    </div>
                </div>`)
            });
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
            //dynaWeather.setAttribute('style', "justify-content: space-between");

            var trailTemperature = "   Current Temperature: " + data.current_weather.temperature + " °C";
            var trailWeathercode = data.current_weather.weathercode;
            var trailWindspeed = "   Current Windspeed: " + data.current_weather.windspeed + " Kmh";

            var wclearsky = document.createElement('img');
            wclearsky.setAttribute('src', "assets/images/clearsky.png");
            wclearsky.setAttribute('style', "max-width:10% ");
            var wDrizzle = document.createElement('img');
            wDrizzle.setAttribute('src', "assets/images/drizzle.png");
            wDrizzle.setAttribute('style', "max-width:10% ");
            var wFoggy = document.createElement('img');
            wFoggy.setAttribute('src', "assets/images/foggy.png");
            wFoggy.setAttribute('style', "max-width:10% ");
            var wHeavyrain = document.createElement('img');
            wHeavyrain.setAttribute('src', "assets/images/heavyrain.png");
            wHeavyrain.setAttribute('style', "max-width:10% ");
            var wOvercast = document.createElement('img');
            wOvercast.setAttribute('src', "assets/images/overcast.png");
            wOvercast.setAttribute('style', "max-width:10% ");
            var wPartlycloudy = document.createElement('img');
            wPartlycloudy.setAttribute('src', "assets/images/partlycloudy.png");
            wPartlycloudy.setAttribute('style', "max-width:10% ");

            if (data.current_weather.weathercode === 0) {
                dynaWeather.append(wclearsky);
            } else if (data.current_weather.weathercode === 1 || data.current_weather.weathercode === 2) {
                dynaWeather.append(wPartlycloudy);
            } else if (data.current_weather.weathercode === 3) {
                dynaWeather.append(wOvercast)
            } else if (data.current_weather.weathercode === 45 || data.current_weather.weathercode === 45) {
                dynaWeather.append(wFoggy)
            } else if (data.current_weather.weathercode === 51 || data.current_weather.weathercode === 53 || data.current_weather.weathercode === 55) {
                dynaWeather.append(wDrizzle)
            } else if (data.current_weather.weathercode === 61 || data.current_weather.weathercode === 63 || data.current_weather.weathercode === 65 || data.current_weather.weathercode === 80 || data.current_weather.weathercode === 81 || data.current_weather.weathercode === 82) {
                dynaWeather.append(wHeavyrain)
            }

            var headerTemp = document.createElement('li');
            headerTemp.textContent = trailTemperature;
            headerTemp.style.color = "#0f65b1";
            var headerWindspeed = document.createElement('li');
            headerWindspeed.textContent = trailWindspeed;
            headerWindspeed.style.color = "#0f65b1";

            dynaWeather.append(headerTemp, headerWindspeed);

            console.log(trailTemperature, trailWeathercode, trailWindspeed);
        });
}

