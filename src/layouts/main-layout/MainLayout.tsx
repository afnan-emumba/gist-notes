import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className={styles.mainContent}>{children || <Outlet />}</div>
    </div>
  );
};

export default MainLayout;
