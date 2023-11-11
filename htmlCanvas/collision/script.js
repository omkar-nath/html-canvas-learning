document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let c = canvas.getContext("2d");
  let mouse = {
    x: innerWidth,
    y: innerHeight,
  };

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
  class Circle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.velocity = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
      };
      this.radius = radius;
      this.color = color;
    }

    update(circles) {
      for (let i = 0; i < circles.length; i++) {
        if (this === circles[i]) continue;
        let dis =
          getDistance(this.x, this.y, circles[i].x, circles[i].y) -
          this.radius * 2;
        if (dis < 0) console.log("Hence collided");
      }

      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.velocity.y = -this.velocity.y;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.draw();
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    }
  }
  const colors = ["#9FBB73", "#F3B664", "F3B664", "#22092C", "#940B92"];
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
  let circles = [];
  function init() {
    const radius = 100;
    for (let i = 0; i < 5; i++) {
      let x = randomNumInRange(radius, canvas.width - radius);
      let y = randomNumInRange(radius, canvas.height - radius);

      if (i !== 0) {
        for (let j = 0; j < circles.length; j++) {
          let dis = getDistance(x, y, circles[j].x, circles[j].y) - radius * 2;
          if (dis < 0) {
            x = randomNumInRange(radius, canvas.width - radius);
            y = randomNumInRange(radius, canvas.height - radius);

            j = -1;
          }
        }
      }

      circles.push(new Circle(x, y, radius, "blue"));
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++) {
      circles[i].update(circles);
    }
  }
  init();
  animate();
});

function randomNumInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
