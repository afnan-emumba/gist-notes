import styles from "./LandingPage.module.scss";
import { antTheme } from "../../theme/theme";
import { StarEmpty, ForkEmpty } from "../../assets/icons";

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
    render: () => (
      <div style={{ display: "flex", gap: "8px" }}>
        <StarEmpty />
        <ForkEmpty />
      </div>
    ),
  },
];

export default tableColumns;
