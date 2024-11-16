'use client';
import { Client } from '@urql/core';
import React, { FC, createContext, useContext } from 'react';

export type SubgraphContextType = {
  subgraphClient: Client;
};

const SubgraphContext = createContext({
  subgraphClient: {} as Client,
});

type SubgraphProviderops = {
  children: React.ReactNode;
  subgraphClient: Client;
};

export const SubgraphProvider: FC<SubgraphProviderops> = ({
  children,
  subgraphClient,
}) => {
  return (
    <SubgraphContext.Provider
      value={{
        subgraphClient: subgraphClient as Client,
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
