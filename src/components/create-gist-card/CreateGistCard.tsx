import { Card, Input } from "antd";
import { useState } from "react";
import { DeleteIcon } from "../../assets/icons";
import styles from "./CreateGistCard.module.scss";

const { TextArea } = Input;

interface CreateGistCardProps {
  showDeleteIcon: boolean;
  onDelete: () => void;
  fileName?: string;
  fileContent?: string;
  onFileNameChange?: (fileName: string) => void;
  onFileContentChange?: (fileContent: string) => void;
}

const CreateGistCard = ({
  showDeleteIcon,
  onDelete,
  fileName,
  fileContent,
  onFileNameChange,
  onFileContentChange,
}: CreateGistCardProps) => {
  const [fileNameState, setFileNameState] = useState(fileName || "");
  const [fileContentState, setFileContentState] = useState(fileContent || "");

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileNameState(e.target.value);
    if (onFileNameChange) {
      onFileNameChange(e.target.value);
    }
  };

  const handleFileContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFileContentState(e.target.value);
    if (onFileContentChange) {
      onFileContentChange(e.target.value);
    }
  };

  const cardHeader = () => {
    return (
      <div className={styles.cardHeader}>
        <Input
          placeholder='File name including extension...'
          className={styles.inputFilename}
          value={fileNameState}
          onChange={handleFileNameChange}
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
        value={fileContentState}
        onChange={handleFileContentChange}
        placeholder='Enter file content here...'
        className={styles.textArea}
        rows={10}
        autoSize={{ minRows: 10 }}
      />
    </Card>
  );
};

export default CreateGistCard;
