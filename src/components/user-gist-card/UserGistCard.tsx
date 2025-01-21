import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Avatar, Skeleton } from "antd";
import { RootState } from "../../redux/store";
import CodePreview from "../code-preview/CodePreview";
import { StarEmpty, StarFilled, ForkEmpty } from "../../assets/icons";
import { starGist, checkGistStarred, unstarGist } from "../../services/gistService";
import styles from "./UserGistCard.module.scss";

interface UserGistCardProps {
  gistId: string;
  isStarredGist: boolean;
}

const UserGistCard = ({ gistId, isStarredGist }: UserGistCardProps) => {
  const gist = useSelector((state: RootState) =>
    isStarredGist
      ? state.starredGists.gists.find((gist) => gist.id === gistId)
      : state.userGists.gists.find((gist) => gist.id === gistId)
  );
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isStarred, setIsStarred] = useState<boolean>(false);

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
      } finally {
        setLoading(false);
      }
    };

    const checkStarredStatus = async () => {
      const starred = await checkGistStarred(gistId);
      setIsStarred(starred);
    };

    fetchFileContent();
    checkStarredStatus();
  }, [rawUrl, gistId]);

  const handleStarClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to star a gist.");
      return;
    }
    if (isStarred) {
      await unstarGist(gistId);
      setIsStarred(false);
      toast.success("Gist unstarred successfully!");
    } else {
      await starGist(gistId);
      setIsStarred(true);
      toast.success("Gist starred successfully!");
    }
  };

  return (
    <div className={styles.gistCard}>
      <div className={styles.fileContent}>
        {loading ? (
          <Skeleton active />
        ) : error ? (
          <p>Error: {error}</p>
        ) : fileContent ? (
          <CodePreview
            content={fileContent}
            numOfLines={10}
            language={firstFile.language}
          />
        ) : (
          <p>No content available</p>
        )}
      </div>
      <div className={styles.cardFooter}>
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
              {gist.owner.login.length > 20
                ? `${gist.owner.login.substring(0, 20)}...`
                : gist.owner.login}{" "}
              /{" "}
              <strong>
                {firstFile.filename.length > 30
                  ? `${firstFile.filename.substring(0, 30)}...`
                  : firstFile.filename}
              </strong>
            </h4>

            <p>Created {new Date(gist.created_at).toLocaleDateString()}</p>

            <p>
              {gist.description && gist.description.length > 50
                ? `${gist.description.substring(0, 50)}...`
                : gist.description || "No description available"}
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <ForkEmpty />
          {isStarred ? (
            <div>
              <StarFilled />
            </div>
          ) : (
            <div onClick={handleStarClick}>
              <StarEmpty />
            </div>
          )}
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
};

export default UserGistCard;
