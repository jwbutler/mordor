type CompassDirection = 'north' | 'south' | 'east' | 'west';
const compassDirectionValues = ['north', 'south', 'east', 'west'];


type RelativeDirection = 'forward' | 'backward' | 'left' | 'right';
const relativeDirectionValues = ['forward', 'backward', 'left', 'right'];

type Coordinates = { x: number, y: number };

export type { Coordinates, CompassDirection, RelativeDirection };
export { compassDirectionValues, relativeDirectionValues };
