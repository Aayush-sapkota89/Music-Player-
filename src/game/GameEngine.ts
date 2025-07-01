import { Bird } from './entities/Bird';
import { Pig } from './entities/Pig';
import { Block } from './entities/Block';
import { Slingshot } from './entities/Slingshot';
import { PhysicsEngine } from './PhysicsEngine';
import { Level } from './Level';

interface GameCallbacks {
  onScoreUpdate: (score: number) => void;
  onBirdsUpdate: (birds: number) => void;
  onGameStateChange: (state: string) => void;
  onLevelChange: (level: number) => void;
}

export default class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private callbacks: GameCallbacks;
  private animationId: number | null = null;
  private isRunning = false;
  
  private birds: Bird[] = [];
  private pigs: Pig[] = [];
  private blocks: Block[] = [];
  private slingshot: Slingshot;
  private physics: PhysicsEngine;
  private level: Level;
  
  private currentBird: Bird | null = null;
  private isDragging = false;
  private dragStart = { x: 0, y: 0 };
  private score = 0;
  private currentLevel = 1;
  private birdsRemaining = 3;

  constructor(canvas: HTMLCanvasElement, callbacks: GameCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.callbacks = callbacks;
    
    this.physics = new PhysicsEngine();
    this.level = new Level();
    this.slingshot = new Slingshot(150, 600);
    
    this.setupEventListeners();
    this.loadLevel(1);
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // Touch events for mobile
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  private getMousePos(e: MouseEvent | TouchEvent): { x: number, y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    
    let clientX, clientY;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  private handleMouseDown(e: MouseEvent) {
    const pos = this.getMousePos(e);
    this.startDrag(pos);
  }

  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const pos = this.getMousePos(e);
    this.startDrag(pos);
  }

  private startDrag(pos: { x: number, y: number }) {
    if (this.currentBird && !this.currentBird.isLaunched) {
      const distance = Math.sqrt(
        Math.pow(pos.x - this.currentBird.x, 2) + 
        Math.pow(pos.y - this.currentBird.y, 2)
      );
      
      if (distance < 30) {
        this.isDragging = true;
        this.dragStart = pos;
      }
    }
  }

  private handleMouseMove(e: MouseEvent) {
    const pos = this.getMousePos(e);
    this.updateDrag(pos);
  }

  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    const pos = this.getMousePos(e);
    this.updateDrag(pos);
  }

  private updateDrag(pos: { x: number, y: number }) {
    if (this.isDragging && this.currentBird) {
      const maxDistance = 100;
      const dx = this.slingshot.x - pos.x;
      const dy = this.slingshot.y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx);
        this.currentBird.x = this.slingshot.x - Math.cos(angle) * maxDistance;
        this.currentBird.y = this.slingshot.y - Math.sin(angle) * maxDistance;
      } else {
        this.currentBird.x = pos.x;
        this.currentBird.y = pos.y;
      }
    }
  }

  private handleMouseUp(e: MouseEvent) {
    this.endDrag();
  }

  private handleTouchEnd(e: TouchEvent) {
    e.preventDefault();
    this.endDrag();
  }

  private endDrag() {
    if (this.isDragging && this.currentBird) {
      const dx = this.slingshot.x - this.currentBird.x;
      const dy = this.slingshot.y - this.currentBird.y;
      const power = Math.sqrt(dx * dx + dy * dy) * 0.15;
      
      this.currentBird.launch(dx * 0.15, dy * 0.15);
      this.currentBird = null;
      this.birdsRemaining--;
      this.callbacks.onBirdsUpdate(this.birdsRemaining);
      
      setTimeout(() => {
        this.prepareNextBird();
      }, 3000);
    }
    this.isDragging = false;
  }

  private loadLevel(levelNumber: number) {
    const levelData = this.level.getLevel(levelNumber);
    
    this.birds = [];
    this.pigs = [];
    this.blocks = [];
    
    // Create birds
    for (let i = 0; i < levelData.birds; i++) {
      this.birds.push(new Bird(50 + i * 40, 650, 'red'));
    }
    
    // Create pigs
    levelData.pigs.forEach(pigData => {
      this.pigs.push(new Pig(pigData.x, pigData.y));
    });
    
    // Create blocks
    levelData.blocks.forEach(blockData => {
      this.blocks.push(new Block(blockData.x, blockData.y, blockData.width, blockData.height, blockData.type));
    });
    
    this.birdsRemaining = levelData.birds;
    this.callbacks.onBirdsUpdate(this.birdsRemaining);
    this.prepareNextBird();
  }

  private prepareNextBird() {
    if (this.birds.length > 0 && this.birdsRemaining > 0) {
      this.currentBird = this.birds[0];
      this.currentBird.x = this.slingshot.x;
      this.currentBird.y = this.slingshot.y;
      this.currentBird.isLaunched = false;
    } else if (this.pigs.length > 0) {
      this.callbacks.onGameStateChange('gameOver');
    }
  }

  private checkCollisions() {
    // Bird vs Pig collisions
    this.birds.forEach(bird => {
      if (bird.isLaunched) {
        this.pigs.forEach((pig, pigIndex) => {
          if (this.physics.checkCollision(bird, pig)) {
            this.pigs.splice(pigIndex, 1);
            this.score += 100;
            this.callbacks.onScoreUpdate(this.score);
          }
        });
        
        // Bird vs Block collisions
        this.blocks.forEach((block, blockIndex) => {
          if (this.physics.checkCollision(bird, block)) {
            this.blocks.splice(blockIndex, 1);
            this.score += 50;
            this.callbacks.onScoreUpdate(this.score);
          }
        });
      }
    });
    
    // Block vs Pig collisions (falling blocks)
    this.blocks.forEach(block => {
      this.pigs.forEach((pig, pigIndex) => {
        if (this.physics.checkCollision(block, pig)) {
          this.pigs.splice(pigIndex, 1);
          this.score += 150;
          this.callbacks.onScoreUpdate(this.score);
        }
      });
    });
  }

  private checkWinCondition() {
    if (this.pigs.length === 0) {
      this.score += this.birdsRemaining * 100; // Bonus for remaining birds
      this.callbacks.onScoreUpdate(this.score);
      this.callbacks.onGameStateChange('levelComplete');
    }
  }

  private update() {
    if (!this.isRunning) return;
    
    // Update physics for all entities
    this.birds.forEach(bird => {
      if (bird.isLaunched) {
        this.physics.updateBird(bird);
      }
    });
    
    this.blocks.forEach(block => {
      this.physics.updateBlock(block);
    });
    
    this.checkCollisions();
    this.checkWinCondition();
  }

  private render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.drawBackground();
    
    // Draw ground
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(0, 700, this.canvas.width, 100);
    
    // Draw slingshot
    this.slingshot.draw(this.ctx);
    
    // Draw trajectory line when dragging
    if (this.isDragging && this.currentBird) {
      this.drawTrajectory();
    }
    
    // Draw entities
    this.blocks.forEach(block => block.draw(this.ctx));
    this.pigs.forEach(pig => pig.draw(this.ctx));
    this.birds.forEach(bird => bird.draw(this.ctx));
  }

  private drawBackground() {
    // Sky gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Clouds
    this.drawClouds();
  }

  private drawClouds() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    // Cloud 1
    this.drawCloud(200, 100, 60);
    this.drawCloud(500, 150, 80);
    this.drawCloud(800, 80, 70);
    this.drawCloud(1000, 120, 90);
  }

  private drawCloud(x: number, y: number, size: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.3, y, size * 0.7, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.6, y, size * 0.5, 0, Math.PI * 2);
    this.ctx.arc(x - size * 0.3, y, size * 0.6, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawTrajectory() {
    if (!this.currentBird) return;
    
    const dx = this.slingshot.x - this.currentBird.x;
    const dy = this.slingshot.y - this.currentBird.y;
    
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    
    let x = this.currentBird.x;
    let y = this.currentBird.y;
    let vx = dx * 0.15;
    let vy = dy * 0.15;
    
    for (let i = 0; i < 30; i++) {
      this.ctx.lineTo(x, y);
      x += vx * 2;
      y += vy * 2;
      vy += 0.5; // gravity
      
      if (y > 700) break; // hit ground
    }
    
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  private gameLoop() {
    this.update();
    this.render();
    
    if (this.isRunning) {
      this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
  }

  public start() {
    this.isRunning = true;
    this.gameLoop();
  }

  public pause() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  public resume() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameLoop();
    }
  }

  public reset() {
    this.pause();
    this.score = 0;
    this.currentLevel = 1;
    this.callbacks.onScoreUpdate(this.score);
    this.callbacks.onLevelChange(this.currentLevel);
    this.loadLevel(this.currentLevel);
  }

  public nextLevel() {
    this.currentLevel++;
    this.callbacks.onLevelChange(this.currentLevel);
    this.loadLevel(this.currentLevel);
  }

  public destroy() {
    this.pause();
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);
    this.canvas.removeEventListener('touchend', this.handleTouchEnd);
  }
}