import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RootState } from "../../redux/store";
import { Button, Avatar } from "antd";
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
          <div className={styles.details}>
            <Avatar src={gist.owner.avatar_url} size={40} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 8,
                gap: 4,
              }}
            >
              <h4>
                {gist.owner.login.length > 40
                  ? `${gist.owner.login.substring(0, 40)}...`
                  : gist.owner.login}{" "}
                /{" "}
                <strong>
                  {firstFile.filename.length > 150
                    ? `${firstFile.filename.substring(0, 150)}...`
                    : firstFile.filename}
                </strong>
              </h4>

              <p>Created {new Date(gist.created_at).toLocaleDateString()}</p>

              <p>
                {gist.description && gist.description.length > 100
                  ? `${gist.description.substring(0, 100)}...`
                  : gist.description || "No description available"}
              </p>
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
            <CodePreview
              content={fileContent}
              numOfLines={50}
              language={firstFile.language}
            />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GistPage;
