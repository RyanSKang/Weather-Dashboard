// Linking weather API

// Defining Variables
var currentDate=document.querySelector('.date');
var date=dayjs().format('MMMM/DD/YYYY');
var currentTime=document.querySelector('.time');
var time=dayjs().format('h:mm a');
var cityHistArr=[];
var searchBtn=document.querySelector('.search');


// Fetch the geolocation
function getGeoLocation(){
var geoLocationAPI="http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=8052fe1a5f6b6e4f4d138051e243f44e";
fetch(geoLocationAPI)
.then(function(response){
// console.log(response);
return response.json()
})
.then(function(data){
    // console.log(data[0].lat);
    // console.log(data[0].lon);
    // passing the value from function getGeoLocation into function getWeatherInfo
    getWeatherInfo(data[0].lat,data[0].lon);
})};
getGeoLocation();

// Fetch the weather information
function getWeatherInfo(latitude,longitude){
    console.log(latitude,longitude);
    var weatherAPI="http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=8052fe1a5f6b6e4f4d138051e243f44e";
fetch(weatherAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

// Save text value of search and save it into local storage within the Array
searchBtn.addEventListener('click', function(getGeoLocation){
    var city=document.querySelector('#city');
    var savedCity=city.value;
    getGeoLocation(city.value);
    console.log(savedCity);
})
