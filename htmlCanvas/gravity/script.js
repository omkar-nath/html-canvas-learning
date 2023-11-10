document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var c = canvas.getContext("2d");
  let gravity = 1;
  let friction = 0.6;
  class Ball {
    constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
      c.closePath();
    }

    update() {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity;
      }
      if (this.x + this.radius + this.dx > canvas.width) {
        this.dx = -this.dx;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let mouse = {
    x: null,
    y: null,
  };
  let colors = ["#9FBB73", "#F3B664", "F3B664", "#22092C", "#940B92"];
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  let ball;
  let balls = [];
  function init() {
    balls = [];
    for (let i = 0; i < 500; i++) {
      let radius = randomInteger(10, 40);
      let color = colors[Math.floor(Math.random() * colors.length)];
      let x = Math.random() * canvas.width - radius;
      let y = Math.random() * canvas.height - radius;
      let dx = (Math.random() - 0.5) * 2;
      let dy = (Math.random() - 0.5) * 2;
      balls.push(new Ball(x, y, dx, dy, radius, color));
    }
  }

  window.addEventListener("click", () => {
    init();
  });
  window.addEventListener("resize", () => {
    canvas.width = innerHeight;
    canvas.height = innerHeight;

    init();
  });
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
    }
  }

  init();
  animate();
});
