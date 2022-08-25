import headerStyles from "../styles/Header.module.css";

// Header of website
const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Testorino</span> NFTs
      </h1>
    </div>
  );
};

export default Header;
