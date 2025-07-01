export class PhysicsEngine {
  private gravity = 0.5;
  private friction = 0.98;
  private groundY = 700;

  public updateBird(bird: any) {
    if (!bird.isLaunched) return;

    // Apply gravity
    bird.vy += this.gravity;
    
    // Apply friction
    bird.vx *= this.friction;
    bird.vy *= this.friction;
    
    // Update position
    bird.x += bird.vx;
    bird.y += bird.vy;
    
    // Ground collision
    if (bird.y > this.groundY - bird.radius) {
      bird.y = this.groundY - bird.radius;
      bird.vy *= -0.3; // Bounce with energy loss
      bird.vx *= 0.8;
      
      // Stop if moving too slowly
      if (Math.abs(bird.vy) < 1 && Math.abs(bird.vx) < 1) {
        bird.vy = 0;
        bird.vx = 0;
      }
    }
    
    // Side boundaries
    if (bird.x < bird.radius) {
      bird.x = bird.radius;
      bird.vx *= -0.5;
    }
    if (bird.x > 1200 - bird.radius) {
      bird.x = 1200 - bird.radius;
      bird.vx *= -0.5;
    }
  }

  public updateBlock(block: any) {
    if (!block.isFalling) return;

    // Apply gravity
    block.vy += this.gravity;
    
    // Update position
    block.x += block.vx;
    block.y += block.vy;
    
    // Ground collision
    if (block.y + block.height > this.groundY) {
      block.y = this.groundY - block.height;
      block.vy = 0;
      block.vx *= 0.5;
      block.isFalling = false;
    }
  }

  public checkCollision(obj1: any, obj2: any): boolean {
    // Circle vs Circle collision (for birds and pigs)
    if (obj1.radius && obj2.radius) {
      const dx = obj1.x - obj2.x;
      const dy = obj1.y - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < (obj1.radius + obj2.radius);
    }
    
    // Circle vs Rectangle collision (bird vs block)
    if (obj1.radius && obj2.width) {
      return this.circleRectCollision(obj1, obj2);
    }
    
    // Rectangle vs Circle collision (block vs pig)
    if (obj1.width && obj2.radius) {
      return this.circleRectCollision(obj2, obj1);
    }
    
    // Rectangle vs Rectangle collision
    if (obj1.width && obj2.width) {
      return this.rectRectCollision(obj1, obj2);
    }
    
    return false;
  }

  private circleRectCollision(circle: any, rect: any): boolean {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    
    return (dx * dx + dy * dy) < (circle.radius * circle.radius);
  }

  private rectRectCollision(rect1: any, rect2: any): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
}