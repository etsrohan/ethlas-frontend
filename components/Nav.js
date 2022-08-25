import navStyles from "../styles/Nav.module.css";
import Link from "next/link";

// Navigation bar component
const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">HOME</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/gallery">GALLERY</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
