import type { RelativeDirection } from './geometry';

const getRelativeDirection = (e: KeyboardEvent): RelativeDirection | null => {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      return 'forward';
    case 'ArrowLeft':
    case 'KeyA':
      return 'left';
    case 'ArrowRight':
    case 'KeyD':
      return 'right';
    case 'ArrowDown':
    case 'KeyS':
      return 'backward';
    default:
      return null;
  }
};

export {
  getRelativeDirection
};
