import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Avatar, Skeleton } from "antd";
import { Star2, Fork2, Star2Filled } from "../../assets/icons";
import CodePreview from "../../components/code-preview/CodePreview";
import styles from "./GistPage.module.scss";
import {
  starGist,
  checkGistStarred,
  unstarGist,
  forkGist,
  getGistDetails,
  getGistForksCount,
} from "../../services/gistService";
import toast, { Toaster } from "react-hot-toast";

const GistPage = () => {
  const { gistId } = useParams<{ gistId: string }>();
  const [gist, setGist] = useState<any>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [forksCount, setForksCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Gist Page Mounted", gistId);
    const fetchGistDetails = async () => {
      try {
        if (gistId) {
          const gistData = await getGistDetails(gistId);
          setGist(gistData);
          const firstFileKey = Object.keys(gistData.files)[0];
          const firstFile = gistData.files[firstFileKey];
          const response = await axios.get(firstFile.raw_url);
          setFileContent(response.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    const checkStarredStatus = async () => {
      if (gistId) {
        const starred = await checkGistStarred(gistId);
        setIsStarred(starred);
      }
    };

    const fetchGistForksCount = async () => {
      if (gistId) {
        const forksCount = await getGistForksCount(gistId);
        setForksCount(forksCount);
      }
    };

    console.log("Fetching Gist Details!!");
    fetchGistDetails();
    checkStarredStatus();
    fetchGistForksCount();
  }, []);

  const handleStarClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to star a gist.");
      return;
    }
    if (gistId) {
      if (isStarred) {
        await unstarGist(gistId);
        setIsStarred(false);
        toast.success("Gist unstarred successfully!");
      } else {
        await starGist(gistId);
        setIsStarred(true);
        toast.success("Gist starred successfully!");
      }
    } else {
      toast.error("Gist ID is undefined.");
    }
  };

  const handleForkClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to fork a gist.");
      return;
    }
    if (gistId) {
      try {
        await forkGist(gistId);
        const forksCount = await getGistForksCount(gistId);
        setForksCount(forksCount);
        toast.success("Gist forked successfully!");
      } catch (err) {
        toast.error("Failed to fork the gist.");
      }
    } else {
      toast.error("Gist ID is undefined.");
    }
  };

  if (loading) {
    return (
      <Skeleton active title={false} paragraph={{ rows: 5, width: "100%" }} />
    );
  }

  if (!gist) {
    return <p>Gist not found</p>;
  }

  const firstFileKey = Object.keys(gist.files)[0];
  const firstFile = gist.files[firstFileKey];

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
            <div className={styles.actionButton}>
              <Button
                type='primary'
                className={styles.buttonWithIcon}
                onClick={handleForkClick}
              >
                <Fork2 />
                Fork
              </Button>
              <p>{forksCount}</p>
            </div>
            <div className={styles.actionButton}>
              <Button
                type='primary'
                className={styles.buttonWithIcon}
                onClick={handleStarClick}
              >
                {isStarred ? <Star2Filled /> : <Star2 />}
                {isStarred ? "Unstar" : "Star"}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.fileContent}>
          {error ? (
            <p>Error: {error}</p>
          ) : fileContent ? (
            <CodePreview content={fileContent} language={firstFile.language} />
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
