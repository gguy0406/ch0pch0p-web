import { fromBech32 } from '@cosmjs/encoding';

export function checkStarsAddress(address: string) {
  const { prefix, data } = fromBech32(address);

  if (prefix !== 'stars' || data.length !== 20) {
    throw new Error(`Invalid address ${address}`);
  }

  return true;
}
