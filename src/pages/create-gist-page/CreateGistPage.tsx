import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button, Input } from "antd";
import CreateGistCard from "../../components/create-gist-card/CreateGistCard";
import styles from "./CreateGistPage.module.scss";

const CreateGistPage = () => {
  const [cards, setCards] = useState([
    <CreateGistCard key={0} showDeleteIcon={false} onDelete={() => {}} />,
  ]);

  const addCard = () => {
    setCards([
      ...cards,
      <CreateGistCard key={cards.length} showDeleteIcon={true} onDelete={() => removeCard(cards.length)} />,
    ]);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
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
          <Input placeholder='Gist description...' />
          <div className={styles.cardsContainer}>
            {cards.map((card, index) =>
              React.cloneElement(card, { showDeleteIcon: cards.length > 1, onDelete: () => removeCard(index) })
            )}
          </div>
          <div className={styles.buttonsContainer}>
            <Button onClick={addCard}>Add File</Button>
            <Button type='primary'>Create Gist</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGistPage;
