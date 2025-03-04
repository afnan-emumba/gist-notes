import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { Button, Avatar, Pagination, Skeleton } from "antd";
import { RootState, AppDispatch } from "../../redux/store";
import { getStarredGists } from "../../redux/slices/starredGistsSlice";
import styles from "./StarredGistsPage.module.scss";
import UserGistCard from "../../components/user-gist-card/UserGistCard";

const StarredGistsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { gists, loading, error } = useSelector(
    (state: RootState) => state.starredGists
  );
  console.log("Starred Gists Page Mounted", gists);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const gistsPerPage = 2;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastGist = currentPage * gistsPerPage;
  const indexOfFirstGist = indexOfLastGist - gistsPerPage;
  const currentGists = gists.slice(indexOfFirstGist, indexOfLastGist);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(getStarredGists(token));
      }
    }
  }, [dispatch, user]);

  const handleCardClick = (gistId: string) => {
    navigate(`/gists/${gistId}`);
  };

  return (
    <>
      <Helmet>
        <title>Starred Gists</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.userDetails}>
          {user && (
            <>
              <Avatar src={user.photoUrl} alt='User Profile' size={264} />
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "400",
                }}
              >
                {user.displayName}
              </h2>
              <Link
                to={`https://github.com/${user.screenName}`}
                target='_blank'
              >
                <Button type='primary'>View GitHub Profile</Button>
              </Link>
            </>
          )}
        </div>
        <div className={styles.gists}>
          <div className={styles.heading}>
            <h1>Starred Gists</h1>
            <div className={styles.gistCount}>{gists.length}</div>
          </div>
          <div className={styles.gistCards}>
            {loading ? (
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 5, width: "100%" }}
              />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              currentGists.map((gist, i) => (
                <div
                  key={i}
                  onClick={() => handleCardClick(gist.id)}
                  style={{ cursor: "pointer" }}
                >
                  <UserGistCard key={i} gistId={gist.id} isStarredGist={true} />
                </div>
              ))
            )}
          </div>
          <Pagination
            current={currentPage}
            simple
            pageSize={gistsPerPage}
            total={gists.length}
            onChange={handlePageChange}
            align='end'
          />
        </div>
      </div>
    </>
  );
};

export default StarredGistsPage;
