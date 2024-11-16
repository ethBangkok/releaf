"use client";
import { useSubgraph } from "@/providers/subgraph-provider";
import { useQuery } from "@tanstack/react-query";
import { FundTransaction,beneficiaryList } from "./graph.query";

export const useProjectTransactions = () => {
  const { subgraphClient } = useSubgraph();
  try {
    const query = useQuery({
      queryKey: ["ProjectTransactions"],
      queryFn: async () => {
        const { data } = await subgraphClient.query(FundTransaction, {});
        return data;
      },
    });
    return query;
  } catch (err) {
    console.log(err);
  }
};

export const useBeneficiaryList = () => {
    const { subgraphClient } = useSubgraph();
    try {
      const query = useQuery({
        queryKey: ["BeneficiaryList"],
        queryFn: async () => {
          const { data } = await subgraphClient.query(beneficiaryList, {});
          return data;
        },
      });
      return query;
    } catch (err) {
      console.log(err);
    }
  };
