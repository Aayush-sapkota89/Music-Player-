export class Block {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public type: string;
  public vx: number = 0;
  public vy: number = 0;
  public isFalling: boolean = false;

  constructor(x: number, y: number, width: number, height: number, type: string = 'wood') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    switch (this.type) {
      case 'wood':
        this.drawWoodBlock(ctx);
        break;
      case 'stone':
        this.drawStoneBlock(ctx);
        break;
      case 'ice':
        this.drawIceBlock(ctx);
        break;
      default:
        this.drawWoodBlock(ctx);
    }
  }

  private drawWoodBlock(ctx: CanvasRenderingContext2D) {
    // Wood texture
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Wood grain lines
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 1;
    for (let i = 0; i < this.height; i += 8) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + i);
      ctx.lineTo(this.x + this.width, this.y + i);
      ctx.stroke();
    }
    
    // Border
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  private drawStoneBlock(ctx: CanvasRenderingContext2D) {
    // Stone texture
    ctx.fillStyle = '#696969';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Stone pattern
    ctx.fillStyle = '#808080';
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
    
    // Border
    ctx.strokeStyle = '#2F4F4F';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  private drawIceBlock(ctx: CanvasRenderingContext2D) {
    // Ice texture
    ctx.fillStyle = '#B0E0E6';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Ice shine
    ctx.fillStyle = '#E0FFFF';
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, 4);
    
    // Border
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}