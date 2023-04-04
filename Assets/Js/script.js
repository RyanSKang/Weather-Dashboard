// Linking API Key
var key= "8052fe1a5f6b6e4f4d138051e243f44e"

// Defining Variables
var currentDate=$('.date');
var date=dayjs().format('dddd, MMMM D, YYYY');
var currentTime=$('.time');
var time=dayjs().format('h:mm a');
var cityHistArr=[];
var searchBtn=$('.search');
var fiveDayForecast=$('.five-day-forecast');
var icons=$('.icons');
var description=$('.icon-description');

// get the main "Today" cardbody
var cardbody=$('.weatherInfo');

// Display the weather data to main Today cardbody and display five day forecast

function getWeatherInfo(city){
    var getCurrentLocationURL= "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+key;
    var cityName=$('.cityName')
    
    // Fetching Geolocation API
    
    fetch(getCurrentLocationURL)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        cityName.text(data[1].name);
        var lat=data[0].lat;
        var lon=data[0].lon;
        weatherAPI(lat,lon);
    })
    getFiveDayForecast(city);
}

function weatherAPI(lat, lon){
    var getCurrentWeatherURL="https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid="+key;
    
    // Fetching WeatherAPI
    fetch(getCurrentWeatherURL)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        cardbody.empty();
        description.empty();
        
        console.log(data);
        // Display Icons
        icons.attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        // Display Description of Icon
        description.append('<li class=description>'+ data.weather[0].description + "</li>");
        // Display Temperature
        cardbody.append('<li class=weatherData>' + 'Temperature: ' + data.main.temp + '°F' + '</li>');
        // Display Feels Like
        cardbody.append('<li class=weatherData>' + 'Feels Like: ' + data.main.feels_like + '°F' + '</li>');
        // Display Humidity
        cardbody.append('<li class=weatherData>' + 'Humidity: ' + data.main.humidity + '%' + '</li>');
        // Display WindSpeed
        cardbody.append('<li class=weatherData>' + 'Wind Speed: '+ data.wind.speed + 'mph' + '</li>');
    })
    
    // Displaying information on main Cardbody
    
    var TodaysDate=$('.date').text(date);
    currentTime.text(time);
}

// FiveDayForecast Function
function getFiveDayForecast(city){
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
    
    // Fetch five day forecast URL
    fetch(fiveDayForecastURL)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data, " data inside .Then ----"); 
        var fiveDayArr=data.list;
        var weatherForecast=[];
        
        
        //Display cards to screen
        fiveDayForecast.empty();
        
        // Increment of 8 for loop gave me consistent data taken at 12:00:00 time for each day
        
        for(i=3; i<=39; i+=8){
            
            var forecastDate=data.list[i].dt_txt.split(' ')[0];
            forecastDate=dayjs(forecastDate).format('MMMM D, YYYY');
            
            var divEl=$('<div>');
            divEl.attr('class', 'card mb-3 fiveDayForecastCards');
		    divEl.attr('style', 'max-width: 200px;');
		    fiveDayForecast.append(divEl);
            
            var divElHeader = $('<div>');
			divElHeader.attr('class', 'card-header');
			divEl.append(divElHeader);
            
            var divElBody = $('<div>');
			divElBody.attr('class', 'card-body');
			divEl.append(divElBody);
            
            var divElIcon = $('<img>');
			divElIcon.attr('class', 'icons');
			divElIcon.attr('src', "https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png");
			divElBody.append(divElIcon);
            
            // Display date on forecast Card
            divElHeader.append('<h4 class="date-header">' + forecastDate) + '</h4>';
            
            // Display Temp on forecast Card
            divElBody.append("<li>" + "Temperature: " + data.list[i].main.temp + "°F" + "</li>")
            
            // Display Feels Like on forecast Card
            divElBody.append("<li>" + "Feels Like: " + data.list[i].main.feels_like + "°F" + "</li>");
            
            // Display Humidity on forecast Card
            divElBody.append("<li>" + "Humidity: " + data.list[i].main.humidity + "%" + "</li>");
            
            // Display Wind Speed on Forecast Card
            divElBody.append("<li>" + "Wind Speed: " + data.list[i].wind.speed + "mph" + "</li>");
            
        } 
    }
    )}
    
    // Save text value of search and save it into local storage within the Array
    searchBtn.on('click', function(event){
        event.preventDefault();
        var city=document.querySelector('#city');
        // var savedCity=document.querySelector('.textVal').value;
        // console.log({city})
        // city.textContent=savedCity;
        
        // if (city===""){
            //     return;
            // } 
            cityHistArr.push(city.value);
            localStorage.setItem('city', JSON.stringify(cityHistArr));
            savedHistory();
            // console.log(city.value)
            getWeatherInfo(city.value);
        }) 
        
        // Saved History button Function defined
        function savedHistoryBtn(event){
            // console.log(event.target.textContent);
            getWeatherInfo(event.target.textContent);
        }
        
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
            btnHist.on('click', savedHistoryBtn);
        }
        
        // define a ready function for a default city to be displayed
        $(document).ready(function(){
            var defaultCity = "Aurora";
            getWeatherInfo(defaultCity);
        })