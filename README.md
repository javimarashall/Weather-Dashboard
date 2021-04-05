# Weather-Dashboard

## Site
[!Site](./assets/site.png)

## Technologies Used
- HTML - Used to write the code for making the website
- CSS - Used to style the HTML code
- Javascript - Used to enhance the application and fetch API
- GitHub - Used to store the repository in the cloud
- Git - Used to push edits up to the GitHub repository
- Open Weather Map API - Used to fetch the weather data used for the application

## Summary
This site contains a weather dashboard application. At the initial loading of the application the user encounters an input field that requires the user to enter a city name. The user enters a city name and presses search. The application loads a container with the current weather information for the given city. The application displayed contains temperature in fahrenheit, humidity, weather icons, and wind speed. Also, the application displays a five day forecast. The information displayed contains the date, temperature in fahrenheit, humidity, wind speed, and icons showing weather conditions. Another interesting feature of the application is the it stores the search history in the local storage for easy access for the user to just pressed the button of the search history.   

## Code Snippet 
This code snippet is included because it is one of the new things I recently learned, how to obtain data from other sites using API. I think it's a cool feature that opens up many doors.

 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;<br>
        //run AJAX call to weather API <br>
        $.ajax({<br>
            url: queryURL,<br>
            method: "GET"<br>
        }).then(function (response) {<br>
            console.log(queryURL);<br>
            console.log("current: ",response);<br>

## Repository Link
https://github.com/javimarashall/Weather-Dashboard

## Deploy Link
https://javimarashall.github.io/Weather-Dashboard/