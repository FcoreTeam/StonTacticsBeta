import styles from "./popup.module.scss";

const Popup = (props) => {
  return (
    <div
      style={props.zIndex !== undefined ? { zIndex: props.zIndex } : null}
      className={styles.popup__wrapper}
    >
      {props.children}
    </div>
  );
};

export default Popup;
