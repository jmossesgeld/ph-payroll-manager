import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

const PhPayrollManager = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<PhPayrollManager />, document.getElementById("root"));

export default PhPayrollManager;
