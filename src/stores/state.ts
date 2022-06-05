import { Readable, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Level } from '../lib/levels';
import type { Player } from '../lib/player';

type GameState = {
  level: Level,
  player: Player,
  enableInput: boolean,
  messages: string[],
  inCombat: boolean
};

type InitialState = {
  level: Level,
  player: Player
};

const state = writable<GameState>();

const get = <T> (store: Readable<T>): Promise<T> => new Promise(store.subscribe);

const initialize = ({ level, player }: InitialState) => {
  state.set({
    level,
    player,
    enableInput: true,
    messages: [],
    inCombat: false
  });
};

export {
  initialize,
  state,
  type GameState
};
