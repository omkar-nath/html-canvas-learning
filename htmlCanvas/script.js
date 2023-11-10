document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");
  //   c.fillStyle = "rgba(255,0,0,0.5)";
  //   c.fillRect(100, 100, 100, 100);

  //   // Lines

  //   c.beginPath();
  //   c.moveTo(50, 300);
  //   c.lineTo(300, 100);
  //   c.lineTo(400, 300);
  //   c.lineTo(67, 90);
  //   c.strokeStyle = "red";
  //   c.stroke();

  //arcs

  //   for (let i = 0; i < 1000; i++) {
  //     let x = Math.random() * window.innerWidth;
  //     let y = Math.random() * window.innerHeight;
  //     var r = Math.floor(Math.random() * 256);
  //     var g = Math.floor(Math.random() * 256);
  //     var b = Math.floor(Math.random() * 256);
  //     let color = "rgb(" + r + "," + g + "," + b + ")";
  //     c.beginPath();
  //     c.arc(x, y, 30, 0, Math.PI * 2, false);
  //     c.fillStyle = color;
  //     c.stroke();
  //   }
  let maxRadius = 40;
  let minRadius = 2;
  let colorArray = ["#872341", "#BE3144", "#F05941", "#22092C", "#557C55"];
  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = radius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = "blue";
      c.fillStyle = this.color;
      c.fill();
    }
    update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      //interactivity

      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    }
  }

  let mouse = {
    x: undefined,
    y: undefined,
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let circleArray = [];

  function init() {
    for (let i = 0; i < 100; i++) {
      let radius = Math.random() * 4 + 1;
      let x = Math.random() * (window.innerWidth - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 2;
      let dy = (Math.random() - 0.5) * 2;
      let y = Math.random() * (window.innerHeight - radius * 2) + radius;

      circleArray.push(new Circle(x, y, dx, dy, radius));
    }
  }
  init();
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  animate();
});
