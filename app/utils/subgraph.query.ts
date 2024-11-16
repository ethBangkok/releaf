'use client';
import { useSubgraph } from "@/providers/subgraph-provider";
import { useQuery } from '@tanstack/react-query';
import { FundTransaction } from "./graph.query";

export const useProjectTransactions = () =>{
    const { subgraphClient } = useSubgraph();
    const query = useQuery(
        {
          queryKey: ['ProjectTransactions'],
          queryFn: async () => {
            const { data } = await subgraphClient.query(FundTransaction, {});
            return data;
          },
        },
      );

}