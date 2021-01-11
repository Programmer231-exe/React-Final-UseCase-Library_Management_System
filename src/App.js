import LibraryManagementSystem from "./Components/LibraryManagementSystem";
import './App.css';
import {Provider} from "react-redux";
import dataStore from "./store";

function App() {
  return (
      <Provider store = {dataStore}>
      <LibraryManagementSystem />
      </Provider>
  );
}

export default App;
