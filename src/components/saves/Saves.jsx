import { useState } from "react";
import { NavLink } from "react-router-dom";

import Folder from "../folder/Folder";
import Button from "../button/Button";
import Map from "../maps/Map";

import folderImg from "../../img/icons/Union.svg";
import folderCreate from "../../img/icons/sozdat_papku.svg";

import styles from "./saves.module.scss";
import FolderPopup from "../folder-popup/FolderPopup";

const Saves = () => {
  const [showFolderPopup, setShowFolderPopup] = useState(false);
  
  return (
    <>
      {showFolderPopup && <FolderPopup />}
      <div className={styles.saves__wrapper}>
        <section className={styles.saves}>
          <div className={styles.folders}>
            <Folder
              folderImage={folderCreate}
              folderName="Создать папку"
              onClick={() => setShowFolderPopup(true)}
            />
            {/* <Folder folderImage={folderImg} folderName="Название папки" /> */}
          </div>
          <div className={styles.schemes}>
            <div className={styles.folders__mobile}>
              <div className={styles.folder__wrap}>
                <Folder folderImage={folderCreate} folderName="Создать папку" />
                {/* <Folder folderImage={folderImg} folderName="Название папки" /> */}
                {/* <Folder folderImage={folderImg} folderName="Название папки"  /> */}
              </div>
              <div className={styles.folder__wrap}>
                {/* <Folder folderImage={folderImg} folderName="Название папки"  />
             <Folder folderImage={folderImg} folderName="Название папки" />
             <Folder folderImage={folderImg} folderName="Название папки"  /> */}
              </div>
            </div>
            <div className={styles.folder__way}></div>
            <div className={styles.saves__filter}>
              <button className={styles.filter__button}>Стратегии</button>
              <button
                className={`${styles.filter__button} ${styles.grenades__filter}`}
              >
                Раскидки
              </button>
            </div>

            <div className={styles.maps}>
              {" "}
              {/* Если карт нет то в css ставшиь display: flex, если карты есть то display grid */}
              {/* <div className={styles.none__maps}>
               <p className={styles.none__info}>Стратегии отсутствуют</p>
               <NavLink to="/strategy" className={styles.none__button}>Создать</NavLink>
            </div> */}
              <Map
                mapName="Province"
                mapBackground={styles.province__background}
                strategyName="Test #1"
              />
              <Map
                mapName="Rust"
                mapBackground={styles.rust__background}
                strategyName="Test #2"
              />
              <Map
                mapName="Sandstone"
                mapBackground={styles.sandstone__background}
                strategyName="Test #3"
              />
              <Map
                mapName="Breeze"
                mapBackground={styles.breeze__background}
                strategyName="Test #4"
              />
              <Map
                mapName="Sakura"
                mapBackground={styles.sakura__background}
                strategyName="Test #5"
              />
              <Map
                mapName="Dune"
                mapBackground={styles.dune__background}
                strategyName="Test #6"
              />
            </div>
            <div className={styles.show__wrapper}>
              <button className={styles.show__more}>Показать больше</button>
              {/* этот блок показывается если карт больше 5 */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Saves;
