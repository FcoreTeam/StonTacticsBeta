import { useState } from "react";
import Popup from "../popup/Popup";

import styles from "./url-popup.module.scss";

const UrlPopup = ({
  setAddingVideoUrl,
  setAddVideoData,
  addingVideoUrl,
  addVideo,
}) => {
  const [isCorrectUrl, setIsCorrectUrl] = useState(null);

  const checkVideoUrl = (url) => {
    setAddingVideoUrl(url.replace(/\s/g, ""));
    if (
      url.includes("https://www.youtube.com/") ||
      url.includes("https://youtu.be/")
    ) {
      setIsCorrectUrl(true);
    } else {
      setIsCorrectUrl(false);
    }
  };

  return (
    <Popup>
      <div className={styles.bomb__video_area}>
        <div className={styles.add__video}>
          <div className={styles.popup__info}>Ссылка на видео YouTube</div>
          <div className={styles.add__wrap}>
            <div className={styles.circle__value}>1</div>
            <input
              type="text"
              className={styles.video__link}
              placeholder="https://www.youtube.com/"
              value={addingVideoUrl}
              onChange={(e) => checkVideoUrl(e.target.value)}
            />
            <button className={styles.add__video__btn}>+</button>
          </div>
          <div className={styles.buttons__wrap}>
            <button
              className={`${styles.button__video} ${styles.accept__btn}`}
              disabled={!isCorrectUrl}
              onClick={addVideo}
            >
              Вставить
            </button>
            <button
              className={`${styles.button__video} ${styles.cancell__btn}`}
              onClick={() =>
                setAddVideoData((prev) => ({
                  isPopupOpen: false,
                  ...prev.playerData,
                }))
              }
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default UrlPopup;
