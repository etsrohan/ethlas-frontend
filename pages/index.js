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
import { app, database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import sale from "../contractJSON/NFTSale.json";

// Constants for interaction
const saleContractAddress = sale.address;
const nftPrice = ethers.utils.parseEther("0.01");

export default function Home() {
  // Firebase setup
  const databaseRef = collection(database, "Testorino Data");
  // Thirdweb Setup
  const connectMetamask = useMetamask();
  // Getting user Address
  const address = useAddress();
  // Getting sale contract instance
  const { contract } = useContract(saleContractAddress);
  // Getting userPurchases data from blockchain
  const { data, isLoading } = useContractData(
    contract,
    "userPurchases",
    address
  );

  // This is an unused function as there is no way to make it payable (send eth in tx)
  // const { mutateAsync: purchase, isLoading2 } = useContractCall(
  //   contract,
  //   "purchase"
  // );

  // Function to update firestore database
  const addData = (numData) => {
    addDoc(databaseRef, {
      address: address,
      numPurchases: numData.toString(),
    });
  };

  // Async function alerting the number of NFTs purchased by user
  // corresponds to button
  const numberSold = async () => {
    alert(`You purchased ${data} NFTs until now!`);
  };

  // Async function to transact purchase function on Sale contract
  // sends 0.01 ETH to purchase an NFT
  const purchaseNFT = async () => {
    try {
      const tx = await contract?.call("purchase", { value: nftPrice });
      const num = data + 1;
      alert(
        `Success you purchased an NFT! Tx Hash: ${tx.receipt.transactionHash}`
      );
      console.info("contract call successs", tx);
      addData(num);
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
