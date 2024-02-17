import styles from "./popup.module.scss";

const Popup = (props) => {
  return <div className={styles.popup__wrapper}>{props.children}</div>;
};

export default Popup;
