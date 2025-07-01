export class Bird {
  public x: number;
  public y: number;
  public vx: number = 0;
  public vy: number = 0;
  public radius: number = 15;
  public color: string;
  public isLaunched: boolean = false;
  public type: string;

  constructor(x: number, y: number, type: string = 'red') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = this.getColorByType(type);
  }

  private getColorByType(type: string): string {
    switch (type) {
      case 'red': return '#FF4444';
      case 'blue': return '#4444FF';
      case 'yellow': return '#FFFF44';
      case 'black': return '#444444';
      default: return '#FF4444';
    }
  }

  public launch(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
    this.isLaunched = true;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Bird body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird details
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y - 3, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Beak
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(this.x + 8, this.y);
    ctx.lineTo(this.x + 15, this.y - 2);
    ctx.lineTo(this.x + 15, this.y + 2);
    ctx.closePath();
    ctx.fill();
    
    // Angry eyebrows
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - 10, this.y - 8);
    ctx.lineTo(this.x - 2, this.y - 5);
    ctx.stroke();
  }
}