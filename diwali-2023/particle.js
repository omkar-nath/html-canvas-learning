const gravity = 0.05;
const friction = 0.99;
class Particle {
  constructor(x, y, c, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.opacity = 1;
  }

  draw() {
    this.c.save();
    this.c.globalAlpha = this.opacity;
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
    this.c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.003;
  }
}

export default Particle;
