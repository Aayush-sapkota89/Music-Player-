export class Slingshot {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Slingshot base
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x - 10, this.y, 20, 50);
    
    // Slingshot arms
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    // Left arm
    ctx.beginPath();
    ctx.moveTo(this.x - 8, this.y);
    ctx.lineTo(this.x - 25, this.y - 40);
    ctx.stroke();
    
    // Right arm
    ctx.beginPath();
    ctx.moveTo(this.x + 8, this.y);
    ctx.lineTo(this.x + 25, this.y - 40);
    ctx.stroke();
    
    // Elastic band
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x - 25, this.y - 40);
    ctx.lineTo(this.x + 25, this.y - 40);
    ctx.stroke();
  }
}