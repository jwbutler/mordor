type CompassDirection = 'north' | 'south' | 'east' | 'west';
const compassDirectionValues = ['north', 'south', 'east', 'west'];


type RelativeDirection = 'forward' | 'backward' | 'left' | 'right';
const relativeDirectionValues = ['forward', 'backward', 'left', 'right'];

type Coordinates = { x: number, y: number };

const rotateRight = (direction: CompassDirection): CompassDirection => ({
  'north': 'east',
  'east': 'south',
  'south': 'west',
  'west': 'north'
}[direction] as CompassDirection);

const rotateLeft = (direction: CompassDirection): CompassDirection => ({
  'north': 'west',
  'east': 'north',
  'south': 'east',
  'west': 'south'
}[direction] as CompassDirection);

const rotate180 = (direction: CompassDirection): CompassDirection => ({
  'north': 'south',
  'east': 'west',
  'south': 'north',
  'west': 'east'
}[direction] as CompassDirection);

const rotate = (currentDirection: CompassDirection, relativeDirection: RelativeDirection): CompassDirection => {
  switch (relativeDirection) {
    case 'forward':  return currentDirection;
    case 'backward': return rotate180(currentDirection);
    case 'left':     return rotateLeft(currentDirection);
    case 'right':    return rotateRight(currentDirection);
    default:         throw new Error(relativeDirection);
  }
};

const move = ({ x, y }: Coordinates, direction: CompassDirection, distance: number = 1): Coordinates => {
  switch (direction) {
    case 'north': return { x, y: y - distance };
    case 'south': return { x, y: y + distance };
    case 'east':  return { x: x + distance, y };
    case 'west':  return { x: x - distance, y };
  }
};

type NavigateProps = {
  coordinates: Coordinates,
  relativeDirection: RelativeDirection,
  compassDirection: CompassDirection
};

type NavigateResult = {
  coordinates: Coordinates,
  direction: CompassDirection
}

const navigate = ({ coordinates, compassDirection, relativeDirection }: NavigateProps): NavigateResult => {
  return {
    coordinates: (relativeDirection === 'forward') ? move(coordinates, compassDirection) : coordinates,
    direction: rotate(compassDirection, relativeDirection)
  };
};

export type {
  Coordinates,
  CompassDirection,
  NavigateResult,
  RelativeDirection
};

export {
  compassDirectionValues,
  move,
  navigate,
  relativeDirectionValues,
  rotate180,
  rotateLeft,
  rotateRight
};
