import clsx from "clsx";

import styles from "./mapscontroller.module.scss";

const MapsController = ({
  map,
  mapName,
  secondClass,
  selectMap,
  thirdClass,
}) => {
  return (
    <div
      className={clsx(
        styles.map,
        styles[mapName],
        styles[secondClass],
        styles[thirdClass]
      )}
      onClick={() => selectMap(mapName)}
    >
      <p className={styles.map__name}>{map}</p>
    </div>
  );
};
export default MapsController;
