import { System } from '../system/system';

import { SpriteDefinition } from '../sprite/sprite-sheet';
import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

import createAutoMoveable, { AutoMoveable } from '../movement/auto-moveable';

import createCollidable, {
  CanCollideWith,
  Collidable,
} from '../collision/collidable';

import { createPositionable, Point2D, Positionable } from '../positionable';
import createMoveable, { Moveable } from '../moveable';
import { addVectors } from '../vectors';

import {
  isOutOfBoundsX as fieldOutOfBoundsX,
  isOutOfBoundsY as fieldOutOfBoundsY,
} from './field';

import { VAUS_DEFAULT_POS, VAUS_NORMAL_SPRITE } from './vaus';

export const BALL_SPRITE = {
  width: 5,
  height: 4,
  name: 'ball',
};

export const BALL_DEFAULT_POSITION = {
  x: VAUS_DEFAULT_POS.x + (VAUS_NORMAL_SPRITE.width - BALL_SPRITE.width) / 2,
  y: VAUS_DEFAULT_POS.y - BALL_SPRITE.height,
};

export const ballSpriteSheetDefinition: SpriteDefinition = {
  name: 'ball',
  dimensions: [0, 40, BALL_SPRITE.width, BALL_SPRITE.height],
};

const changeXDirection = (direction: Point2D) => {
  direction[0] = -direction[0];
};

const changeYDirection = (direction: Point2D) => {
  direction[1] = -direction[1];
};

const crateCheckCollision = (canCollideWith: CanCollideWith[]) => (
  positionable: Positionable,
  moveable: Moveable
) => {
  const [x, y] = positionable.pos;
  const [width, height] = positionable.size;

  const checkCollisionWithVaus = (vausPositionable: Positionable) => {
    const [vausX, vausY] = vausPositionable.pos;
    const [vausWidth, _vausHeight] = vausPositionable.size;

    if (x + width > vausX && x < vausX + vausWidth && y + height === vausY) {
      changeYDirection(moveable.direction);
    }
  };

  const checkCollisionWithField = () => {
    const target = addVectors(positionable.pos, moveable.direction);

    if (fieldOutOfBoundsX(target, positionable.size)) {
      changeXDirection(moveable.direction);
    }

    if (fieldOutOfBoundsY(target, positionable.size)) {
      changeYDirection(moveable.direction);
    }
  };

  const checkCollisionWithBlocks = (blockPositionables: Positionable[]) => {
    blockPositionables.some((block) => {
      const target = addVectors(positionable.pos, moveable.direction);

      const [targetX, targetY] = target;

      const [blockX, blockY] = block.pos;
      const [blockW, blockH] = block.size;

      if (
        targetX < blockX + blockW &&
        targetX + width > blockX &&
        targetY < blockY + blockH &&
        targetY + height > blockY
      ) {
        changeYDirection(moveable.direction);
        return true;
      }

      return false;
    });
  };

  canCollideWith.forEach((collisionWith) => {
    if (collisionWith.name === 'vaus') {
      checkCollisionWithVaus(collisionWith.positionable);
    }

    if (collisionWith.name === 'field') {
      checkCollisionWithField();
    }

    if (collisionWith.name === 'blocks') {
      checkCollisionWithBlocks(collisionWith.positionable);
    }
  });
};

const createBallBinder = (
  spriteRenderingSystem: System<SpriteRenderable>,
  autoMovementSystem: System<AutoMoveable>,
  collisionSyste: System<Collidable>,
  canCollideWith: CanCollideWith[]
) => {
  const positionable = createPositionable(
    BALL_DEFAULT_POSITION.x,
    BALL_DEFAULT_POSITION.y,
    BALL_SPRITE.width,
    BALL_SPRITE.height
  );

  const renderable = createSpriteRenderable(
    BALL_SPRITE.name,
    positionable,
    true
  );

  const moveable = createMoveable(1, -1, 2, 2);
  const autoMoveable = createAutoMoveable(positionable, moveable);

  const collidable = createCollidable(
    positionable,
    moveable,
    crateCheckCollision(canCollideWith)
  );

  spriteRenderingSystem.register(renderable);
  autoMovementSystem.register(autoMoveable);
  collisionSyste.register(collidable);
};

export default createBallBinder;
