import { useEffect, useState, useCallback } from "react";
import { IProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { PasskeysPlugin } from "@web3auth/passkeys-sfa-plugin";
import {
  initializeWeb3Auth,
  initializePasskeysPlugin,
} from "../web3-auth-initializer";
import RPC from "../viemRPC";
import { shouldSupportPasskey } from "@/lib/support-passkey";

function Dashboard() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [passkeysPlugin, setPasskeysPlugin] = useState<PasskeysPlugin | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = await initializeWeb3Auth();
        setWeb3auth(web3authInstance);

        await web3authInstance.initModal(); // Initialize modal before plugins
        console.log("Web3Auth initialized successfully");

        const passkeysInstance = await initializePasskeysPlugin(
          web3authInstance
        );
        setPasskeysPlugin(passkeysInstance);

        const supportPasskeys = shouldSupportPasskey();
        console.log("Support Passkeys:", supportPasskeys);

        if (web3authInstance.connected) setLoggedIn(true);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    init();
  }, []);

  // User Login
  const login = useCallback(async () => {
    try {
      if (!web3auth) throw new Error("Web3Auth is not initialized");
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login Error:", error);
    }
  }, [web3auth]);

  // User Logout
  const logout = useCallback(async () => {
    try {
      if (!web3auth) throw new Error("Web3Auth is not initialized");
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      uiConsole("logged out");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }, [web3auth]);

  // Passkeys Functionality
  const registerPasskey = useCallback(
    async (username: string) => {
      try {
        if (!passkeysPlugin)
          throw new Error("Passkeys Plugin not initialized.");
        await passkeysPlugin.registerPasskey({ username });
        console.log("Passkey registered successfully for:", username);
      } catch (error) {
        console.error("Error registering passkey:", error);
      }
    },
    [passkeysPlugin]
  );

  const loginWithPasskey = useCallback(
    async (authenticatorId: string) => {
      try {
        if (!passkeysPlugin)
          throw new Error("Passkeys Plugin not initialized.");
        const user = await passkeysPlugin.loginWithPasskey({
          authenticatorId,
        });
        console.log("User logged in successfully with Passkey:", user);
      } catch (error) {
        console.error("Error logging in with passkey:", error);
      }
    },
    [passkeysPlugin]
  );

  const listAllPasskeys = useCallback(async () => {
    try {
      if (!passkeysPlugin) throw new Error("Passkeys Plugin not initialized.");
      const passkeys = await passkeysPlugin.listAllPasskeys();
      console.log("Registered Passkeys:", passkeys);
    } catch (error) {
      console.error("Error listing passkeys:", error);
    }
  }, [passkeysPlugin]);

  // Console for Logging UI Feedback
  const uiConsole = (...args: any[]) => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <button
          onClick={() => registerPasskey("user@example.com")}
          className="card"
        >
          Register Passkey
        </button>
        <button
          onClick={() => loginWithPasskey("authenticator_id")}
          className="card"
        >
          Login with Passkey
        </button>
        <button onClick={listAllPasskeys} className="card">
          List All Passkeys
        </button>
        <button onClick={logout} className="card">
          Log Out
        </button>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">Web3Auth & Passkeys Integration Example</h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default Dashboard;
