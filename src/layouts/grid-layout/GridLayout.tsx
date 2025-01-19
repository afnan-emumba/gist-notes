import { Pagination } from "antd";
import GistCard from "../../components/gist-card/GistCard";
import styles from "./GridLayout.module.scss";
import { useNavigate } from "react-router-dom";

interface GridLayoutProps {
  gists: any[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const GridLayout = ({ gists, currentPage, onPageChange }: GridLayoutProps) => {
  const navigate = useNavigate();

  const handleCardClick = (gistId: string) => {
    navigate(`/gists/${gistId}`);
  };

  return (
    <>
      <div className={styles.gistCards}>
        {gists.map((gist, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(gist.id)}
            style={{ cursor: "pointer" }}
          >
            <GistCard gistId={gist.id} />
          </div>
        ))}
      </div>

      <Pagination
        simple
        align='end'
        defaultCurrent={1}
        current={currentPage}
        total={500}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </>
  );
};

export default GridLayout;
