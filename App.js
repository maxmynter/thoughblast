import { Provider } from "react-redux";
import { NativeRouter } from "react-router-native";
import store from "./src/redux/store";
import Main from "./src/Main";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <NativeRouter>
          <Main />
        </NativeRouter>
      </Provider>
    </>
  );
};
export default App;
