const canvas = document.getElementById("game");
const width = window.innerWidth;
const height = window.innerHeight;
const context = canvas.getContext("2d");

let x = width / 2;
let start;
let y = height / 2;
let speedX = 310;
let speedY = 310;

canvas.height = height;
canvas.width = width;

const conttollers = {
  k: "up",
  j: "down",
  l: "left",
  h: "right",
};

function fillCircle(x, y, color) {
  context.beginPath();
  context.arc(x, y, 60, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.stroke();
}

function bounce(timeStamp) {
  console.log("clicked");
  if (start === undefined) start = timeStamp;

  const deltaTime = (timeStamp - start) * 0.001;
  start = timeStamp;

  if (x + 60 >= width || x < 0) {
    speedX = -speedX;
  }
  if (y + 60 >= height || y < 0) {
    speedY = -speedY;
  }
  //
  x += speedX * deltaTime;
  y += speedY * deltaTime;
  //
  context.clearRect(0, 0, width, height);
  fillCircle(x, y, "green");
  requestAnimationFrame(bounce);
}

document.addEventListener("keydown", (event) => {
  const pressedKey = event.key;
  switch (pressedKey) {
    case "k":
      if (speedY > 0) {
        speedY = -speedY;
      }
      if (speedY === 0) speedY = -400;
      speedX = 0;
      break;
    case "j":
      if (speedY < 0) speedY = -speedY;
      if (speedY === 0) speedY = 400;
      speedX = 0;
      break;
    case "l":
      if (speedX < 0) speedX = -speedX;
      if (speedX === 0) speedX = 400;
      speedY = 0;
      break;
    case "h":
      if (speedX > 0) speedX = -speedX;
      if (speedX === 0) speedX = -400;
      speedY = 0;
      break;
  }
});
requestAnimationFrame(bounce);
