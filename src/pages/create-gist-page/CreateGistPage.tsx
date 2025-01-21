import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button, Input } from "antd";
import toast, { Toaster } from "react-hot-toast";
import CreateGistCard from "../../components/create-gist-card/CreateGistCard";
import styles from "./CreateGistPage.module.scss";
import { createGist } from "../../services/gistService";

const CreateGistPage = () => {
  const [cards, setCards] = useState([
    <CreateGistCard key={0} showDeleteIcon={false} onDelete={() => {}} />,
  ]);
  const [description, setDescription] = useState("");

  const addCard = () => {
    setCards([
      ...cards,
      <CreateGistCard
        key={cards.length}
        showDeleteIcon={true}
        onDelete={() => removeCard(cards.length)}
      />,
    ]);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCreateGist = async () => {
    const files = cards.reduce(
      (acc: { [key: string]: { content: string } }, card) => {
        const fileName = card.props.fileName;
        const fileContent = card.props.fileContent;
        if (fileName && fileContent) {
          acc[fileName] = { content: fileContent };
        }
        return acc;
      },
      {}
    );

    if (Object.keys(files).length === 0) {
      toast.error("Please add at least one file with content.");
      return;
    }

    try {
      await createGist(description, files);
      toast.success("Gist created successfully!");
      setDescription("");
      setCards([
        <CreateGistCard key={0} showDeleteIcon={false} onDelete={() => {}} />,
      ]);
    } catch (error) {
      console.error("Error creating gist:", error);
      toast.error("Failed to create gist.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Gist</title>
      </Helmet>

      <div className={styles.heading}>
        <h1>Create Gist</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles.conatiner}>
          <Input
            placeholder='Gist description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.cardsContainer}>
            {cards.map((card, index) =>
              React.cloneElement(card, {
                showDeleteIcon: cards.length > 1,
                onDelete: () => removeCard(index),
                fileName: card.props.fileName,
                fileContent: card.props.fileContent,
                onFileNameChange: (fileName: string) => {
                  const newCards = [...cards];
                  newCards[index] = React.cloneElement(card, { fileName });
                  setCards(newCards);
                },
                onFileContentChange: (fileContent: string) => {
                  const newCards = [...cards];
                  newCards[index] = React.cloneElement(card, { fileContent });
                  setCards(newCards);
                },
              })
            )}
          </div>
          <div className={styles.buttonsContainer}>
            <Button onClick={addCard}>Add File</Button>
            <Button type='primary' onClick={handleCreateGist}>
              Create Gist
            </Button>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default CreateGistPage;
