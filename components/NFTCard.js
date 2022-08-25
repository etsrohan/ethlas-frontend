import cardStyles from "../styles/Card.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import nft from "../contractJSON/TestorinoNFT.json";

// Infura URL to inteact with Rinkeby
const infuraURL =
  "https://rinkeby.infura.io/v3/5771fa5944764406a994e4800c31a3fa";

const NFTCard = ({ hash, tokenId }) => {
  // State variables that store metadata and owner of NFT
  const [metadata, setMetadata] = useState([]);
  const [owner, setOwner] = useState("");
  // Fetch metadata from IPFS and get corresponding image
  useEffect(() => {
    async function getMetadata(x, y) {
      // Fetch metadata
      const res = await fetch(`https://gateway.pinata.cloud/ipfs/${x}/${y}`);
      const data = await res.json();
      setMetadata(data);

      // Get owner address of NFT
      const provider = new ethers.providers.JsonRpcProvider(infuraURL);
      const contract = new ethers.Contract(nft.address, nft.abi, provider);
      // Unminted tokens will throw an error. Using this to avoid the alert.
      try {
        const ownerAddress = await contract.ownerOf(tokenId);
        setOwner(ownerAddress);
      } catch (err) {
        console.error(err);
      }
    }
    getMetadata(hash, tokenId);
  }, [hash, tokenId]);
  let image_url;
  if (metadata.image !== undefined) {
    // image_url = `https://gateway.pinata.cloud/ipfs/${metadata.image.slice(7)}`;
    // image_url = `https://ipfs.io/ipfs/${metadata.image.slice(7)}`;
    // The above 2 were either slow or reported too many requests (429) or gateway timed out (504)
    image_url = `/nft_images/${metadata.image.slice(54)}`;
  }
  return (
    <span className={cardStyles.card}>
      <h2>{`${tokenId}: ${metadata.name}`}</h2>
      {owner ? (
        <h2>{`Owner: 0x${owner.slice(2, 6)}...${owner.slice(38)}`}</h2>
      ) : (
        <h2>Owner: Unclaimed</h2>
      )}
      {image_url !== undefined ? (
        <Image
          src={image_url}
          alt={metadata.name}
          width={150}
          height={250}
          layout="intrinsic"
        />
      ) : (
        <p>Loading</p>
      )}
    </span>
  );
};

export default NFTCard;
