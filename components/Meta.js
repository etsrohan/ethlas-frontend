import Head from "next/head";

// Meta data of website
const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/card.png" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Testorino NFTs",
  keywords: "NFT, Sale, Buy NFT, Buy Testorino NFT",
  description: "Welcome to the Testorino NFT sale website",
};

export default Meta;
