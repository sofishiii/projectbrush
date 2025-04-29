import { Canvas } from './Canvas.js';
import { CircularBrush, SquareBrush } from './Brush.js';

class PaintApp {
  constructor() {
    this.canvas = new Canvas('drawingCanvas');
    this.circularBrush = new CircularBrush();
    this.squareBrush = new SquareBrush();
    this.activeBrush = this.circularBrush;
    this.circularBrushBtn = document.getElementById('circularBrush');
    this.squareBrushBtn = document.getElementById('squareBrush');
    this.colorInput = document.getElementById('colorInput');
    this.sizeInput = document.getElementById('sizeInput');
    this.sizeValue = document.getElementById('sizeValue');
    this.clearCanvasBtn = document.getElementById('clearCanvas');
    this.setupEventListeners();
    this.updateBrushProperties();
  }

  setupEventListeners() {
    this.circularBrushBtn.addEventListener('click', () => this.changeBrush('circular'));
    this.squareBrushBtn.addEventListener('click', () => this.changeBrush('square'));
    this.colorInput.addEventListener('input', () => this.updateBrushProperties());
    this.sizeInput.addEventListener('input', () => {
      this.updateBrushProperties();
      this.sizeValue.textContent = `${this.sizeInput.value}px`;
    });
    this.clearCanvasBtn.addEventListener('click', () => this.canvas.clear());
    this.canvas.onStartDrawing(this.startDrawing.bind(this));
    this.canvas.onDraw(this.draw.bind(this));
    this.canvas.onStopDrawing(this.stopDrawing.bind(this));
  }

  changeBrush(brushType) {
    this.circularBrushBtn.classList.toggle('active', brushType === 'circular');
    this.squareBrushBtn.classList.toggle('active', brushType === 'square');
    this.activeBrush = brushType === 'circular' ? this.circularBrush : this.squareBrush;
    this.updateBrushProperties();
  }

  updateBrushProperties() {
    const color = this.colorInput.value;
    const size = parseInt(this.sizeInput.value);
    this.activeBrush.setColor(color);
    this.activeBrush.setSize(size);
  }

  startDrawing(x, y) {
    this.activeBrush.startDrawing(this.canvas.getContext(), x, y);
  }

  draw(x, y) {
    this.activeBrush.draw(this.canvas.getContext(), x, y);
  }

  stopDrawing() {
    this.activeBrush.stopDrawing(this.canvas.getContext());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PaintApp();
});