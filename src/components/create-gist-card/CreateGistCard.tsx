import { Card, Input } from "antd";
import { useState } from "react";
import { DeleteIcon } from "../../assets/icons";
import styles from "./CreateGistCard.module.scss";

const { TextArea } = Input;

interface CreateGistCardProps {
  showDeleteIcon: boolean;
  onDelete: () => void;
}

const CreateGistCard = ({ showDeleteIcon, onDelete }: CreateGistCardProps) => {
  const [fileContent, setFileContent] = useState("");

  const cardHeader = () => {
    return (
      <div className={styles.cardHeader}>
        <Input
          placeholder='File name including extension...'
          className={styles.inputFilename}
        />
        {showDeleteIcon && (
          <div onClick={onDelete} style={{ cursor: "pointer" }}>
            <DeleteIcon />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={styles.card} title={cardHeader()}>
      <TextArea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        placeholder='Enter file content here...'
        className={styles.textArea}
        rows={10}
        autoSize={{ minRows: 10 }}
      />
    </Card>
  );
};

export default CreateGistCard;
