document.querySelector(".lock").
addEventListener("click", ()=>{
    document.querySelector(".lock").
    classList.toggle("change");
})

document.querySelector(".mirror").
addEventListener("click", ()=>{
    document.querySelector(".mirror").
    classList.toggle("change");
})

document.querySelector(".hintbtn").
addEventListener("click", ()=>{
    document.querySelector(".letter").
    classList.toggle("change");
})

//timer
const time_el = document.querySelector(".time");

let seconds = 0;
let interval = null;
function timer() {
  seconds++;

  //de timer formatten
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;

  if (secs < 10) secs = "0" + secs;
  if (mins < 10) mins = "0" + mins;

  time_el.innerText = `${mins}:${secs}`;
}

//timer starten
function start() {
  if (interval) {
    return;
  }
  interval = setInterval(timer, 1000);
}

start();

//timer stoppen
function stoppen() {
  clearInterval(interval);
  interval = null;
}