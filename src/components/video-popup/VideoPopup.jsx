import clsx from "clsx";
import Popup from "../popup/Popup";

import trashIcon from "../../img/icons/Subtract-5.svg";

import styles from "./video-popup.module.scss";

const VideoPopup = ({ setVideoPopup, videoPopup, removeBind, setBombToTie }) => {
  const copyVideoUrl = () => {
    navigator.clipboard.writeText(
      `https://www.youtube.com/watch?v=${videoPopup.url}`
    );
  };

  return (
    <Popup>
      <div className={styles.video__wrapper}>
        {videoPopup.url && (
          <iframe
            src={`https://youtube.com/embed/${videoPopup.url}`}
            frameBorder="0"
            className={styles.video}
          ></iframe>
        )}
        <div className={styles.video__controlls}>
          <button
            className={clsx(styles.video__buttons, styles.share__button)}
            onClick={copyVideoUrl}
            disabled={videoPopup.url}
          >
            Поделиться
          </button>
          <button
            className={clsx(styles.video__buttons, styles.close__button)}
            onClick={() => {
              setVideoPopup({ isOpen: false, url: null });
              setBombToTie({
                x: null,
                y: null,
                name: null,
                id: null,
                width: null,
                height: null,
                playerColor: null,
              });
            }}
          >
            Закрыть
          </button>
          <button
            className={clsx(styles.video__buttons, styles.delete__button)}
            onClick={removeBind}
          >
            <img src={trashIcon} alt="" />
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default VideoPopup;
