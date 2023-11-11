document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let c = canvas.getContext("2d");
  let mouse = {
    x: null,
    y: null,
  };

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  class Particle {
    constructor(x, y, radius, color) {
      this.originX = x;
      this.originY = y;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.lastMouse = { x: x, y };
      this.radians = Math.random() * Math.PI * 2;
      this.velocity = 0.05;
      this.distanceFromCenter = randomNumInRange(50, 200);
    }
    update() {
      const lastPoint = {
        x: this.x,
        y: this.y,
      };
      this.radians += this.velocity;
      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.02;
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.02;
      this.x =
        this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
      this.y =
        this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
      this.draw(lastPoint);
    }
    draw(lastPoint) {
      c.beginPath();
      c.strokeStyle = this.color;
      c.lineWidth = this.radius;
      c.moveTo(lastPoint.x, lastPoint.y);
      c.lineTo(this.x, this.y);
      c.stroke();

      c.closePath();
    }
  }
  let colorArray = ["#872341", "#BE3144", "#F05941", "#22092C", "#557C55"];
  let objects = [];
  function init() {
    for (let i = 0; i < 100; i++) {
      const radius = randomNumInRange(2, 10);
      const color =
        colorArray[Math.floor(randomNumInRange(0, colorArray.length - 1))];
      objects.push(
        new Particle(canvas.width / 2, canvas.height / 2, radius, color)
      );
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(255,255,255,0.05)`;
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 100; i++) {
      objects[i].update();
    }
  }

  init();
  animate();
});
function randomNumInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
