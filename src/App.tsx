import { ConfigProvider, Button } from "antd";
import { antTheme } from "./theme/theme";
import "./App.css";

function App() {
  return (
    <ConfigProvider theme={antTheme}>
      <Button type='primary'>Hello</Button>
    </ConfigProvider>
  );
}

export default App;
