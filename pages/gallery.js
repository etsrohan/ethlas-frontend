import styles from "../styles/Card.module.css";
import Layout from "../components/Layout";
import NFTCard from "../components/NFTCard";

// Gallery page
export default function Gallery() {
  const hash = "QmNgUcJxb1onwt7jg3xXRBU6F4gDSPsDCeUrxgQ3podYFJ";
  const idArray = [...Array(10)];
  console.log(idArray);
  return (
    <>
      <Layout />
      <div className={styles.main}>
        <li className={styles.grid}>
          {idArray.map((item, index) => {
            return <NFTCard hash={hash} tokenId={index + 1} key={index} />;
          })}
        </li>
      </div>
    </>
  );
}
