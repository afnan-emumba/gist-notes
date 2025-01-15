import styles from "./GistCard.module.scss";

interface GistCardProps {
  gist: any;
}

const GistCard = ({ gist }: GistCardProps) => {
  return <div className={styles.gistCard}>{gist.url}</div>;
};

export default GistCard;
