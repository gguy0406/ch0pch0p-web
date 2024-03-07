import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';

import { STARGAZE_RPC_ENDPOINT } from 'environments/environment';

import * as dbMachines from '../db/machines';
import * as dbTurnCount from '../db/play-turn-count';
import { Machine } from '../lib/dto-types';
import { MachineSetting } from '../lib/types';

export async function getMachines() {
  const machines = await dbMachines.getAll();

  return machines.map((machine): Machine => ({ id: machine.id, status: machine.status, wonPrize: machine.wonPrize }));
}

export function getTurnCount(address: string) {
  return dbTurnCount.get(address);
}

export function runProbability(machineSetting: MachineSetting) {
  const remainedTurn = machineSetting.remainedTurn[machineSetting.stage]!;
  const prizeAllocation = machineSetting.prizeAllocation[machineSetting.stage]!;
  const random = Math.random() * (remainedTurn + (remainedTurn - prizeAllocation) / 20);

  return random < prizeAllocation;
}

export async function getSigningCosmWasmClient() {
  return SigningCosmWasmClient.connectWithSigner(
    STARGAZE_RPC_ENDPOINT,
    await DirectSecp256k1HdWallet.fromMnemonic(process.env['WEB_RUNNER_SEED'] as string, { prefix: 'stars' }),
    { gasPrice: GasPrice.fromString('1ustars') }
  );
}
