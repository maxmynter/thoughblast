import { Provider } from "react-redux";
import { NativeRouter } from "react-router-native";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./src/Main";

const App = () => {
  return (
    <>
      <NativeRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Main />
          </PersistGate>
        </Provider>
      </NativeRouter>
    </>
  );
};
export default App;
