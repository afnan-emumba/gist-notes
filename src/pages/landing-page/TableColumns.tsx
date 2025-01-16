import styles from "./LandingPage.module.scss";

const tableColumns = [
  {
    title: "Name",
    dataIndex: "owner",
    key: "owner",
    width: 150,
    render: (owner: any) => (
      <div style={{ display: "flex", alignItems: "center", width: "150px" }}>
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
        <span>{owner.login}</span>
      </div>
    ),
  },
  {
    title: "Notebook Name",
    dataIndex: "files",
    key: "files",
    width: 300,
    render: (files: any) => (
      <span className={styles.notebook}>{Object.keys(files)[0]}</span>
    ),
  },
  {
    title: "Keyword",
    dataIndex: "description",
    key: "description",
    width: 150,
    render: (description: string) => (
      <div className={styles.keywordContainer}>
        <span className={styles.keyword}>
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "150px",
            }}
          >
            {description ? description.split(" ")[0] : "None"}
          </p>
        </span>
      </div>
    ),
  },
  {
    title: "Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 150,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    width: 100,
    render: () => <button>View</button>,
  },
];

export default tableColumns;
