import buttonStyles from "../styles/Button.module.css";
import homeStyles from "../styles/Home.module.css";
import Link from "next/link";

// Displays a button
const Button = ({ text, click }) => {
  return (
    <div>
      <button className={buttonStyles.button} onClick={click}>
        {text}
      </button>
    </div>
  );
};

export default Button;
