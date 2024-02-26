import clsx from "clsx";

import Popup from "../popup/Popup";

import styles from "./accept-popup.module.scss";

const AcceptPopup = ({ accept, reject }) => {
  return (
    <Popup zIndex="3">
      <div className={clsx(styles.accept__wrapper, "flex-column")}>
        <p>Подтвердите действие</p>
        <div>
          <button onClick={accept}>Да</button>
          <button onClick={reject}>Нет</button>
        </div>
      </div>
    </Popup>
  );
};

export default AcceptPopup;
