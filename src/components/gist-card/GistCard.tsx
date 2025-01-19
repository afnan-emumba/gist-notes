import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar } from "antd";
import { RootState } from "../../redux/store";
import CodePreview from "../code-preview/CodePreview";
import {
  StarEmpty,
  // StarFilled,
  ForkEmpty,
  // ForkFilled,
} from "../../assets/icons";
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
                : gist.owner.login} /{" "}
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
          <StarEmpty />
          <ForkEmpty />
        </div>
      </div>
    </div>
  );
};

export default GistCard;
