import { createPositionable } from '../../positionable';
import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../../sprite/sprite-renderable';
import { System } from '../../system/system';
import { SPRITE_FIELD_OFFSET_BOUND } from '../field';
import { BLOCK, SPRITE_BLOCK } from './block';

// prettier-ignore
const BLOCKS: BLOCK[][] = [
  ['HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0', 'HY-0'],
  ['R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   , 'R'   ],
  ['B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   , 'B'   ],
  ['O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   , 'O'   ],
  ['P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   , 'P'   ],
  ['G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   , 'G'   ]
];

const OFFSET_WIDTH = SPRITE_FIELD_OFFSET_BOUND;
const OFFSET_HEIGHT = SPRITE_FIELD_OFFSET_BOUND + 4 * SPRITE_BLOCK.height;

const createBlockBinder = (blocks: BLOCK[][]) => (
  spriteRenderingSystem: System<SpriteRenderable>
) => {
  return blocks.map((rowBlocks, rowIdx) => {
    return rowBlocks.map((block, columnIdx) => {
      const positionable = createPositionable(
        columnIdx * SPRITE_BLOCK.width + OFFSET_WIDTH,
        rowIdx * SPRITE_BLOCK.height + OFFSET_HEIGHT,
        SPRITE_BLOCK.width,
        SPRITE_BLOCK.height
      );

      const renderable = createSpriteRenderable(block, positionable);

      spriteRenderingSystem.register(renderable);

      return positionable;
    });
  });
};

export default createBlockBinder(BLOCKS);
