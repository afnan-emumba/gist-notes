import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Avatar } from "antd";
import { RootState } from "../../redux/store";
import CodePreview from "../code-preview/CodePreview";
import { StarEmpty, StarFilled, ForkEmpty } from "../../assets/icons";
import { starGist, checkGistStarred } from "../../services/gistService";
import styles from "./GistCard.module.scss";

interface GistCardProps {
  gistId: string;
}

const GistCard = ({ gistId }: GistCardProps) => {
  const gist = useSelector((state: RootState) =>
    state.publicGists.gists.find((gist) => gist.id === gistId)
  );
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    await starGist(gistId);
    setIsStarred(true);
    toast.success("Gist starred successfully!");
  };

  return (
    <div className={styles.gistCard}>
      <div className={styles.fileContent}>
        {error ? (
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
              {gist.owner.login.length > 10
                ? `${gist.owner.login.substring(0, 10)}...`
                : gist.owner.login}{" "}
              /{" "}
              <strong>
                {firstFile.filename.length > 10
                  ? `${firstFile.filename.substring(0, 10)}...`
                  : firstFile.filename}
              </strong>
            </h4>

            <p>Created {new Date(gist.created_at).toLocaleDateString()}</p>

            <p>
              {gist.description && gist.description.length > 30
                ? `${gist.description.substring(0, 30)}...`
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

export default GistCard;
