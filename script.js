// interactive particles animation

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

//  mouse position
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// random pastel/neon-like color
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

    ctx.globalAlpha = 1; 
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

//  section1
 let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }


// section2

let slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

function showSlides2(n) {
  const slides = document.getElementsByClassName("mySlides2");
  if (n > slides.length) slideIndex2 = 1;
  if (n < 1) slideIndex2 = slides.length;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex2 - 1].style.display = "block";
}


// animation when i school on section 

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.2 
  });

  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
  });


  // wiki anime

let slideIndex3 = 1;
showSlides3(slideIndex3);

function plusSlides3(n) {
  showSlides3(slideIndex3 += n);
}

function showSlides3(n) {
  const slides = document.getElementsByClassName("mySlides3");
  if (n > slides.length) slideIndex3 = 1;
  if (n < 1) slideIndex3 = slides.length;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex3 - 1].style.display = "block";
}
