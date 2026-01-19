const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// Constantes físicas (escaladas)
const G = 1.0;
const M = 1000;

// Estado del sistema
let running = false;

// Posición y velocidad (vectores 2D)
let r, v;

// Paso temporal
const dt = 0.05;

// Inicialización
function init() {
    r = { x: 200, y: 0 };
    v = { x: 0, y: 2.5 };
}

init();

// Fuerza gravitacional central
function acceleration(pos) {
    const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    const factor = -G * M / (dist * dist * dist);
    return {
        x: factor * pos.x,
        y: factor * pos.y
    };
}

// Integración (Euler explícito)
function update() {
    const a = acceleration(r);
    v.x += a.x * dt;
    v.y += a.y * dt;
    r.x += v.x * dt;
    r.y += v.y * dt;
}

// Dibujado
function draw() {
    ctx.clearRect(0, 0, W, H);

    // Centro (estrella)
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(W/2, H/2, 8, 0, 2*Math.PI);
    ctx.fill();

    // Planeta
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(W/2 + r.x, H/2 + r.y, 4, 0, 2*Math.PI);
    ctx.fill();
}

// Bucle principal
function loop() {
    if (running) {
        update();
        draw();
    }
    requestAnimationFrame(loop);
}

loop();

// Botones
document.getElementById("start").onclick = () => running = true;
document.getElementById("pause").onclick = () => running = false;
document.getElementById("reset").onclick = () => {
    running = false;
    init();
    draw();
};
