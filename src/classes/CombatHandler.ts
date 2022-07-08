import { playAudio } from '../lib/sounds';
import { levelUp } from '../lib/units';
import { state as stateStore, type GameState } from '../stores/state';
import { randBoolean } from '../lib/random';
import type { Unit } from '../lib/units';
import { sleep } from '../lib/promises';
import { getAttackDamage, getDodgeChance, getHitChance, getMitigatedDamage } from '../lib/stats';

const shortSleepMillis = 150;
const longSleepMillis = 250;

const takeDamage = (unit: Unit, damage: number) => {
  unit.life = Math.max(0, unit.life - damage);
};

type Props = {
  render: () => void
};

type CombatHandler = {
  getAttacker: () => Unit,
  getDefender: () => Unit,
  startCombat: (unit: Unit, state: GameState) => Promise<void>,
  playTurn: (state: GameState) => Promise<void>,
  playTurnPair: (state: GameState) => Promise<void>
}

const createCombatHandler = ({ render }: Props): CombatHandler => {
  let attacker: Unit;
  let defender: Unit;

  const startCombat = async (enemy: Unit, state: GameState) => {
    state.messages.push(`${enemy.name} appeared.`);
    await sleep(shortSleepMillis);
    if (randBoolean()) {
      attacker = enemy;
      defender = state.player.unit;
      state.menu = 'combat';
      await playTurn(state);
    } else {
      attacker = state.player.unit;
      defender = enemy;
      state.menu = 'combat';
    }
  };

  const playTurn = async (state: GameState): Promise<void> => {
    await _attack(attacker, defender, state);
    await sleep(longSleepMillis);
    stateStore.set({ ... state });
    await render();
    if (defender.life <= 0) {
      await sleep(longSleepMillis);
      state.menu = null;
      stateStore.set({ ... state });
    } else {
      const _attacker = attacker;
      attacker = defender;
      defender = _attacker;
    }
  };
  
  const playTurnPair = async (state: GameState): Promise<void> => {
    await sleep(shortSleepMillis);
    await playTurn(state);
    stateStore.set({ ... state });
    await sleep(longSleepMillis);
    if (state.menu === 'combat') {
      await playTurn(state);
      stateStore.set({ ... state });
    }
  };

  const _attack = async (attacker: Unit, defender: Unit, state: GameState) => {
    const hitChance = getHitChance(attacker);
    if (Math.random() < hitChance) {
      const dodgeChance = getDodgeChance(defender);
      if (Math.random() < dodgeChance) {
        state.messages.push(`${defender.name} dodged ${attacker.name}'s attack.`);
      } else {
        await playAudio(attacker.sprite.sounds.attack);
        const attackDamage = getAttackDamage(attacker);
        const mitigatedDamage = getMitigatedDamage(defender, attackDamage);
        state.messages.push(`${attacker.name} hit ${defender.name} for ${mitigatedDamage}.`);
        takeDamage(defender, mitigatedDamage);
        stateStore.set({ ... state });
        if (defender.life <= 0) {
          await sleep(shortSleepMillis);
          await playAudio(defender.sprite.sounds.die);
          state.messages.push(`${defender.name} died.`);
          const playerUnit = state.player.unit;
          if (defender === playerUnit) {
            alert('GAME OVER!');
          } else {
            const { x, y } = state.player.coordinates;
            const tile = state.level.tiles[y][x];
            tile.enemies.splice(tile.enemies.indexOf(defender));
            playerUnit.experience++;
            if (playerUnit.experience >= playerUnit.experienceToNextLevel) {
              levelUp(playerUnit);
            }
          }
          stateStore.set({ ... state });
        }
      }
    } else {
      state.messages.push(`${attacker.name} missed ${defender.name}.`);
    }
  };
  
  return {
    getAttacker: () => attacker!!,
    getDefender: () => defender!!,
    playTurn,
    playTurnPair,
    startCombat
  };
};

export { createCombatHandler, type CombatHandler };
