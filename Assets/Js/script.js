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
var geoLocationAPI="http://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=8052fe1a5f6b6e4f4d138051e243f44e";
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
    var savedCity=document.querySelector('.textVal').value;
    city.textContent=savedCity;
    if (city===""){
        return;
    } 
    cityHistArr.push(savedCity);
    localStorage.setItem('city', JSON.stringify(cityHistArr));
    savedHistory();
    getWeatherInfo();
})

// Create buttons from saved text value that also acts as a search button based on history search
var savedHist=document.querySelector('.city-history');
function savedHistory(){
    for (i=0; i<cityHistArr.length; i++){
        var rowEl=document.querySelector("row");
        var btnEl=document.querySelector("button");
        btnEl.textContent=savedHist[i];
        rowEl.classList.add('histBtnRow');
        btnEl.classList.add('histBtn');
        btnEl.setAttribute('type', 'button');

        savedHist.prepend(rowEl);
        rowEl.append(btnEl);        
    } if (!city){
        return;
    }

// Allows the button to be used as a search from history
var histBtn=document.querySelector('.histBtnRow');
histBtn.addEventListener('click', function(event){
    console.log('saved history list');
    event.preventDefault();

}) 
}
