import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  const [networkName, setNetworkName] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      // Sepolia chainId = 11155111 (0xaa36a7)
      const desiredChainId = 11155111n;
      const contractAddress =
        import.meta.env.VITE_CONTRACT_ADDRESS ||
        "0x821C776b22dC24F7231504f7CE081E63af13c5f6";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          // Ensure MetaMask is on Sepolia
          let provider = new ethers.BrowserProvider(ethereum);
          let network = await provider.getNetwork();

          if (network.chainId !== desiredChainId) {
            try {
              await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xaa36a7" }],
              });
            } catch (switchError) {
              console.error("Failed to switch network:", switchError);
              alert(
                "Please switch MetaMask to the Sepolia network to use this app."
              );
              return;
            }

            // Recreate provider and network after switch
            provider = new ethers.BrowserProvider(ethereum);
            network = await provider.getNetwork();
          }

          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          setNetworkName(network?.name || `Chain ID ${network.chainId}`);

          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(accounts[0]);
          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.error("Wallet connection error:", error);
        alert(
          "Failed to connect wallet. Check MetaMask, selected network, and contract address."
        );
      }
    };
    connectWallet();
  }, []);

  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <div className="logo-wrap">
            <img src={chai} className="logo" alt="Chai dApp" />
            <div>
              <h1 className="app-title">Buy Me a Chai</h1>
              <p className="app-subtitle">
                Support the creator with a small tip and a nice message.
              </p>
            </div>
          </div>
          <div className="wallet-info">
            <span className="badge badge-network">
              {networkName || "Not connected"}
            </span>
            <span className="badge badge-account">
              {account !== "None"
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect with MetaMask"}
            </span>
          </div>
        </header>

        <main className="app-main">
          <section className="grid">
            <div className="grid-item">
              <Buy state={state} />
            </div>
            <div className="grid-item">
              <Memos state={state} />
            </div>
          </section>
        </main>

        <footer className="app-footer">
          <span>Powered by Ethereum · Sepolia testnet</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
