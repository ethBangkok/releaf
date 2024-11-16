import { formatEther, parseEther, parseGwei } from "viem";

export const deployedPoolContractAddress = (process.env
  .NEXT_PUBLIC_FUND_POOL_CONTRACT || "") as `0x${string}`;

export const AMOUNT_TO_STAKE = parseGwei("1", "wei");

export const AMOUNT_TO_STAKE_IN_ETH = formatEther(BigInt(AMOUNT_TO_STAKE));

export const ADMIN_ADDRESS = (process.env.NEXT_PUBLIC_ADMIN_ADDRESS ||
  "") as `0x${string}`;

export const PUSH_THREAD_HASH =
  process.env.NEXT_PUBLIC_PUSH_NOTIFICATIONS_THREAD_HASH;
