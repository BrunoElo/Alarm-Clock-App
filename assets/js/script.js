// Alarm Clock functionality
let currentTime = document.querySelector('.current-time');
let currentDay = document.querySelector('.current-date');
let clockMeridian = document.querySelector('.clock-meridian');


function displayTime() { // Update the clock every 1 second
    setInterval(() => {
        clock()
    }, 1000);
}

// Function for showing current time
function clock() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let d = now.getDate();
    //let d = now.toLocaleString('default', {day:'numeric'});
    //let mth = now.getMonth();
    let mth = now.toLocaleString('default', { month: 'long' }); // Puts the format of the month in long form
    let y = now.getFullYear();
    m = doubleDigit(m);
    s = doubleDigit(s);
    h = twelvehr(h);

    // To get dynamic meridian
    let timestamp = now.toLocaleTimeString();
    clockMeridian.innerHTML = timestamp.slice(-2);

    currentTime.innerHTML = h + ':' + m + ':' + s;
    currentDay.innerHTML = d + 'th ' + mth + ', ' + y;


    //setTimeout(displayTime, 500); //replaced with setinterval above
}

// Add zero in front of numbers < 10
function doubleDigit(t) {
    if (t < 10) {
        t = "0" + t
    };
    return t;
}

// Puts h in 12 hour format
function twelvehr(h) {
    if (h > 12) {
        h = h - 12;
    }
    return h;
}

// Function for setting alarm
function setAlarm() {
    let alarmTimeInput = document.querySelector('.alarm-time__input').value;
    let alarmTime = document.querySelector('.alarm__time');
    let timePeriod = document.querySelector('.alarm__meridian');
    let alarmDate = document.querySelector('.alarm__duration');

    // Converts alarm set by user to milliseconds
    let alarm = new Date(alarmTimeInput);

    // Gets the current date in milliseconds
    let currentDate = new Date();

    let d = alarm.getDate();
    let mth = alarm.toLocaleString('default', { month: 'long' });
    let y = alarm.getFullYear();
    alarmDate.innerHTML = d + 'th ' + mth + ', ' + y;

    let h = alarm.getHours();
    let m = alarm.getMinutes();
    m = doubleDigit(m);
    h = twelvehr(h);

    alarmTime.innerHTML = h + ':' + m;
    // To get dynamic meridian
    let timestamp = alarm.toLocaleTimeString();
    let meridian = timestamp.slice(-2);
    //console.log(meridian);
    timePeriod.innerHTML = meridian;

    let timeDiff = alarm - currentDate;
    //console.log(timeDiff);

    if (isNaN(timeDiff)) {
        alert('invalid alarm set');
        alarmDate.innerHTML = 'Alarm Date'
        alarmTime.innerHTML = '00:00';
        timePeriod.innerHTML = '...';
    }
    if (alarm < currentDate) {
        alert('Alarm cannot be earlier than current date/time');
        alarmTime.innerHTML = '00:00';
    }
    if (timeDiff >= 0) {
        setTimeout(() => {
            
             // Plays sound when time is up
        var audio = new Audio();
        audio.src = 'assets/audio/alarmring.mp3'
        audio.play(); 
        setTimeout(function () {alert('alarm ringing')}, 1000); // alert is a blocking call so settimeout had to be used to delay it for the sound to play first.
        
        }, timeDiff);

    }
}

// Timer functionality
let countDownTimer = document.querySelector('.show-timer');
let appName = document.querySelector('.app-name');
let timerfeature = document.querySelector('.timer-container');
let alarmfeature = document.querySelector('.alarm-wrapper');

function showTimer() {
    alarmfeature.style.display = 'none';
    timerfeature.style.display = 'block'
    appName.innerHTML = 'Timer';
    //console.log('fire');
}

function showAlarm() {
    alarmfeature.style.display = 'block';
    timerfeature.style.display = 'none'
    appName.innerHTML = 'Alarm Clock';
}

let current;
var c = 0;

function startTimer() {

    clearInterval(c);// This avoids the creation of more intervals anytime the start button is clicked

    let timerHr = document.querySelector('.timer__hr').value;
    let timerMin = document.querySelector('.timer__min').value;
    let timerSec = document.querySelector('.timer__sec').value;

    current = ((timerHr * 3600) + (timerMin * 60) + (timerSec * 1));

    c = setInterval(() => {
        minusOneSec();
    }, 1000);

}

// Countdown function which subtracts 1 second every 1 second and updates display
function minusOneSec() {

    if (current > 0) {
        current = current - 1;
        let hours = Math.floor(current / 3600);
        let mins = Math.floor((current % 3600) / 60);
        let secs = current % 60
        mins = doubleDigit(mins);
        secs = doubleDigit(secs);
        countDownTimer.innerHTML = hours + ':' + mins + ':' + secs;

    } else { // Stops timer when there is no more seconds left to remove(time runs out)
        clearInterval(c);
        countDownTimer.innerHTML = "Time Up!";
        // Plays sound when time is up
        var audio = new Audio();
        audio.src = 'assets/audio/timerup.mp3'
        audio.play(); 
        setTimeout(function () {alert('Time up!')}, 1000);
    }
}

let pauseTimerBtn = document.querySelector('.timer-pause__btn');
// Pauses and resumes the timer when pause button is clicked
function pauseTimer() {
    if (c == 0) {
        c = setInterval(() => {
            minusOneSec();
        }, 1000);
        pauseTimerBtn.innerHTML = 'Pause';
    } else {
        clearInterval(c);
        c = 0;
pauseTimerBtn.innerHTML = 'Resume';
    }
}

// Resets the timer when pause button is clicked
function resetTimer() {
    clearInterval(c);
    current = 0;
    countDownTimer.innerHTML = '00:00:00';
    pauseTimerBtn.innerHTML = 'Pause';
}
