const canvas = document.getElementById("bokehCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.radius = Math.random() * 10 + 10; // Bigger particle size
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.8 + 0.2; // Increase opacity range for brighter effect
    this.speed = Math.random() * 1 + 0.5; // Faster particle movement
  }

  draw() {
    ctx.beginPath();
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = Math.max(0.5, 1 - dist / 200); // Adjust the scale factor for better effect

    ctx.arc(this.x, this.y, this.radius * scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity * scale})`;
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 10; // Bigger glow effect
    ctx.fill();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -this.radius;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initParticles(num = 150) { // Increased particle count for a denser effect
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

initParticles();
animate();


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("demo");
  const captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

