export class Canvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.startDrawingCallback = null;
    this.drawCallback = null;
    this.stopDrawingCallback = null;
    this.resizeCanvas();
    this.setupEventListeners();
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
    this.canvas.addEventListener('mouseleave', () => this.handleMouseUp());
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.addEventListener('touchend', () => this.handleTouchEnd());
  }

  getCoordinates(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  getTouchCoordinates(event) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = event.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  handleMouseDown(event) {
    const { x, y } = this.getCoordinates(event);
    this.isDrawing = true;
    if (this.startDrawingCallback) {
      this.startDrawingCallback(x, y);
    }
  }

  handleMouseMove(event) {
    if (!this.isDrawing) return;
    const { x, y } = this.getCoordinates(event);
    if (this.drawCallback) {
      this.drawCallback(x, y);
    }
  }

  handleMouseUp() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    if (this.stopDrawingCallback) {
      this.stopDrawingCallback();
    }
  }

  handleTouchStart(event) {
    event.preventDefault();
    const { x, y } = this.getTouchCoordinates(event);
    this.isDrawing = true;
    if (this.startDrawingCallback) {
      this.startDrawingCallback(x, y);
    }
  }

  handleTouchMove(event) {
    event.preventDefault();
    if (!this.isDrawing) return;
    const { x, y } = this.getTouchCoordinates(event);
    if (this.drawCallback) {
      this.drawCallback(x, y);
    }
  }

  handleTouchEnd() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    if (this.stopDrawingCallback) {
      this.stopDrawingCallback();
    }
  }

  onStartDrawing(callback) {
    this.startDrawingCallback = callback;
  }

  onDraw(callback) {
    this.drawCallback = callback;
  }

  onStopDrawing(callback) {
    this.stopDrawingCallback = callback;
  }

  getContext() {
    return this.ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}