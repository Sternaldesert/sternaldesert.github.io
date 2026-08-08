function toggleSidebar(isOpen) {
  const sidebar = document.querySelector("#Mobile-menu");
  const backdrop = document.querySelector("#Mobile-menu-blur");
  
  if (isOpen) {
    // Add tailwind classes to easily show and hide
    sidebar.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  } else {
    sidebar.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// Hero section bg

const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d'); 
canvas.style.filter = 'blur(3px)'; 

const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); 
const tileSize = 1.5 * rootFontSize; 
const gridColor = '#636363';
const colors = ['#DE4747', '#00ffcc', '#ffcc00', '#9900ff', '#ff6600']; 

let cols, rows; 
let lines = [];
let maxLines = 10;

if (window.innerWidth < 1024) {
  maxLines = 5;
}

function resizeCanvas() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    cols = Math.ceil(canvas.width / tileSize); 
    rows = Math.ceil(canvas.height / tileSize); 
    
    lines = [];
    for (let i = 0; i < maxLines; i++) {
        lines.push(createLine()); 
    }
} 

function drawGrid() { 
    ctx.strokeStyle = gridColor; 
    ctx.lineWidth = 0.2; 
    for (let x = 0; x <= canvas.width; x += tileSize) { 
        ctx.beginPath(); 
        ctx.moveTo(x, 0); 
        ctx.lineTo(x, canvas.height);
        ctx.stroke(); 
    } 
    for (let y = 0; y <= canvas.height; y += tileSize) { 
        ctx.beginPath(); 
        ctx.moveTo(0, y); 
        ctx.lineTo(canvas.width, y); 
        ctx.stroke(); 
    } 
} 

function createLine() {
    let totalGridLines = Math.floor(canvas.width / tileSize);
    let lineIndex = Math.floor(Math.random() * (totalGridLines - 1)) + 1;
    
    return {
        x: lineIndex * tileSize,
        headY: canvas.height,
        tailY: canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() + 1
    };
}

function animateLines() { 
  for (let i = 0; i < lines.length; i++) { 
    let line = lines[i];

    if (line.headY > 0) {
        line.headY -= line.speed;
    }

    if (line.headY <= 0) {
        line.tailY -= line.speed;
    }

    ctx.beginPath(); 
    ctx.moveTo(line.x, line.tailY);
    ctx.lineTo(line.x, line.headY);
    
    // Draw line with random color and add shadow to create blur
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 4; 
    ctx.lineJoin = 'round'; 
    ctx.lineCap = 'round'; 
    ctx.shadowBlur = 8; 
    ctx.shadowColor = line.color; 
    ctx.stroke(); 
    ctx.shadowBlur = 0; 
    
    if (line.tailY <= 0) {
        lines[i] = createLine();
    }
  }
} 

function render() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); 
    animateLines(); 
    requestAnimationFrame(render);
} 

window.addEventListener('resize', resizeCanvas); 
resizeCanvas();
render();
