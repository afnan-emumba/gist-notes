import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Skeleton } from "antd";
import { GridIcon, ListIcon } from "../../assets/icons";
import { RootState, AppDispatch } from "../../redux/store";
import { getPublicGists } from "../../redux/slices/publicGistsSlice";
import GridLayout from "../../layouts/grid-layout/GridLayout";
import ListLayout from "../../layouts/list-layout/ListLayout";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const [selectedView, setSelectedView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { gists, loading, error } = useSelector(
    (state: RootState) => state.publicGists
  );

  const token = import.meta.env.VITE_GITHUB_TOKEN as string;

  useEffect(() => {
    if (token) {
      const perPage = selectedView === "grid" ? 6 : 10;
      dispatch(getPublicGists({ page: currentPage, perPage, token }));
    }
  }, [dispatch, currentPage, token, selectedView]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <Skeleton active />
        ) : error ? (
          <p>Error: {error}</p>
        ) : selectedView === "grid" ? (
          <GridLayout
            gists={gists}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <ListLayout
            gists={gists}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default LandingPage;
