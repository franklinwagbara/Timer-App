const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const hourSelect = document.getElementById("hour-select");
const minuteSelect = document.getElementById("minute-select");
const secondSelect = document.getElementById("second-select");
const enable = document.getElementById("enable");
const checkBoxes = document.getElementById("check-boxes");

let state = 0;

let startTime = new Date().getTime();
const setTime = new Date();

loadSelect();

setInterval(main, 1000);

////////////////////////////////////////////////////////////////////
//////////Function Definitions Below//////////////////////////////////
function main() {
  if (state === 0) {
    return;
  }

  const oneHour = new Date().setHours(2, 0, 0, 0);

  const currentDate = new Date();
  const diff =
    startTime.getTime() + setTime.getTime() - currentDate.getTime() + oneHour;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 3600) % 24;

  hoursElement.innerHTML = format(hours);
  minutesElement.innerHTML = format(minutes);
  secondsElement.innerHTML = format(seconds);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    state = 0;
    showStop();
  }
}

enable.addEventListener("click", function () {
  if (enable.innerHTML === "Set") {
    const hours = hourSelect.options[hourSelect.selectedIndex].value;
    const minutes = minuteSelect.options[minuteSelect.selectedIndex].value;
    const seconds = secondSelect.options[secondSelect.selectedIndex].value;

    if (hours === "00" && minutes === "00" && seconds === "00") {
      alert("Time must be greater than 0");
      return;
    }

    startTime = new Date();
    setTime.setHours(hours, minutes, seconds);

    state = 1;
    hideStop();
    main();

    checkBoxes.style.display = "none";
    enable.innerHTML = "Enable";
    enable.className = "enable";

    return;
  }
  checkBoxes.style.display = "block";
  enable.innerHTML = "Set";
  enable.className = "no-opaque";
});

function showStop() {
  const stop = document.getElementById("stop");
  stop.style.opacity = "1.0";
  var sound = new Audio("alarm.wav");
  sound.play;
}

function hideStop() {
  const stop = document.getElementById("stop");
  stop.style.opacity = "0.0";
}

function loadSelect() {
  loadOptions(hourSelect, 24);
  loadOptions(minuteSelect, 60);
  loadOptions(secondSelect, 60);
}

function loadOptions(select, max) {
  let htmlValue = "";
  for (var i = 0; i < max; i++) {
    htmlValue +=
      " " + `<option size=4 value="${format(i)}">${format(i)}</option>`;
  }
  select.innerHTML = htmlValue;
}

function format(number) {
  if (number < 10) return `0${number}`;
  return number;
}
