import styles from "../styles/Home.module.css";
import buttonStyles from "../styles/Button.module.css";
import Layout from "../components/Layout";
import Button from "../components/Button";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const saleContractAddress = "0xDC000C5d66d82973C54DEC46005EF1C2f60C3458";
const nftContractAddress = "0xc37e69cFdbA579338C6a1c621ce6C01AFAeAB997";
const nftPrice = ethers.utils.parseEther("0.01");

export default function Home() {
  const connectMetamask = useMetamask();
  const address = useAddress();
  const { contract } = useContract(saleContractAddress);
  const { data, isLoading } = useContractData(
    contract,
    "userPurchases",
    address
  );
  const { mutateAsync: purchase, isLoading2 } = useContractCall(
    contract,
    "purchase"
  );

  const numberSold = async () => {
    alert(`You purchased ${data} NFTs until now!`);
  };

  const purchaseNFT = async () => {
    try {
      const tx = await contract?.call("purchase", { value: nftPrice });
      alert(
        `Success you purchased an NFT! Tx Hash: ${tx.receipt.transactionHash}`
      );
      console.info("contract call successs", tx);
    } catch (err) {
      console.error("contract call failure", err);
      alert(`Error: ${err}`);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Layout />
      </div>
      <div className={styles.main}>
        {isLoading ? (
          <h1 className={styles.description}>Loading...</h1>
        ) : address ? (
          <>
            <h1 className={styles.description}>Connected Address: {address}</h1>
            <h1 className={styles.description}>
              Please switch over to Rinkeby testnet if not automatically done
              so!
            </h1>
            <Button click={numberSold} text="Number Purchased" />
            <Button click={purchaseNFT} text="Purchase NFT" />
          </>
        ) : (
          <Button click={connectMetamask} text="Connect Metamask Wallet" />
        )}
      </div>
    </>
  );
}
