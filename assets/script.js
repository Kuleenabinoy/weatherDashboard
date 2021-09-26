var apiKey = "1695a85bf822350fc6b4ed134da665b7";
var cities = [];
var currentWeather = $("#currentWeather");
var fivedayForcast = $("#fivedayForcast");
var cityName = $("#cityName");
var currentDay = moment().format("MMMM Do YYYY");
console.log(currentDay);

function getWeather(cityName1) {
    console.log(cityName1);
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName1 + "&appid=" + apiKey;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            displayWeather(data, cityName1);
        });
}
function displayWeather(data, cityName1) {
    $("#date").append(currentDay);
    $("#currentCity").append(data.name);
    var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    console.log(icon);
    $("#icon").attr("src", icon);
    var temp = data.main.temp;
    var tempC = Math.floor(temp - 273.15);
    console.log(tempC);
    $("#maxtemp").append(tempC + "&deg;C");
    var windspeed = data.wind.speed;
    $("#windspeed").append(windspeed + "MPH");
    var humidity = data.main.humidity;
    $("#humidity").append(humidity + "%");
    uvIndex(data.coord.lon, data.coord.lat);
}
function uvIndex(lon, lat) {
    console.log(lon, lat);
    var requestUrlUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(requestUrlUV)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var Uv = data.value;
            console.log(Uv);
            if (Uv >= 0 && Uv <= 2) {
                $("#uvcolor").css("background-color", "green").css("color", "white");
            } else if (Uv >= 3 && Uv <= 5) {
                $("#uvcolor").css("background-color", "yellow").css("color", "black");
            } else if (Uv >= 6 && Uv <= 7) {
                $("#uvcolor").css("background-color", "orange").css("color", "black");
            } else if (Uv >= 8 && Uv <= 10) {
                $("#uvcolor").css("background-color", "red").css("color", "white");
            }
            //else {
            //     $("#uvcolor").css("background-color", "purple").css("color", "black");
            // }
            $("#uvcolor").append(Uv);
        });
}

$("#submitBtn").click(function (event) {
    event.preventDefault();
    var cityName1 = cityName.val().trim();
    console.log(cityName1);
    if (cityName1) {
        getWeather(cityName1);
        getweatherForcast(cityName1);
    } else {
        alert("Please Enter A City");
    }
});
function getweatherForcast(cityName1) {
    var requestUrlforcast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName1 + "&appid=" + apiKey;
    fetch(requestUrlforcast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#fivedayForcast").empty();

            for (var i = 0; i < 40; i = i + 8) {
                var day = data.list[i];
                var card = $("<div>").addClass("col-md-2 card ");
                var cardBody = $("<div>").addClass("card-body ");
                var date = moment(day.dt_txt).format("ddd, MMM D");
                console.log(date, "date");
                $("<p>").addClass("card-text").text(date);
                var temp = day.main.temp;
                var tempC = Math.floor(temp - 273.15) + "&deg;C";
                console.log(tempC);
                $("<p>").addClass("card-subtitle mb-2 text-muted").text(tempC);
                var humd = day.main.humidity + "%";
                console.log(humd);
                $("<p>").addClass("card-subtitle mb-2 text-muted").text(humd);
                var windspeed = day.wind.speed + "MPH";
                console.log(windspeed);
                $("<p>").addClass("card-subtitle mb-2 text-muted").text(windspeed);
                var icon = "http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
                console.log(icon);
                // $("<img>").attr("card-img-top", (src = icon));
                card.append(cardBody.append(date, tempC, humd, windspeed));
                $("#fivedayForcast").append(card);
            }
        });
}

// $("#five-day").empty();

// for (var i = 0; i < 40; i += 8) {
//     var day = response.list[i];
//     var card = $("<div>").addClass("col-md-2 card week");
//     var cardBody = $("<div>").addClass("card-body");
//     var date = $("<h5>").addClass("card-title").text(day.dt_txt.split(" ")[0]);
//     var temp = $("<h6>")
//     .addClass("card-subtitle mb-2")
//     .text(Math.round(day.main.temp) + "˚F");
//     var hum = $("<p>").addClass("card-subtitle text-muted").text(day.main.humidity + "% Humidity");
//     var icon = $("<img>")
//     icon.attr("src", "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png");
//     var iconText = $("<p>")
//     iconText.text(day.weather[0].description);
//     card.append(cardBody.append(date, temp, icon, iconText, hum));
//     $("#five-day").append(card);
// }
