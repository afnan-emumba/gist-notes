import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Avatar } from "antd";
import { RootState } from "../../redux/store";
import { Star2, Fork2, StarFilled } from "../../assets/icons";
import CodePreview from "../../components/code-preview/CodePreview";
import styles from "./GistPage.module.scss";
import { starGist, checkGistStarred } from "../../services/gistService";
import toast, { Toaster } from "react-hot-toast";

const GistPage = () => {
  const { gistId } = useParams<{ gistId: string }>();
  const gist = useSelector((state: RootState) =>
    state.publicGists.gists.find((gist) => gist.id === gistId)
  );
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarred, setIsStarred] = useState<boolean>(false);

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

    const checkStarredStatus = async () => {
      if (gistId) {
        const starred = await checkGistStarred(gistId);
        setIsStarred(starred);
      }
    };

    fetchFileContent();
    checkStarredStatus();
  }, [rawUrl, gistId]);

  const handleStarClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to star a gist.");
      return;
    }
    if (gistId) {
      await starGist(gistId);
      setIsStarred(true);
      toast.success("Gist starred successfully!");
    } else {
      toast.error("Gist ID is undefined.");
    }
  };

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
            <Button type='primary' className={styles.buttonWithIcon}>
              <Fork2 />
              Fork
            </Button>
            <Button
              type='primary'
              className={styles.buttonWithIcon}
              onClick={handleStarClick}
            >
              {isStarred ? <StarFilled /> : <Star2 />}
              Star
            </Button>
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
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
};

export default GistPage;
