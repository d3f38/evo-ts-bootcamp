import React from "react";
import cn from "classnames";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectFavourites,
  addToFavourites,
  removeFromFavourites,
  PhotoData,
} from "../solSlice";
import styles from "../Sol.module.css";

export const Heart: React.FC<{ photoData: PhotoData }> = ({ photoData }) => {
  const favourites = useAppSelector(selectFavourites);

  const dispatch = useAppDispatch();

  const inFavourites = (photo: PhotoData) =>
    favourites.some((item) => item.id === photo.id);

  return (
    <button
      className={cn(styles.heart, {
        [styles.favourite]: inFavourites(photoData),
      })}
      onClick={() =>
        inFavourites(photoData)
          ? dispatch(removeFromFavourites(photoData))
          : dispatch(addToFavourites(photoData))
      }
    />
  );
};
