import React from "react";
import { PhotoData, Status } from "../solSlice";
import styles from "../Sol.module.css";
import { Heart } from "./Heart";

export const Gallery: React.FC<{
  status: Status;
  photos: PhotoData[] | null;
}> = React.memo(({ status, photos }) => {
  return (
    <div className={styles.photos}>
      {status === "loading" ? (
        <div>LOADING...</div>
      ) : (
        <>
          {photos && photos.length ? (
            photos.map((item) => (
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
            ))
          ) : (
            <p>PHOTOS NOT FOUND :(</p>
          )}
        </>
      )}
    </div>
  );
});
