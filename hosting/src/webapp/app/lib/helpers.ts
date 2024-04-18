export * from 'lib/helpers';

export function getMarketplaceUrl(contractAddress: string) {
  return `https://www.stargaze.zone/m/${contractAddress}`;
}
