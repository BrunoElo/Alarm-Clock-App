 // Alarm Clock functionality
let currentTime = document.querySelector('.current-time');
let currentDay = document.querySelector('.current-date');


// Function for showing current time
function displayTime() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let d = now.getDate();
    //let d = now.toLocaleString('default', {day:'numeric'});
    //let mth = now.getMonth();
    let mth = now.toLocaleString('default', { month: 'long' });
    let y = now.getFullYear();
    m = doubleDigit(m);
    s = doubleDigit(s);
    currentTime.innerHTML = h + ':' + m + ':' + s;
    currentDay.innerHTML = d + 'th ' + mth + ', ' + y;

    setTimeout(displayTime, 500);
}

// Add zero in front of numbers < 10
function doubleDigit(t) {
    if (t < 10) {
        t = "0" + t
    };
    return t;
}

// Function for seting alarm
function setAlarm() {
    let alarmTimeInput = document.querySelector('.alarm-time__input').value;
    let alarmTime = document.querySelector('.alarm__time');
    let timePeriod = document.querySelector('.alarm__meridian');
    let alarmDate = document.querySelector('.alarm__duration');
    // console.log(alarm);
    let alarm = new Date(alarmTimeInput);
    let currentDate = new Date();

    let d = alarm.getDate();
    let mth = alarm.toLocaleString('default', { month: 'long' });
    let y = alarm.getFullYear();
    alarmDate.innerHTML = d + 'th ' + mth + ', ' + y;

    let h = alarm.getHours();
    let m = alarm.getMinutes();
    m = doubleDigit(m);
    // Puts h in 12 hour format
    if (h > 12) {
        h = h - 12;
    }
    alarmTime.innerHTML = h + ':' + m;
    // To get dynamic meridian
    let timestamp = alarm.toLocaleTimeString();
    let meridian = timestamp.slice(-2);
    console.log(meridian);
    timePeriod.innerHTML = meridian;

    let timeDiff = alarm - currentDate;
    console.log(timeDiff);

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
            alert('alarm ringing')
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
   console.log('fire');
} 

function showAlarm() {
    alarmfeature.style.display = 'block';
    timerfeature.style.display = 'none'
   appName.innerHTML = 'Alarm Clock';
} 




function startTimer() {

    // Updates the display every 1 second
    setInterval(() => {
        workingTimer()
    }, 1000);
    
}

function workingTimer() {


    let timerInput = document.querySelector('.timer__input').value;

    // Set the date to countdown to
    let countDownDate = new Date(timerInput).getTime();

    // Set the date to countdown from
    let timeNow = new Date(/* timerInput */).getTime();
    //console.log(timerInput);

    let timerDiff = countDownDate - timeNow;

    // Time calculation for days, hours, minutes and seconds
    //var days = Math.floor(timerDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timerDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timerDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timerDiff % (1000 * 60)) / (1000));
    minutes = doubleDigit(minutes);
    seconds = doubleDigit(seconds);


    countDownTimer.innerHTML = hours + ':' + minutes + ':' + seconds;

    if (timerDiff < 0) {
        clearInterval();
        countDownTimer.innerHTML = "Time Up!";
    }

}


