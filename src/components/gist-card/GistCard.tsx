import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./GistCard.module.scss";
import CodePreview from "../code-preview/CodePreview";

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
        const response = await fetch(rawUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch file content: ${response.statusText}`
          );
        }

        const text = await response.text();
        setFileContent(text);
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
          <CodePreview content={fileContent} />
        ) : (
          <p>No content available</p>
        )}
      </div>
      <div className={styles.description}>
        <p>{gist.description || "No description available"}</p>
      </div>
    </div>
  );
};

export default GistCard;
