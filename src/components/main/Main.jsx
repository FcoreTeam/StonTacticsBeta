import Strategy from "../strategy/Strategy";
import Popup from "../popup/Popup";

import screenshot from "../../img/screenshot.jpg";

import styles from "./main.module.scss";

const Main = () => {
  return (
    <>
      <main>
        <div className={styles.content}>
          <Strategy />
        </div>
      </main>
    </>
  );
};

export default Main;
