import { Pagination } from "antd";
import GistCard from "../../components/gist-card/GistCard";
import styles from "./GridLayout.module.scss";

interface GridLayoutProps {
  gists: any[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const GridLayout = ({ gists, currentPage, onPageChange }: GridLayoutProps) => {
  return (
    <>
      <div className={styles.gistCards}>
        {gists.map((gist, i) => (
          <GistCard key={i} gistId={gist.id} />
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
