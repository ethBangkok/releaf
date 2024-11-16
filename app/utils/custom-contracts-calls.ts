import { deployedPoolContractAddress } from "@/constants/config";
import {
  useReadFundPoolTreasurer,
  useWriteFundPoolDepositFund,
} from "@/hooks/generated-contracts/fund-pool";
import { useAccount, useBalance } from "wagmi";

export const useGetBalance = () => {
  return useBalance({
    address: deployedPoolContractAddress,
    query: {
      select: (data) => Number(String(data.value)),
    },
  });
};

export const useCheckIfTreasurer = () => {
  const account = useAccount();
  return useReadFundPoolTreasurer({
    address: deployedPoolContractAddress,
    args: [account?.address as `0x${string}`],
    query: {
      select(data) {
        return data || false;
      },
    },
  });
};

// export const useCheckIfAdmin = () => {
//   const account = useAccount();
//   return useRead({
//     address: deployedPoolContractAddress,
//     args: [account?.address as `0x${string}`],
//     query: {
//       select(data) {
//         return data || false;
//       },
//     },
//   });
// }

export const useDepositTreasuryPool = (...args: any) => {
  const account = useAccount();
  return useWriteFundPoolDepositFund(...args);
};
