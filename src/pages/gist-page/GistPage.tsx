import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RootState } from "../../redux/store";
import { Button } from "antd";
import CodePreview from "../../components/code-preview/CodePreview";
import styles from "./GistPage.module.scss";
import axios from "axios";

const GistPage = () => {
  const { gistId } = useParams<{ gistId: string }>();
  const gist = useSelector((state: RootState) =>
    state.publicGists.gists.find((gist) => gist.id === gistId)
  );
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!gist) {
    return <p>Gist not found</p>;
  }

  const firstFileKey = Object.keys(gist.files)[0];
  const firstFile = gist.files[firstFileKey];
  const rawUrl = firstFile.raw_url;

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(rawUrl);
        setFileContent(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchFileContent();
  }, [rawUrl]);

  return (
    <>
      <Helmet>
        <title>Gist Details</title>
      </Helmet>

      <div className={styles.gistPage}>
        <div className={styles.header}>
          <div className={styles.ownerInfo}>
            <img
              src={gist.owner.avatar_url}
              alt='Owner Avatar'
              className={styles.avatar}
            />
            <div>
              <h3>{gist.owner.login}</h3>
              <h3>{gist.description || "No description available"}</h3>
              <p>
                Created at: {new Date(gist.created_at).toLocaleDateString()}
              </p>
              <p>File: {firstFile.filename}</p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button type='primary'>Fork</Button>
            <Button type='default'>Star</Button>
          </div>
        </div>
        <div className={styles.fileContent}>
          {error ? (
            <p>Error: {error}</p>
          ) : fileContent ? (
            <CodePreview content={fileContent} />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GistPage;
