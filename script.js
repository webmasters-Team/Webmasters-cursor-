const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const colors = ["#FF3F8E", "#04C2C9", "#2E55C1", "#F9D423"];

let particles = [];
let mousePos = { x: 0, y: 0 };

class Particle {
	constructor(x, y, size, color, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.speedX = speedX;
		this.speedY = speedY;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.size *= 0.98; // Shrink over time
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function createExplosion(x, y) {
	const particleCount = 50;
	for (let i = 0; i < particleCount; i++) {
		const size = Math.random() * 5 + 2;
		const color = colors[Math.floor(Math.random() * colors.length)];
		const speedX = (Math.random() * 2 - 1) * 2;
		const speedY = (Math.random() * 2 - 1) * 2;
		particles.push(new Particle(x, y, size, color, speedX, speedY));
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles = particles.filter((particle) => {
		particle.update();
		particle.draw();
		return particle.size > 0.5;
	});

	requestAnimationFrame(animate);
}

function handleMouseMove(event) {
	mousePos.x = event.clientX;
	mousePos.y = event.clientY;
}

// Initialize
resizeCanvas();
animate();

// Event listeners
window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousemove", handleMouseMove);

// Create explosions at intervals
setInterval(() => {
	createExplosion(mousePos.x, mousePos.y);
}, 50);
