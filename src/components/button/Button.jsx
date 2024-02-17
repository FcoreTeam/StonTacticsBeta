import clsx from "clsx";
import styles from "./button.module.scss";

const Button = ({ ico, secondClass,grenadename, onClick = () => null}) => {
  return (
    <button
      className={clsx(styles.setting__button, styles[secondClass])}
      onClick={onClick}
    >
      <img src={ico} alt="" />
      <p className={styles.grenade__text}>{grenadename}</p>
    </button>
  );
};
export default Button;
