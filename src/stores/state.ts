import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Level } from '../lib/levels';
import type { Player } from '../lib/player';
import type { Unit } from '../lib/units';

type GameState = {
  level: Level,
  player: Player,
  enableInput: boolean,
  messages: string[],
  combat: CombatState | null
};

type CombatState = {
  attacker: Unit,
  defender: Unit
};

type InitState = {
  level: Level,
  player: Player
};

const state: Writable<GameState> = writable<GameState>();

const initialize = ({ level, player }: InitState) => {
  state.set({
    level,
    player,
    enableInput: true,
    messages: [],
    combat: null
  });
};

export {
  initialize,
  state,
  type CombatState,
  type GameState
};
