import type { Unit } from '../types/units';
import { sleep } from './promises';
import { randChoice } from './random';
import { getAttackDamage, getDodgeChance, getHitChance, getMitigatedDamage } from './stats';

const shortSleepMillis = 250;
const longSleepMillis = 500;

const takeDamage = (unit: Unit, damage: number) => {
  unit.life = Math.max(0, unit.life - damage);
};

const fight = async (playerUnit: Unit, enemyUnit: Unit, sendMessage: (message: string) => void, render: () => void) => {
  let attacker = randChoice([playerUnit, enemyUnit]);
  let defender = (attacker === playerUnit ? enemyUnit : playerUnit);
  console.log(attacker);
  console.log(defender);
  await sleep(shortSleepMillis);
  
  while (playerUnit.life > 0 && enemyUnit.life > 0) {
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

    attacker = defender;
    defender = (attacker === playerUnit ? enemyUnit : playerUnit);
    render();
    await sleep(longSleepMillis);
  } 
};

export { fight };
