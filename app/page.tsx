"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";

// Set up client

function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className='main'>
        <div className='title'>Connected to {connector?.name}</div>
        <div>{address}</div>
        <button className='card' onClick={disconnect as any}>
          Disconnect
        </button>
        Wallet Connected
      </div>
    );
  } else {
    return (
      <div className='main'>
        {connectors.map((connector) => {
          return (
            <button
              className='p-4 border'
              key={connector.id}
              onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          );
        })}
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}

// Pass client to React Context Provider
function App() {
  return (
    <div className='container'>
      <Profile />
    </div>
  );
}

export default App;
