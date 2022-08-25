import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

// About page
export default function Home() {
  return (
    <div>
      <Layout />
      <p className={styles.description}>
        Welcome to the website for the Testorino NFT sale. You can buy an NFT
        for just 0.01 ETH!
      </p>
    </div>
  );
}
