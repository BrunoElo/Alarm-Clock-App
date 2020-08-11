//Alarm Clock functionality

let onBtn = document.querySelectorAll('.alarm-pill__slider');
onBtn[0].addEventListener('click', slide)

function slide() {

}


let currentTime = document.querySelector('.current-time');
let currentDay = document.querySelector('.current-date');



// function for showing current time
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

// add zero in front of numbers < 10
function doubleDigit(t) {
    if (t < 10) {
        t = "0" + t
    };
    return t;
}

// function for seting alarm
function setAlarm() {
    let alarmTimeInput = document.querySelector('.alarm-time__input').value;
    let alarmTime = document.querySelector('.alarm__time');
    let timePeriod = document.querySelector('.alarm__meridian');
    let alarmDate = document.querySelector('.alarm__duration');
    //console.log(alarm);
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
    // To get dynamic meridien
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

