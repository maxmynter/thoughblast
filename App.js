import { Provider } from "react-redux";
import { NativeRouter } from "react-router-native";
import store from "./src/redux/store";
import Main from "./src/Main";

const App = () => {
  return (
    <>
      <NativeRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </NativeRouter>
    </>
  );
};
export default App;
