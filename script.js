// $('#myList a[href="#profile"]').tab('show') // Select tab by name
// $('#myList a:first-child').tab('show') // Select first tab
// $('#myList a:last-child').tab('show') // Select last tab
// $('#myList a:nth-child(3)').tab('show') // Select third tab

//variables
var APIKey = "b7d72c9e1d3c51bb5697223f11eda7dd";
var city = "tracy";
var cityStats = $(".container-stats")

//The URL we need to query the database                             {city name},{state code}
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

//run AJAX call to weather API 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(queryURL);
    console.log(response);
//Transfer to HTML
    $(cityStats).append("<h2>" + response.name + " Weather Details</h2>");
    $(cityStats).append("<p> Temperature (F): " + response.main.temp + "</p>");
    $(cityStats).append("<p> Humidity: " + response.main.humidity + "</p>");
    $(cityStats).append("<p> Wind Speed: " + response.wind.speed + "</p>");
} 
    );
