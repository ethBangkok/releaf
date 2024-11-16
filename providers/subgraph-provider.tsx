'use client';
import { cacheExchange, Client, fetchExchange } from '@urql/core';
import React, { FC, createContext, useContext } from 'react';

export type SubgraphContextType = {
  subgraphClient: Client;
};

const SubgraphContext = createContext({
  subgraphClient: {} as Client,
});

type SubgraphProviderops = {
  children: React.ReactNode;
};

export const SubgraphProvider: FC<SubgraphProviderops> = ({
  children,
 
}) => {
  return (
    <SubgraphContext.Provider
      value={{
        subgraphClient: new Client({
            url: 'https://api.studio.thegraph.com/query/42205/eth-bangkok/version/latest',
            exchanges: [cacheExchange, fetchExchange]
        }),
      }}
    >
      {children}
    </SubgraphContext.Provider>
  );
};

export const useSubgraph = (): SubgraphContextType => {
  const context = useContext(SubgraphContext);
  if (context === undefined) {
    throw new Error('useSubgraph must be used within a SubgraphProvider');
  }
  return context;
};