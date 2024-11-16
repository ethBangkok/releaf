import { deployedPoolContractAddress } from "@/constants/config";
import { useBalance } from "wagmi";

export const useGetBalance = () => {
  return useBalance({
    address: deployedPoolContractAddress,
    query: {
      select: (data) => Number(String(data.value)),
    },
  });
};
