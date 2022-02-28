const startBtn = document.querySelector(".buttons__start");
const pauseBtn = document.querySelector(".buttons__pause");
const stopBtn = document.querySelector(".buttons__stop");
const resetBtn = document.querySelector(".buttons__reset");
const historyBtn = document.querySelector(".buttons__history");
const stopWatch = document.querySelector(".stoper__stopwatch");
const time = document.querySelector(".stoper__time");
const timeList = document.querySelector(".timeList");
const infoBtn = document.querySelector(".fa-question");

const modalShadow = document.querySelector(".modalShadow");
const closeModalBtn = document.querySelector(".modalShadow__modal-close");

const colorBtn = document.querySelector(".fa-paint-brush");
const colorPanel = document.querySelector(".stoper__colors");
const colorOne = document.querySelector(".stoper__colors-one");
const colorTwo = document.querySelector(".stoper__colors-two");
const colorThree = document.querySelector(".stoper__colors-three");
let root = document.documentElement;

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];

const handleStart = () => {
  clearInterval(countTime); //zabezpiecznie przed przyspieszniem czasu podczas klikania play
  timeList.textContent = "";
  countTime = setInterval(() => {
    console.log(seconds);
    if (seconds < 9) {
      seconds++;
      stopWatch.textContent = `${minutes}:0${seconds}`;
    } else if (seconds >= 9 && seconds < 59) {
      seconds++;
      stopWatch.textContent = `${minutes}:${seconds}    `;
    } else {
      minutes++;
      seconds = 0;
      stopWatch.textContent = `${minutes}:0${seconds}`;
    }
  }, 1000);
};

const handlePause = () => clearInterval(countTime);

const handleStop = () => {
  time.innerHTML = `Last time: ${stopWatch.textContent}`;
  if (stopWatch.textContent !== "0:00") {
    timesArr.push(stopWatch.textContent);
    console.log(timesArr);
    time.style.visibility = "visible";
  } else {
    time.style.visibility = "hidden";
  }
  clearStuff();
};

const handleReset = () => {
  clearStuff();
  time.style.visibility = "hidden";
  timesArr = [];
};

const clearStuff = () => {
  stopWatch.textContent = `0:00`;
  clearInterval(countTime);
  timeList.textContent = "";
  seconds = 0;
  minutes = 0;
};

const showHistory = () => {
  timeList.textContent = "";
  let num = 1;
  timesArr.forEach((time) => {
    const liItems = document.createElement("li");
    liItems.innerHTML = `Time nr.${num}: <span>${time}</span>`;
    timeList.appendChild(liItems);
    num++;
  });
};

const showModal = () => {
  if (!(modalShadow.style.display === "block")) {
    modalShadow.style.display = "block";
  } else {
    modalShadow.style.display = "none";
  }

  modalShadow.classList.toggle("show-modal-animation");
};

const clickHideModal = (e) => (e.target === modalShadow ? showModal() : false);

const showColors = () => {
  colorPanel.classList.toggle("show-colors");
};

const changeFirstColor = () => {
  root.style.setProperty("--first-color", "rgb(215, 212, 38)");
  root.style.setProperty("--hover-color", "rgb(194, 192, 56)");
};

const changeSecondColor = () => {
  root.style.setProperty("--first-color", "rgb(6, 173, 250)");
  root.style.setProperty("--hover-color", "rgb(82, 153, 185)");
};

const changeThirdColor = () => {
  root.style.setProperty("--first-color", "rgb(0, 250, 42)");
  root.style.setProperty("--hover-color", "rgb(76, 179, 93)");
};

startBtn.addEventListener("click", handleStart);
pauseBtn.addEventListener("click", handlePause);
stopBtn.addEventListener("click", handleStop);
resetBtn.addEventListener("click", handleReset);
historyBtn.addEventListener("click", showHistory);
infoBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", showModal);
window.addEventListener("click", clickHideModal);

//colors
colorBtn.addEventListener("click", showColors);
colorOne.addEventListener("click", changeFirstColor);
colorTwo.addEventListener("click", changeSecondColor);
colorThree.addEventListener("click", changeThirdColor);
