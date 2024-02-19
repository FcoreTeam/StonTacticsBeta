import { memo, useEffect, useState } from "react";
import clsx from "clsx";

import bomb from "../../img/icons/grenade_map.svg";

import styles from "./grenades-group.module.scss";

import smokeMap from "../../img/icons/smoke_map.svg";
import grenadeMap from "../../img/icons/grenade_map.svg";
import molotovMap from "../../img/icons/molotov_map.svg";
import flashbang from "../../img/icons/flash_map.svg";

const elementImages = {
  flashbang: flashbang,
  smoke: smokeMap,
  grenade: grenadeMap,
  molotov: molotovMap,
};

const GrenadesGroup = ({ canvasWrapperRef, bombGroup, setBombGroup }) => {
  const [leftTop, setLeftTop] = useState();

  useEffect(() => {
    if (!!canvasWrapperRef.current) {
      const { left, top } = canvasWrapperRef.current.getBoundingClientRect();
      setLeftTop({ left, top });
    }
  }, [canvasWrapperRef]);

  const elements = Array.from({ length: bombGroup?.count }, (_, index) => (
    <img src={elementImages[bombGroup.name]} alt="" />
  ));

  return (
    <div
      style={{
        top: leftTop?.top + bombGroup?.y + 290,
        left: leftTop?.left + bombGroup?.x + 370,
        opacity: bombGroup.name !== null ? 1 : 0,
        pointerEvents: bombGroup.name !== null ? "auto" : "none",
      }}
      className={clsx(styles.wrapper, "flex-column")}
      // className={clsx(styles.wrapper, bombGroup.name !== null && styles.active, "flex-column")}
    >
      <div
        className={styles.bomb}
        onClick={() =>
          setBombGroup({
            name: null,
            count: null,
            x: null,
            y: null,
          })
        }
      ></div>
      <div className={styles.line}></div>
      <div className={clsx(styles.bombs, "flex-center")}>{elements}</div>
    </div>
  );
};

export default memo(GrenadesGroup);
