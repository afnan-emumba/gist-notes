import { ConfigProvider } from "antd";
import { antTheme } from "./theme/theme";
import Navbar from "./components/navbar/Navbar";
import "./App.css";

function App() {
  return (
    <ConfigProvider theme={antTheme}>
      <Navbar />
    </ConfigProvider>
  );
}

export default App;
