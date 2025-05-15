const canvas = document.getElementById("bokehCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
canvas.width = innerWidth;
canvas.height = innerHeight;

// Resize canvas on window change
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initParticles();
});

// Update mouse position
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Generate random pastel/neon-like color
function randomColor() {
  const colors = ["#4e54c8", "#8f94fb", "#ffffff", "#ff9a9e", "#fbc2eb"];
  return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
  constructor() {
    this.radius = Math.random() * 8 + 8;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 1 + 0.5;
    this.color = randomColor();
  }

  draw() {
    ctx.beginPath();

    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = Math.max(0.4, 1 - dist / 200);

    ctx.arc(this.x, this.y, this.radius * scale, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity * scale;

    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();

    ctx.globalAlpha = 1; // Reset alpha
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // Wrap around bottom or sides
    if (this.y > canvas.height) this.y = -this.radius;
    if (this.x > canvas.width) this.x = -this.radius;
    if (this.x < -this.radius) this.x = canvas.width + this.radius;

    this.draw();
  }
}

function initParticles(num = 100) {
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

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Stop observing after it's visible
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the element is visible
  });

  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
  });
