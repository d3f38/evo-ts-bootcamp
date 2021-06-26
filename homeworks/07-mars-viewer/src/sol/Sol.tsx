import React, { useState } from "react";
import cn from "classnames";
import { useAppSelector } from "../app/hooks";
import { selectPhotos, selectStatus, selectFavourites } from "./solSlice";
import styles from "./Sol.module.css";
import { Controls } from "./components/Controls";
import { Gallery } from "./components/Gallery";
import { Favourites } from "./components/Favourites";

export const Sol = () => {
  const loadedPhotos = useAppSelector(selectPhotos);
  const currentStatus = useAppSelector(selectStatus);
  const favourites = useAppSelector(selectFavourites);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={cn(styles.tab, { [styles.active]: activeTab === 0 })}
          onClick={() => setActiveTab(0)}
        >
          Photos
        </button>
        <button
          className={cn(styles.tab, { [styles.active]: activeTab === 1 })}
          onClick={() => setActiveTab(1)}
        >
          Favourites
        </button>
      </div>

      {activeTab === 0 ? (
        <>
          <Controls />
          <Gallery status={currentStatus} photos={loadedPhotos} />
        </>
      ) : (
        <Favourites favourites={favourites} />
      )}
    </div>
  );
};
