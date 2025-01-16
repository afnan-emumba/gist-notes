import { Table, Pagination } from "antd";
import tableColumns from "../../pages/landing-page/TableColumns";
import styles from "./ListLayout.module.scss";

interface ListLayoutProps {
  gists: any[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ListLayout = ({ gists, currentPage, onPageChange }: ListLayoutProps) => {
  return (
    <Table
      columns={tableColumns}
      dataSource={gists}
      className={styles.table}
      pagination={false}
      footer={() => (
        <Pagination
          simple
          align='end'
          defaultCurrent={1}
          current={currentPage}
          total={300}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      )}
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        tableLayout: "fixed",
        wordWrap: "break-word",
      }}
    />
  );
};

export default ListLayout;
