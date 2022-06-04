import { state } from '../stores/state';
import { shuffle } from './random';
import type { Unit } from './units';
import { sleep } from './promises';
import { getAttackDamage, getDodgeChance, getHitChance, getMitigatedDamage } from './stats';
import type { CombatState } from '../stores/state';

const shortSleepMillis = 150;
const longSleepMillis = 400;

const takeDamage = (unit: Unit, damage: number) => {
  unit.life = Math.max(0, unit.life - damage);
};

const startCombat = async (enemy: Unit) => {
  await sleep(shortSleepMillis);
  state.update(state => {
    const units = shuffle([state.player.unit, enemy]);
    return {
      ...state,
      combat: {
        attacker: units[0],
        defender: units[1]
      }
    };
  });
};

type CombatProps = {
  state: CombatState,
  sendMessage: (message: string) => void,
  render: () => void,
  endCombat: () => void
};

const playTurn = async ({ endCombat, render, sendMessage, state }: CombatProps) => {
  const { attacker, defender } = state;
  
  await _attack(attacker, defender, sendMessage);
  render();
  if (defender.life <= 0) {
    endCombat();
  } else {
    state.attacker = defender;
    state.defender = attacker;
    await sleep(longSleepMillis);
  }
};

const _attack = async (attacker: Unit, defender: Unit, sendMessage: (message: string) => void) => {
  const hitChance = getHitChance(attacker);
  if (Math.random() < hitChance) {
    const dodgeChance = getDodgeChance(defender);
    if (Math.random() < dodgeChance) {
      sendMessage(`${defender.name} dodged ${attacker.name}'s attack!`);
    } else {
      const attackDamage = getAttackDamage(attacker);
      const mitigatedDamage = getMitigatedDamage(defender, attackDamage);
      sendMessage(`${attacker.name} hit ${defender.name} for ${mitigatedDamage}!`);
      takeDamage(defender, mitigatedDamage);
      if (defender.life <= 0) {
        await sleep(shortSleepMillis);
        sendMessage(`${defender.name} dies!`);
      }
    }
  } else {
    sendMessage(`${attacker.name} missed ${defender.name}!`);
  }
};

export { startCombat, playTurn };
