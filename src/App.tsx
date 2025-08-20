import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useState } from "react";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import "./App.css";
import { CallContract } from "./components/CallContract.tsx";
import { Balance } from "./components/getBalance.tsx";
import { SendTransaction } from "./components/sendTransaction.tsx";
import { SwitchChain } from "./components/switchNetwork.tsx";
function App() {
  const { connect, isConnected, connectorName, loading: connectLoading, error: connectError } = useWeb3AuthConnect();
  // IMP START - Logout
  const { disconnect, loading: disconnectLoading, error: disconnectError } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address } = useAccount();
  const [customErc20Address, setCustomErc20Address] = useState("");

  // function uiConsole(...args: any[]): void {
  //   const el = document.querySelector("#console>p");
  //   if (el) {
  //     el.innerHTML = JSON.stringify(args || {}, null, 2);
  //     console.log(...args);
  //   }
  // }

  const loggedInView = (
    <div className="grid">
      <h2>Connected to {connectorName}</h2>
      <div>{address}</div>
      <div className="flex-container">
        <div>
          <button onClick={() => console.log(userInfo)} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={() => disconnect()} className="card">
            Log Out
          </button>
          {disconnectLoading && <div className="loading">Disconnecting...</div>}
          {disconnectError && <div className="error">{disconnectError.message}</div>}
        </div>
      </div>
      <SwitchChain />
      <Balance />
      <SendTransaction />
      <div>
        <h2>Erc20 Balance</h2>
        <input
          placeholder={import.meta.env.VITE_DEFAULT_ERC20_ADDRESS}
          value={customErc20Address}
          onChange={(e) => setCustomErc20Address(e.target.value)} />
      </div>
      {address && (customErc20Address !== "" && isAddress(customErc20Address) || customErc20Address === "" && import.meta.env.VITE_DEFAULT_ERC20_ADDRESS) && <CallContract accountAddress={address} erc20Address={isAddress(customErc20Address) ? customErc20Address : import.meta.env.VITE_DEFAULT_ERC20_ADDRESS} />}
    </div>
  );

  const unloggedInView = (
    <div className="grid">
      <button onClick={() => connect()} className="card">
        Login
      </button>
      {connectLoading && <div className="loading">Connecting...</div>}
      {connectError && <div className="error">{connectError.message}</div>}
    </div>

  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/modal" rel="noreferrer">
          Web3Auth{" "}
        </a>
        & React Modal Quick Start
      </h1>

      {isConnected ? loggedInView : unloggedInView}
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default App;