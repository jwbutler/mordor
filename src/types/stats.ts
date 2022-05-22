type Stat =
  /**
   * Directly contributes to damage.  Currently 1:1
   */
  'strength'
  /**
   * Chance to hit, chance to dodge
   */
| 'dexterity'
  /**
   * Spell damage, spell hit chance
   */
| 'intelligence'
  /**
   * Mana / mana regen
   */
| 'wisdom'
  /**
   * Life / life regen
   */
| 'constitution';

type Stats = Record<Stat, number>;

const statValues: Stat[] = ['strength', 'dexterity', 'intelligence', 'wisdom', 'constitution'];

const zeroStats: Stats = {
  strength: 0,
  dexterity: 0,
  intelligence: 0,
  wisdom: 0,
  constitution: 0
};

export type {
  Stat,
  Stats
};

export { statValues, zeroStats };
