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
var fiveDayForecast=$('five-day-forecast');

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
var cardbody=$('.cardBodyToday');

// Display the weather data to main Today cardbody and display five day forecast

function getWeatherInfo(){
    var getCurrentLocationURL= "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+key;
    var cityName=$('.cityName')
    
    // Fetching Geolocation API
    
    fetch(getCurrentLocationURL)
    .then(function(response){
        console.log(response);
        return response.json();
        cityName.html(response.name);
    })
    .then(function(data){
        console.log(data);
    })
    
    // Fetching WeatherAPI
    
    var getCurrentWeatherURL="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid="+key;
    fetch(getCurrentWeatherURL)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        console.log(data);
    })
    
    // Displaying information on main Cardbody
    
    var TodaysDate=$('.date').text(date);


    }
getWeatherInfo();

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
    // getWeatherInfo();
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