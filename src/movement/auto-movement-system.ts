import createSystem from '../system/system';

import { AutoMoveable } from './auto-moveable';

const autoMovementSystem = (autoMoveable: AutoMoveable) => {
  autoMoveable.moveable.direction.forEach((dir, i) => {
    autoMoveable.positionable.pos[i] += autoMoveable.moveable.speed[i] * dir;
  });
};

export default createSystem(autoMovementSystem);
