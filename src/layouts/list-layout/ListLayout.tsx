import { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { antTheme } from "../../theme/theme";
import { ForkEmpty, StarEmpty, StarFilled } from "../../assets/icons";
import { starGist, checkGistStarred, unstarGist, forkGist } from "../../services/gistService";
import { toast, Toaster } from "react-hot-toast";
import styles from "./ListLayout.module.scss";

interface ListLayoutProps {
  gists: any[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ListLayout = ({ gists, currentPage, onPageChange }: ListLayoutProps) => {
  const navigate = useNavigate();
  const [starredGists, setStarredGists] = useState<string[]>([]);

  useEffect(() => {
    const fetchStarredStatus = async () => {
      const starredStatusPromises = gists.map((gist) =>
        checkGistStarred(gist.id)
      );
      const starredStatus = await Promise.all(starredStatusPromises);
      const starredGistIds = gists
        .filter((_, index) => starredStatus[index])
        .map((gist) => gist.id);
      setStarredGists(starredGistIds);
    };

    fetchStarredStatus();
  }, [gists]);

  const handleRowClick = (record: any) => {
    navigate(`/gists/${record.id}`);
  };

  const handleStarClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    gistId: string
  ) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to star a gist.");
      return;
    }
    if (starredGists.includes(gistId)) {
      await unstarGist(gistId);
      setStarredGists((prev) => prev.filter((id) => id !== gistId));
      toast.success("Gist unstarred successfully!");
    } else {
      await starGist(gistId);
      setStarredGists((prev) => [...prev, gistId]);
      toast.success("Gist starred successfully!");
    }
  };

  const handleForkClick = async (e: React.MouseEvent<HTMLDivElement>, gistId: string) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to fork a gist.");
      return;
    }
    try {
      await forkGist(gistId);
      toast.success("Gist forked successfully!");
    } catch (err) {
      toast.error("Failed to fork the gist.");
    }
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "owner",
      key: "owner",
      width: antTheme.components.Table.columnWidth.owner,
      render: (owner: any) => (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <img
            src={owner.avatar_url}
            alt={owner.login}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {owner.login}
          </span>
        </div>
      ),
    },
    {
      title: "Notebook Name",
      dataIndex: "files",
      key: "files",
      width: antTheme.components.Table.columnWidth.files,
      render: (files: any) => {
        const notebookName = Object.keys(files)[0];
        return (
          <span className={styles.notebook}>
            {notebookName.length > 20
              ? `${notebookName.slice(0, 17)}...`
              : notebookName}
          </span>
        );
      },
    },
    {
      title: "Keyword",
      dataIndex: "description",
      key: "description",
      width: antTheme.components.Table.columnWidth.description,
      render: (description: string) => {
        const keyword = description ? description.split(" ")[0] : "None";
        return (
          <div className={styles.keywordContainer}>
            <span className={styles.keyword}>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                {keyword.length > 20 ? `${keyword.slice(0, 17)}...` : keyword}
              </p>
            </span>
          </div>
        );
      },
    },
    {
      title: "Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      width: antTheme.components.Table.columnWidth.updated_at,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: antTheme.components.Table.columnWidth.actions,
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <div onClick={(e) => handleForkClick(e, record.id)}>
            <ForkEmpty />
          </div>
          <div onClick={(e) => handleStarClick(e, record.id)}>
            {starredGists.includes(record.id) ? <StarFilled /> : <StarEmpty />}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={tableColumns}
        dataSource={gists}
        className={styles.table}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
        })}
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
      <Toaster />
    </>
  );
};

export default ListLayout;
