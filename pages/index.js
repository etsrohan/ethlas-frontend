import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks";

export default function Home() {
  const { address, chainId, provider, connectWallet, disconnectWallet } =
    useWeb3();
  const { switchNetwork } = useSwitchNetwork();
  return (
    <>
      <div className={styles.container}>
        <Layout />
      </div>
      <div className={styles.main}>
        {address ? (
          <Button click={() => disconnectWallet(4)} text="Switch Account" />
        ) : (
          <Button
            click={() => {
              connectWallet("injected");
              switchNetwork(4);
            }}
            text="Connect Metamask Wallet"
          />
        )}
      </div>
    </>
  );
}
