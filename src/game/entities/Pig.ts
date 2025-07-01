export class Pig {
  public x: number;
  public y: number;
  public radius: number = 20;
  public health: number = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Pig body
    ctx.fillStyle = '#90EE90';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Pig outline
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x - 6, this.y - 5, 4, 0, Math.PI * 2);
    ctx.arc(this.x + 6, this.y - 5, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.x - 6, this.y - 5, 2, 0, Math.PI * 2);
    ctx.arc(this.x + 6, this.y - 5, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Snout
    ctx.fillStyle = '#98FB98';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + 3, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Nostrils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.x - 3, this.y + 3, 1, 0, Math.PI * 2);
    ctx.arc(this.x + 3, this.y + 3, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears
    ctx.fillStyle = '#90EE90';
    ctx.beginPath();
    ctx.ellipse(this.x - 15, this.y - 10, 5, 8, -0.5, 0, Math.PI * 2);
    ctx.ellipse(this.x + 15, this.y - 10, 5, 8, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}