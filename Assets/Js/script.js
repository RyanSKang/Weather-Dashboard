// Linking API Key and default City
var city= "aurora"
var key= "8052fe1a5f6b6e4f4d138051e243f44e"

// Defining Variables
var currentDate=$('.date');
var date=dayjs().format('MMMM D, YYYY');
var currentTime=$('.time');
var time=dayjs().format('h:mm a');
var cityHistArr=[];
var searchBtn=$('.search');
var fiveDayForecast=$('.five-day-forecast');
var icons=$('.icons');
var description=$('.icon-description');

// Fetch the geolocation
// function getGeoLocation(city){
// var geoLocationAPI="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=8052fe1a5f6b6e4f4d138051e243f44e";
// fetch(geoLocationAPI)
// .then(function(response){
// console.log(response);
// return response.json()
// })
// .then(function(data){
//     console.log(data[0].lat);
//     console.log(data[0].lon);
// // passing the value from function getGeoLocation into function getWeatherInfo
//     getWeatherInfo(data[0].lat,data[0].lon);
// })};
// getGeoLocation();

// Fetch the weather information
// function getWeatherInfo(latitude,longitude){
//     console.log(latitude,longitude);
//     var weatherAPI="http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=8052fe1a5f6b6e4f4d138051e243f44e";
//     console.log(weatherAPI);
//     fetch(weatherAPI)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })
// }


// get the main "Today" cardbody
var cardbody=$('.weatherInfo');

// Display the weather data to main Today cardbody and display five day forecast

function getWeatherInfo(){
    var getCurrentLocationURL= "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+key;
    var cityName=$('.cityName')
    
    // Fetching Geolocation API
    
    fetch(getCurrentLocationURL)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        cityName.text(data[0].name);
    })
    
    // Fetching WeatherAPI
    
    var getCurrentWeatherURL="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=imperial&appid="+key;
    
    fetch(getCurrentWeatherURL)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        console.log(data);
        // Display Icons
        icons.attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        // Display Description of Icon
        description.append('<li class=description>'+ data.weather[0].description + "</li>");
        // Display Temperature
        cardbody.append('Temperature: '+'<li class=weatherData>'+ data.main.temp + '</li>'+ '°F');
        // Display Feels Like
        cardbody.append('Feels Like: '+'<li class=weatherData>'+ data.main.feels_like + '</li>'+ '°F');
        // Display Humidity
        cardbody.append('Humidity: '+'<li class=weatherData>'+ data.main.humidity + '</li>'+ '%');
        // Display WindSpeed
        cardbody.append('Wind Speed: '+'<li class=weatherData>'+ data.wind.speed + '</li>'+ 'mph');
    })
    
    // Displaying information on main Cardbody

    var TodaysDate=$('.date').text(date);
    currentTime.text(time);

    // Calling FiveDayForecast Function

    getFiveDayForecast();
    }

// FiveDayForecast Function
function getFiveDayForecast(){
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

    // Fetch five day forecast URL
    fetch(fiveDayForecastURL)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data); 
        var fiveDayArr=data.list;
        var weatherForecast=[];

    // Create an Object with desired weather information on each forecast card
        $.each(fiveDayArr, function(index,data){
            dataObj={
               date: data.list.dt_text[0],
               time: data.list.dt_text[1],
               temp: data.list.main.temp,
               feels_like: data.list.main.feels_like,
               icon: data.list.weather[0].icon,
               humidity: data.list.main.humidity,
            }
            // console.log(dataObj);
        if (data.list.dt_text == "12:00:00"){
            weatherForecast.push[dataObj];
        }    
        })
    //Display cards to screen
    for(i=0; i<weatherForecast.length; i++){

        var divEl=$('<div>');
            divEl.attr('class', 'card text-white bg-primary mb-3 fiveDayForecastCards');
		    divEl.attr('style', 'max-width: 200px;');
		    fiveDayForecast.append(divEl);

        var divElHeader = $('<div>');
			divElHeader.attr('class', 'card-header')
			var m = moment(`${weatherForecast[i].date}`).format('MMMM D, YYYY');
			divElHeader.text(m);
			divElCard.append(divElHeader)

		var divElBody = $('<div>');
			divElBody.attr('class', 'card-body');
			divElCard.append(divElBody);

		var divElIcon = $('<img>');
			divElIcon.attr('class', 'icons');
			divElIcon.attr('src', `https://openweathermap.org/img/wn/${weatherForecast[i].icon}@2x.png`);
			divElBody.append(divElIcon);

        //Display Temp in forecast Card
        divElBody.append('<p class=forecastTemp>' + weatherForecast[i].temp + "°F")
		
        //Display Feels_like in forecast card
        divElBody.append('<p class=forecastFeelsLike>' + weatherForecast[i].feels_like + "°F")

		//Display humidity in forecast card
        divElBody.append('<p class=forecastHumidity>' + weatherForecast[i].humidity + "%")

    } 
    })
}

// Save text value of search and save it into local storage within the Array
searchBtn.on('click', function(event){
    event.preventDefault();
    var city=document.querySelector('#city');
    var savedCity=document.querySelector('.textVal').value;
    // getGeoLocation(city.value);
    city.textContent=savedCity;
    if (city===""){
        return;
    } 
    cityHistArr.push(savedCity);
    localStorage.setItem('city', JSON.stringify(cityHistArr));
    savedHistory();
    getWeatherInfo();
}) 

// Saved History button Function defined
// function savedHistoryBtn(event){
//     console.log(event.target);
//     getGeoLocation();
//     getWeatherInfo(latitude,longitude);
// }

// Create buttons from saved text value that also acts as a search button based on history search
var cityHistEl=$('.city-history');
function savedHistory(){
    cityHistEl.empty();

    var savedHist=localStorage.getItem("city");
    // console.log(savedHist);
    savedHist=JSON.parse(savedHist);

    for (i=0; i<cityHistArr.length; i++){
        // console.log(savedHist[i]);
        cityHistEl.append('<li><button class="btnHist">' + savedHist[i] + "</button></li>");
    }

    // Created Variable selecting all buttons made in append.
    var btnHist=$('.btnHist');

    // event listener that runs btn click function
    // btnHist.on('click', savedHistoryBtn);
}