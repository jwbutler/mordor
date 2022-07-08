import { Readable, writable } from 'svelte/store';
import type { Level } from '../lib/levels';
import type { Player } from '../lib/player';

type Menu = 'intro' | 'combat';

type GameState = {
  level: Level,
  player: Player,
  enableInput: boolean,
  messages: string[],
  menu: Menu | null
};

type InitialState = {
  level: Level,
  player: Player,
  menu: Menu | null
};

const state = writable<GameState>();

const get = <T> (store: Readable<T>): Promise<T> => new Promise(store.subscribe);

const initialize = ({ level, player, menu }: InitialState) => {
  state.set({
    level,
    player,
    enableInput: true,
    messages: [],
    menu
  });
};

export {
  initialize,
  state
};

export type {
  GameState,
  Menu
}
