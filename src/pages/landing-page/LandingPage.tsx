import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Table, Pagination } from "antd";
import { GridIcon, ListIcon } from "../../assets/icons";
import tableColumns from "./TableColumns";
import GistCard from "../../components/gist-card/GistCard";
import { RootState, AppDispatch } from "../../redux/store";
import { getPublicGists } from "../../redux/slices/publicGistsSlice";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const [selectedView, setSelectedView] = useState("list");
  const dispatch = useDispatch<AppDispatch>();
  const { gists, loading, error } = useSelector(
    (state: RootState) => state.publicGists
  );

  useEffect(() => {
    dispatch(getPublicGists());
  }, [dispatch]);

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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : selectedView === "grid" ? (
          <>
            <div className={styles.gistCards}>
              {gists.map((gist, i) => (
                <GistCard key={i} gist={gist} />
              ))}
            </div>
            {pagination}
          </>
        ) : (
          <Table
            columns={tableColumns}
            dataSource={gists}
            className={styles.table}
            footer={() => pagination}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
            }}
          />
        )}
      </div>
    </>
  );
};

export default LandingPage;
