import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getPhotos, Rover } from "../solSlice";
import styles from "../Sol.module.css";

export const Controls = () => {
  const dispatch = useAppDispatch();
  const [sol, setSol] = useState(0);
  const [selectedRover, setSelectedRover] = useState<Rover>("curiosity");

  const handleChangeSol = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const numberValue = Number(target.value);

    if (numberValue >= 0) {
      setSol(numberValue);
    } else {
      setSol(0);
    }
  };

  return (
    <div className={styles.controls}>
      <p>Select Sol and press "LOAD"!</p>
      <input
        className={styles.input}
        aria-label="Select sol"
        value={sol}
        type="number"
        onChange={handleChangeSol}
      />
      <select
        className={styles.select}
        onChange={(e) => setSelectedRover(e.target.value as Rover)}
      >
        <option value="curiosity">Curiosity</option>
        <option value="opportunity">Opportunity</option>
        <option value="spirit">Spirit</option>
      </select>
      <button
        className={styles.button}
        onClick={() => dispatch(getPhotos({ sol, rover: selectedRover }))}
      >
        load
      </button>
    </div>
  );
};
