import { GridIcon, ListIcon } from "../../assets/icons";
import styles from "./LandingPage.module.scss";
import { useState } from "react";

const LandingPage = () => {
  const [selectedView, setSelectedView] = useState("list");

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>Public Gists</h1>
        <div className={styles.toggleButtonGroup}>
          <button
            className={`${styles.button} ${
              selectedView === "grid" ? styles.buttonActive : ""
            }`}
            onClick={() => setSelectedView("grid")}
          >
            <GridIcon />
          </button>
          <button
            className={`${styles.button} ${
              selectedView === "list" ? styles.buttonActive : ""
            }`}
            onClick={() => setSelectedView("list")}
          >
            <ListIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
