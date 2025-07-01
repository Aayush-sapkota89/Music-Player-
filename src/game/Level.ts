interface LevelData {
  birds: number;
  pigs: Array<{ x: number; y: number }>;
  blocks: Array<{ x: number; y: number; width: number; height: number; type: string }>;
}

export class Level {
  private levels: LevelData[] = [
    {
      birds: 3,
      pigs: [
        { x: 800, y: 650 },
        { x: 900, y: 650 }
      ],
      blocks: [
        { x: 750, y: 650, width: 20, height: 80, type: 'wood' },
        { x: 770, y: 630, width: 60, height: 20, type: 'wood' },
        { x: 830, y: 650, width: 20, height: 80, type: 'wood' },
        { x: 850, y: 630, width: 60, height: 20, type: 'wood' },
        { x: 910, y: 650, width: 20, height: 80, type: 'wood' }
      ]
    },
    {
      birds: 4,
      pigs: [
        { x: 700, y: 650 },
        { x: 800, y: 600 },
        { x: 900, y: 650 }
      ],
      blocks: [
        { x: 680, y: 650, width: 20, height: 80, type: 'wood' },
        { x: 700, y: 630, width: 40, height: 20, type: 'wood' },
        { x: 720, y: 650, width: 20, height: 80, type: 'wood' },
        { x: 780, y: 620, width: 20, height: 80, type: 'stone' },
        { x: 800, y: 600, width: 40, height: 20, type: 'stone' },
        { x: 820, y: 620, width: 20, height: 80, type: 'stone' },
        { x: 880, y: 650, width: 20, height: 80, type: 'ice' },
        { x: 900, y: 630, width: 40, height: 20, type: 'ice' },
        { x: 920, y: 650, width: 20, height: 80, type: 'ice' }
      ]
    },
    {
      birds: 5,
      pigs: [
        { x: 600, y: 650 },
        { x: 750, y: 580 },
        { x: 850, y: 520 },
        { x: 950, y: 650 }
      ],
      blocks: [
        // Tower 1
        { x: 580, y: 650, width: 20, height: 80, type: 'wood' },
        { x: 600, y: 630, width: 40, height: 20, type: 'wood' },
        { x: 620, y: 650, width: 20, height: 80, type: 'wood' },
        
        // Tower 2
        { x: 730, y: 600, width: 20, height: 80, type: 'stone' },
        { x: 750, y: 580, width: 40, height: 20, type: 'stone' },
        { x: 770, y: 600, width: 20, height: 80, type: 'stone' },
        { x: 740, y: 560, width: 60, height: 20, type: 'stone' },
        
        // Tower 3
        { x: 830, y: 540, width: 20, height: 80, type: 'ice' },
        { x: 850, y: 520, width: 40, height: 20, type: 'ice' },
        { x: 870, y: 540, width: 20, height: 80, type: 'ice' },
        { x: 840, y: 500, width: 60, height: 20, type: 'ice' },
        { x: 845, y: 480, width: 50, height: 20, type: 'ice' },
        
        // Tower 4
        { x: 930, y: 650, width: 20, height: 80, type: 'wood' },
        { x: 950, y: 630, width: 40, height: 20, type: 'wood' },
        { x: 970, y: 650, width: 20, height: 80, type: 'wood' }
      ]
    }
  ];

  public getLevel(levelNumber: number): LevelData {
    const index = (levelNumber - 1) % this.levels.length;
    return this.levels[index];
  }

  public getTotalLevels(): number {
    return this.levels.length;
  }
}