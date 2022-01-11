import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";


const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Link 1
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              Link 2
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              Link 3
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Link 4
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com/HalfDeadDigital" rel="noopener" target="_blank"><img className="nav-social" src="/icons/twitter.svg" alt="" /></a>
              <a href="https://discord.com/invite/KBsVb7ajxw" rel="noopener" target="_blank"><img className="nav-social" src="/icons/discord.svg" alt="" /></a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <div className="social-icons hide-800">
            <a href="https://twitter.com/HalfDeadDigital" rel="noopener" target="_blank"><img className="nav-social" src="/icons/twitter.svg" alt="" /></a>
            <a href="https://discord.com/invite/KBsVb7ajxw" rel="noopener" target="_blank"><img className="nav-social" src="/icons/discord.svg" alt="" /></a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
          <h1 className="pb-3">The Half Dead Collection</h1>
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <img className="gif" src="/public/img/half-dead.gif" alt="Half Dead Rare examples" style="width: 100%; max-width: 220px; margin: 0 auto;" />
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>

                        <Minter
                          candyMachineId={candyMachineId}

                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />

                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>

          <div id="link2" className="container">
            <h2 className="pb-3">Origin Story</h2>
            <p>On top of a hill, in the far corner of town lived an old inventor. His enormous house looked as if it was once alive but now beginning to slowly decompose from the inside out. He had no real friends, or family and the towns people hated him. None of which had a real reason to, in reality they just didn’t understand him . He was unique… One of a kind… a rarity. They thought he was weird and treated him like a complete outsider even though he lived there for over 50 years.</p>
            <p>One dark night, under a blood red moon he decided to make his own friends and family. However, what he created was not fully alive, but rather half dead. More comparable to a zombie pet - far from a human companion - but the inventor didn’t care! He had friends…. FINALLY! These friends may be the embodiment of pure evil but they love and protect him…. No one else gets the inventor like they do, because they are living extensions of him.</p>
            <p>Still to this day they follow his lead and do whatever he says…. which sometimes means wreaking havoc on the unsuspecting towns people. </p>
          </div>

          <div id="link3" className="container">
            <div>
              <h2 className="pb-3">Roadmap:</h2>
              <p>- Intro Teaser Video Release 12.5.21</p>
              <p>- Full Website Update 12.17.21</p>
              <p>- 1st Half Dead YouTube episode 1.7.22</p>
              <p>- Public Mint 1.11.22</p>
              <p>- 3D Printing Renders airdropped to holders 2.20.22</p>
              <p>- 666 Winners announced for 3D Printed 1/1&nbsp;</p>
              <hr/>
              <h2 className="pb-3">Post Launch</h2>
              <p>After launch we will continue to keep bringing the “half dead” to life in many different ways.
              We will be using the royalties to fund, develop and produce more content.
              We want to be engaged with out community as much as possible, rewarding those who dare enter the Half Dead realm.</p>
              <hr/>
              <h2 className="pb-3">Rewards</h2>
              <p>- 50% of HalfDead YouTube Ad Revenue distributed to community Holders (Monthly)</p>
              <p>- 3D Printing Render for all holders</p>
              <p>- HalfDead Metaverse Lounge Access&nbsp;</p>
              <p>- Claimable celebrity and personalized audio for your Half Dead NFT</p>
              <hr/>
              <h2 className="pb-3">Team</h2>
              <p>- Created by Connecticut Artist &amp; Designer Dan Yatsinko aka Danimal Lector, powered by <a href="nycrypto.co" rel="noopener" target="_blank">Nycrypto</a></p></div>
          </div>
      </div>
    </div>
  );
};

export default App;
