import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Level } from '../lib/levels';
import type { Player } from '../lib/player';

type GameState = {
  level: Level,
  player: Player,
  enableInput: boolean,
  messages: string[]
};

type InitState = {
  level: Level,
  player: Player
};

const state: Writable<GameState> = writable<GameState>();

const initialize = ({ level, player }: InitState) => {
  state.set({ level, player, enableInput: true, messages: [] });
};

export {
  initialize,
  state,
  type GameState
};
