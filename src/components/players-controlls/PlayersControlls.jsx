import styles from "./playerscontrolls.module.scss";

import Button from "../button/Button";

import personOneYellow from "../../img/icons/person_1_yellow.svg";
import personTwoYellow from "../../img/icons/person_2_yellow.svg";
import personThreeYellow from "../../img/icons/person_3_yellow.svg";
import personFourYellow from "../../img/icons/person_4_yellow.svg";
import personFiveYellow from "../../img/icons/person_5_yellow.svg";
import flashbang from "../../img/icons/Флешка.svg";
import smoke from "../../img/icons/дым.svg";
import he from "../../img/icons/Граната.svg";
import molotov from "../../img/icons/Subtract-10.svg";
import personOneBlue from "../../img/icons/person_1_blue.svg";
import personTwoBlue from "../../img/icons/person_2_blue.svg";
import personThreeBlue from "../../img/icons/person_3_blue.svg";
import personFourBlue from "../../img/icons/person_4_blue.svg";
import personFiveBlue from "../../img/icons/person_5_blue.svg";

const PlayersControlls = () => {
  return (
    <section className={styles.players__controlls}>
      <div className={styles.first__team}>
        <Button secondClass={styles.player__button} ico={personOneYellow} />
        <Button secondClass={styles.player__button} ico={personTwoYellow} />
        <Button secondClass={styles.player__button} ico={personThreeYellow} />
        <Button secondClass={styles.player__button} ico={personFourYellow} />
        <Button secondClass={styles.player__button} ico={personFiveYellow} />
      </div>
      <div className={styles.grenades}>
        <Button secondClass={styles.player__button} ico={flashbang} />
        <Button secondClass={styles.player__button} ico={smoke} />
        <Button secondClass={styles.player__button} ico={he} />
        <Button secondClass={styles.player__button} ico={molotov} />
      </div>
      <div className={styles.second__team}>
        <Button secondClass={styles.player__button} ico={personOneBlue} />
        <Button secondClass={styles.player__button} ico={personTwoBlue} />
        <Button secondClass={styles.player__button} ico={personThreeBlue} />
        <Button secondClass={styles.player__button} ico={personFourBlue} />
        <Button secondClass={styles.player__button} ico={personFiveBlue} />
      </div>
    </section>
  );
};
export default PlayersControlls;
