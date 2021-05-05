import { SpriteDefinition } from '../../sprite/sprite-sheet';

export const SPRITE_BLOCK = {
  width: 16,
  height: 8,
};

type BLOCK_WHITE = 'W';
type BLOCK_ORANGE = 'O';
type BLOCK_TURQUOISE = 'Q';
type BLOCK_GREEN = 'G';
type BLOCK_RED = 'R';
type BLOCK_BLUE = 'B';
type BLOCK_PINK = 'P';
type BLOCK_YELLOW = 'Y';
type BLOCK_HARD_GREY = 'HY-0';
type BLOCK_HARD_GOLD = 'HG-0';

export type BLOCK =
  | BLOCK_WHITE
  | BLOCK_ORANGE
  | BLOCK_TURQUOISE
  | BLOCK_GREEN
  | BLOCK_RED
  | BLOCK_BLUE
  | BLOCK_PINK
  | BLOCK_YELLOW
  | BLOCK_HARD_GREY
  | BLOCK_HARD_GOLD;

const SPRITE_BLOCK_HARD_GREY = {
  ...SPRITE_BLOCK,
  sequenceLength: 6,
  prefix: 'HY',
};

const SPRITE_BLOCK_HARD_GOLD = {
  ...SPRITE_BLOCK_HARD_GREY,
  prefix: 'HG',
};

const blockHardGreySprites = Array.from({
  length: SPRITE_BLOCK_HARD_GREY.sequenceLength,
}).map<SpriteDefinition>((_, frame) => ({
  name: `${SPRITE_BLOCK_HARD_GREY.prefix}-${frame}`,
  dimensions: [
    frame * SPRITE_BLOCK_HARD_GREY.width,
    16,
    SPRITE_BLOCK_HARD_GREY.width,
    SPRITE_BLOCK_HARD_GREY.height,
  ],
}));

const blockHardGoldSprites = Array.from({
  length: SPRITE_BLOCK_HARD_GOLD.sequenceLength,
}).map<SpriteDefinition>((_, frame) => ({
  name: `${SPRITE_BLOCK_HARD_GOLD.prefix}-${frame}`,
  dimensions: [
    frame * SPRITE_BLOCK_HARD_GOLD.width,
    24,
    SPRITE_BLOCK_HARD_GOLD.width,
    SPRITE_BLOCK_HARD_GOLD.height,
  ],
}));

const blockAnimatableSprites: SpriteDefinition[] = [
  ...blockHardGreySprites,
  ...blockHardGoldSprites,
];

export const blockSpriteSheetDefinitions: SpriteDefinition[] = [
  {
    name: 'W',
    dimensions: [0, 0, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'O',
    dimensions: [16, 0, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'Q',
    dimensions: [32, 0, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'G',
    dimensions: [48, 0, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'R',
    dimensions: [0, 8, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'B',
    dimensions: [16, 8, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'P',
    dimensions: [32, 8, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  {
    name: 'Y',
    dimensions: [48, 8, SPRITE_BLOCK.width, SPRITE_BLOCK.height],
  },
  ...blockAnimatableSprites,
];
