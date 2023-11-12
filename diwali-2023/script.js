import Particle from "./particle.js";

function createBulbs(parent) {
  const colors = [
    "#00ffff",
    "#FF0000",
    "#000080",
    "#dc143c",
    "#9932cc",
    "#ffd700",
    "#ff00ff",
    "#00ff7f",
    "#ffff00",
    "#9acd32",
  ];
  for (let i = 0; i < 10; i++) {
    const bulb = document.createElement("div");
    bulb.style.backgroundColor = colors[i];
    bulb.dataset.color = colors[i];
    bulb.classList.add("light-bulb");
    parent.append(bulb);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const blastRocket = new Audio("rocketSound.mp3");
  const bulbs = document.querySelector("#bulbs");
  createBulbs(bulbs);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext("2d");

  let particleCount = 300;
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  let particles = [];

  document.addEventListener("click", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    console.log("mmm", mouse);
    blastRocket.play();
    const angleInc = (Math.PI * 2) / particleCount;
    for (let i = 0; i < particleCount; i++) {
      let radius = 2;

      let xVelocity = Math.cos(angleInc * i) * Math.random();
      let yVelocity = Math.sin(angleInc * i) * Math.random();
      let color = `hsl(${Math.random() * 360},50%,50%)`;
      particles.push(
        new Particle(mouse.x, mouse.y, c, radius, color, {
          x: xVelocity * 10,
          y: yVelocity * 10,
        })
      );
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
      if (particle.opacity > 0) {
        particle.update();
      } else {
        particles.splice(i, 1);
      }
    });
  }

  animate();
});

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
