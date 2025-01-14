import { useState } from "react";
import { Helmet } from "react-helmet";
import { Table, Pagination } from "antd";
import { GridIcon, ListIcon } from "../../assets/icons";
import tableColumns from "./TableColumns";
import GistCard from "../../components/gist-card/GistCard";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const [selectedView, setSelectedView] = useState("list");

  const pagination = (
    <Pagination simple align='end' defaultCurrent={2} total={50} />
  );

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
        {selectedView === "grid" ? (
          <>
            <div className={styles.gistCards}>
              {[...Array(6)].map((_, i) => (
                <GistCard key={i} />
              ))}
            </div>
            {pagination}
          </>
        ) : (
          <Table
            columns={tableColumns}
            dataSource={[]}
            className={styles.table}
            bordered
            footer={() => pagination}
          />
        )}
      </div>
    </>
  );
};

export default LandingPage;
