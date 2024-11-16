import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { fundPoolAbi } from "./abi/fund-pool";

const fundPool = [
  {
    out: "./hooks/generated-contracts/fund-pool.ts",
    contracts: [
      {
        name: "FundPool",
        abi: fundPoolAbi,
      },
    ],
    plugins: [react()],
  },
];

export default defineConfig([...fundPool]);
