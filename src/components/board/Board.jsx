import { useState } from "react";
import styles from "./board.module.scss";

import Button from "../button/Button";

import Canvas from "../canvas/Canvas";

// img

const Board = () => {
  return (
    <section className={styles.board}>
      <Canvas />
    </section>
  );
};
export default Board;
