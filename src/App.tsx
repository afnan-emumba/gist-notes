import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { antTheme } from "./theme/theme";
import MainLayout from "./layouts/main-layout/MainLayout";
import routes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider wave={{ disabled: true }} theme={antTheme}>
          <BrowserRouter>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <MainLayout>
                      <Component />
                    </MainLayout>
                  }
                />
              ))}
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
