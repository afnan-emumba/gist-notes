export const antTheme = {
  token: {
    colorPrimary: "#003B44",
    colorInfo: "#7539ff",
    colorSuccess: "#08b461",
    colorWarning: "#f7bb43",
    colorError: "#E30000",
    borderRadius: 4,
  },
  components: {
    Button: {
      paddingBlock: 12,
      paddingInline: 24,
      defaultShadow: "none",
      primaryShadow: "none",
      dangerShadow: "none",
    },
    Table: {
      borderColor: "#efefef",
      rowHoverBg: "#efefef",
      headerBg: "#efefef",
      footerBg: "#efefef",
      headerSplitColor: "none",
      cellPaddingBlock: 14,
      headerBorderRadius: 8,
      columnWidth: {
        owner: 150,
        files: 300,
        description: 150,
        updated_at: 150,
        actions: 100,
      },
    },
    Pagination: {
      itemActiveBg: "#003B44",
      itemActiveColor: "#fff",
      itemSize: 32,
      itemMarginInline: 8,
      itemBorderRadius: 4,
      itemHoverBg: "#e3e3e3",
      itemHoverColor: "#003B44",
    },
    Dropdown: {
      colorText: "#003B44",
    },
  },
};
