import createSystem from '../system/system';
import { Collidable } from './collidable';

const createCollisionSystem = (collidable: Collidable) => {
  collidable.checkCollision(collidable.positionable, collidable.moveable);
};

export default createSystem(createCollisionSystem);
