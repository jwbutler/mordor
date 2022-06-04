
import floor_ceiling from '../assets/gen/floor_ceiling.png';
import hall_left_0 from '../assets/gen/hall_left_0.png';
import hall_left_1 from '../assets/gen/hall_left_1.png';
import hall_left_2 from '../assets/gen/hall_left_2.png';
import hall_left_3 from '../assets/gen/hall_left_3.png';
import hall_right_0 from '../assets/gen/hall_right_0.png';
import hall_right_1 from '../assets/gen/hall_right_1.png';
import hall_right_2 from '../assets/gen/hall_right_2.png';
import hall_right_3 from '../assets/gen/hall_right_3.png';
import middle_door from '../assets/gen/middle_door.png';
import wall_center_1 from '../assets/gen/wall_center_1.png';
import wall_center_2 from '../assets/gen/wall_center_2.png';
import wall_center_3 from '../assets/gen/wall_center_3j.png';
import wall_center_4 from '../assets/gen/wall_center_4j.png';
import wall_left_1 from '../assets/gen/wall_left_1.png';
import wall_left_2 from '../assets/gen/wall_left_2j.png';
import wall_left_3 from '../assets/gen/wall_left_3j.png';
import wall_left_4 from '../assets/gen/wall_left_4j.png';
import wall_right_1 from '../assets/gen/wall_right_1.png';
import wall_right_2 from '../assets/gen/wall_right_2j.png';
import wall_right_3 from '../assets/gen/wall_right_3j.png';
import wall_right_4 from '../assets/gen/wall_right_4j.png';

type DungeonImages = {
  hallsLeft: string[],
  hallsRight: string[],
  wallsCenter: string[],
  wallsLeft: string[],
  wallsRight: string[],
  doors: (string | null)[],
  floorCeiling: string
};

const getDungeonImages = (): DungeonImages => ({
  hallsLeft: [hall_left_0, hall_left_1, hall_left_2, hall_left_3],
  hallsRight: [hall_right_0, hall_right_1, hall_right_2, hall_right_3],
  wallsCenter: [wall_center_1, wall_center_2, wall_center_3, wall_center_4],
  wallsLeft: [wall_left_1, wall_left_2, wall_left_3, wall_left_4],
  wallsRight: [wall_right_1, wall_right_2, wall_right_3, wall_right_4],
  doors: [middle_door, null, null, null],
  floorCeiling: floor_ceiling
});

export { getDungeonImages };
