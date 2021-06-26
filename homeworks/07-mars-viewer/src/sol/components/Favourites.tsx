import React from "react";
import { PhotoData } from "../solSlice";
import styles from "../Sol.module.css";
import { Heart } from "./Heart";

export const Favourites: React.FC<{ favourites: PhotoData[] }> = React.memo(
  ({ favourites }) => {
    return (
      <div className={styles.photos}>
        {favourites.map((item) => (
          <div className={styles.photo} key={item.id}>
            <Heart photoData={item} />
            <img
              className={styles.image}
              src={item.img_src}
              alt={item.earth_date}
            />
            <div className={styles.description}>
              Rover: {item.rover.name}
              <br />
              Camera: {item.camera.name}
            </div>
          </div>
        ))}
      </div>
    );
  }
);
