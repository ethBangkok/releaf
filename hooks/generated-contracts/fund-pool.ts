import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FundPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fundPoolAbi = [
  {
    type: "function",
    inputs: [],
    name: "depositFund",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "constructor",
    inputs: [
      { name: "_deployer", internalType: "address", type: "address" },
      { name: "_pushCommAddress", internalType: "address", type: "address" },
      { name: "_channelAddress", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "funder",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FundAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "funder",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FunderAdded",
  },
  {
    type: "function",
    inputs: [
      { name: "walletaddress", internalType: "address", type: "address" },
    ],
    name: "registerTreasurer",
    outputs: [],
    stateMutability: "payable",
  },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    inputs: [],
    name: "channelAddress",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "fundDeposited",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "minimumBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "pushCommAddress",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "treasurer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fundPoolAbi}__
 */
export const useReadFundPool = /*#__PURE__*/ createUseReadContract({
  abi: fundPoolAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"channelAddress"`
 */
export const useReadFundPoolChannelAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: fundPoolAbi,
    functionName: "channelAddress",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"fundDeposited"`
 */
export const useReadFundPoolFundDeposited = /*#__PURE__*/ createUseReadContract(
  { abi: fundPoolAbi, functionName: "fundDeposited" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"minimumBalance"`
 */
export const useReadFundPoolMinimumBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: fundPoolAbi,
    functionName: "minimumBalance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"pushCommAddress"`
 */
export const useReadFundPoolPushCommAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: fundPoolAbi,
    functionName: "pushCommAddress",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"treasurer"`
 */
export const useReadFundPoolTreasurer = /*#__PURE__*/ createUseReadContract({
  abi: fundPoolAbi,
  functionName: "treasurer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fundPoolAbi}__
 */
export const useWriteFundPool = /*#__PURE__*/ createUseWriteContract({
  abi: fundPoolAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"depositFund"`
 */
export const useWriteFundPoolDepositFund = /*#__PURE__*/ createUseWriteContract(
  { abi: fundPoolAbi, functionName: "depositFund" }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"registerTreasurer"`
 */
export const useWriteFundPoolRegisterTreasurer =
  /*#__PURE__*/ createUseWriteContract({
    abi: fundPoolAbi,
    functionName: "registerTreasurer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fundPoolAbi}__
 */
export const useSimulateFundPool = /*#__PURE__*/ createUseSimulateContract({
  abi: fundPoolAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"depositFund"`
 */
export const useSimulateFundPoolDepositFund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fundPoolAbi,
    functionName: "depositFund",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fundPoolAbi}__ and `functionName` set to `"registerTreasurer"`
 */
export const useSimulateFundPoolRegisterTreasurer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fundPoolAbi,
    functionName: "registerTreasurer",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fundPoolAbi}__
 */
export const useWatchFundPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: fundPoolAbi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fundPoolAbi}__ and `eventName` set to `"FundAdded"`
 */
export const useWatchFundPoolFundAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fundPoolAbi,
    eventName: "FundAdded",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fundPoolAbi}__ and `eventName` set to `"FunderAdded"`
 */
export const useWatchFundPoolFunderAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fundPoolAbi,
    eventName: "FunderAdded",
  });
