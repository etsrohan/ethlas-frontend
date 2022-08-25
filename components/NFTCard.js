import cardStyles from "../styles/Card.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const NFTCard = ({ hash, tokenId }) => {
  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
    async function getMetadata(x, y) {
      const res = await fetch(`https://gateway.pinata.cloud/ipfs/${x}/${y}`);
      const data = await res.json();
      setMetadata(data);
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

// // component used to archive the asset record locally in our database
// const ArchiveResponseLocally = ({ id }) => {
//   const [idc, setIdc] = useState("");
//   const [ar, setAr] = useState({
//     message: "waiting for a response from our fetch...",
//   });
//   useEffect(() => {
//     console.log("useEffect was called");
//     const archiveRes = async () => {
//       const response = await fetch(
//         `https://gateway.pinata.cloud/ipfs/QmNgUcJxb1onwt7jg3xXRBU6F4gDSPsDCeUrxgQ3podYFJ/1`
//       );
//       if (!response.ok) throw new Error(response.status);
//       return response.json();
//       //   setAr({ message: "response from fetch is complete", id: idc });
//       //   return { message: "response from fetch is complete", id: idc };
//     };
//     // Update the document title using the browser API
//     archiveRes(idc); // setAr(archiveRes(idc)); // - this does not work since archiveRes will return a promise, so need to call `setAr` from WITHIN the async function
//   }, [idc]);

//   console.log("idc:", idc, "id:", id);
//   console.log("ar:", ar);
//   if (idc !== id) setIdc(id);
//   return <>{JSON.stringify(ar)}</>;
// };
