
export class Brush {
  constructor() {
    this.color = '#3B82F6'; 
    this.size = 10;         
    this.isDrawing = false; 
    this.lastX = 0;         
    this.lastY = 0;        
  }
  
  setColor(color) {
    this.color = color;
  }
  
  setSize(size) {
    this.size = size;
  }
  
  setupContext(ctx) {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = this.size;
  }
  
  startDrawing(ctx, x, y) {
    this.setupContext(ctx);
    this.isDrawing = true;
    this.lastX = x;
    this.lastY = y;
    this.drawPoint(ctx, x, y);
  }
  
  drawPoint(ctx, x, y) {
    console.warn('El método drawPoint debe ser implementado por la subclase');
  }
  
  draw(ctx, x, y) {
    if (!this.isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    this.drawPoint(ctx, x, y);
    this.lastX = x;
    this.lastY = y;
  }
  
  stopDrawing(ctx) {
    this.isDrawing = false;
  }
}

export class CircularBrush extends Brush {
  constructor() {
    super();
  }
  
  drawPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class SquareBrush extends Brush {
  constructor() {
    super();
  }
  
  drawPoint(ctx, x, y) {
    const halfSize = this.size / 2;
    ctx.fillRect(x - halfSize, y - halfSize, this.size, this.size);
  }
}