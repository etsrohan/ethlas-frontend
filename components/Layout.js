import Nav from "./Nav";
import Header from "./Header";
import styles from "../styles/Layout.module.css";
import Meta from "./Meta";

// Overall layout of the website
const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}></div>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
