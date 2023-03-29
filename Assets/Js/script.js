// Linking weather API

// Defining Variables
var currentDate=document.querySelector('date');
var date=dayjs().format('MMMM/DD/YYYY');
var currentTime=document.querySelector('time');
var time=dayjs().format('h:mm a');
// Grabs the current time and date
function ready(){
    currentDate.textContent(date);
    currentTime.textContent(time);
}
ready();
