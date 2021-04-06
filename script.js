
$(document).ready(function () {
    //variables
    var APIKey = "b7d72c9e1d3c51bb5697223f11eda7dd";
    //var city = "tracy"//$(".form-control")
    var cityStats = $(".container-stats");
    var searchButton = $(".btn")
    var latitude;
    var longitude;
    var uvIndex = $("h6")
    function currentWeather(cityName) {
        //The URL we need to query the database                             {city name},{state code}
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
        //run AJAX call to weather API 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log("current: ", response);

            $(cityStats).empty();
            //Transfer to HTML
            $(cityStats).append("<h2>" + response.name + " Weather Details " + new Date().toLocaleDateString() + "</h2>");
            $(cityStats).append("<p> Temperature (F): " + response.main.temp + "</p>");
            $(cityStats).append("<p> Humidity: " + response.main.humidity + "</p>");
            $(cityStats).append("<p> Wind Speed: " + response.wind.speed + "</p>");
            $(cityStats).append("<p><img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'/></p>");
            //variables to get the latitude and longitude
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            console.log(latitude);
            console.log(longitude);

           //UV Index
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+APIKey;
            console.log("hi", queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);
                console.log("violet: ", response);
                $(cityStats).append("<p> UV Index: " + response.current.uvi + "</p>");
                uvColor = response.current.uvi;
                //UV Index color
                if (uvColor<=2){
                    $(uvIndex).addClass("uv-index");
                }else if (3<=uvColor<=5) {
                    $(uvIndex).addClass("uv-index-two");
                }else if (6<=uvColor<=7) {
                    $(uvIndex).addClass("uv-index-three");
                }
            });
        
        }
        );
       
        
    };
    
    //function violet(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+APIKey;
        console.log("hi", queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log("violet: ", response);
        });
    

    function foreCast(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;
        //run AJAX call for 5 day forecast API 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log("forecast", response);

            //filter data
            var data = response.list.filter((listItem) => listItem.dt_txt.indexOf("03:00:00") > -1);

            console.log(data);

            let cards = "";
            data.forEach(datum => {
                cards +=
                    `
                <div class="column col-md-2">
                <div class="card">
                <h4>${new Date(datum.dt_txt).toLocaleDateString()}</h4>
                <p>Temperature F: ${datum.main.temp_max}</p>
                <p>Humidity: ${datum.main.humidity}</p>
                <p>Wind Speed: ${datum.wind.speed}</p>
                <p><img src="http://openweathermap.org/img/w/${datum.weather[0].icon}.png"/></p>
                </div>
                </div>
                `;
            });

            $(".forecast-container").html(cards);

        });
    }

    function createBtn(cityName) {
        //create template
        const template = `              
        <button type="button" class="city-btn btn-default btn-block">${cityName}</button>
        `;
        //add the html to the page
        $(".search-result").append(template);
    }

    $(".search-result").on("click", ".city-btn", (event) => {
        //currentWeather
        currentWeather($(event.target).text());

        //call the forecast function
        foreCast($(event.target).text());
    });

    var data = JSON.parse(localStorage.getItem("data")) || [];
    data.forEach(datum => {
        createBtn(datum.input);
    });

    searchButton.on("click", function (event) {
        //user Input
        var userInput = $(event.target).closest(".input-group").find(".form-control").val();

        //currentWeather
        currentWeather(userInput);

        //call the forecast function
        foreCast(userInput);

        createBtn(userInput);
        //    window.localStorage.clear("data");
        //    var removeEl = document.getElementById("search-result");
        //    removeEl.remove();

        var searchResult = $(event.target).closest(".container-fluid").find("name")
        //grab history
        var data = JSON.parse(localStorage.getItem("data")) || [];
        var dataEntry = {
            input: userInput,
            id: searchResult
        };
        data.push(dataEntry);
        localStorage.setItem("data", JSON.stringify(data));
    });








});