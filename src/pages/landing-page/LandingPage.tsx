import { useState } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import { GridIcon, ListIcon } from "../../assets/icons";
import tableColumns from "./TableColumns";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const [selectedView, setSelectedView] = useState("list");

  return (
    <>
      <Helmet>
        <title>Public Gists</title>
      </Helmet>

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

        <Table
          columns={tableColumns}
          dataSource={[]}
          footer={() => "Footer"}
          className={styles.table}
          bordered
        />
      </div>
    </>
  );
};

export default LandingPage;
