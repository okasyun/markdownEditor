import * as React from "react";
import { FC } from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
// import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import {
  HashRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Editor from "./pages/editor";
import History from "./pages/History";
import { useStateWithStorage } from "./hooks/use_state_with_storage";

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `;
const StorageKey = "/editor:text";
const Main: FC = () => {
  const [text, setText] = useStateWithStorage("", StorageKey);

  return (
    <>
      <GlobalStyle />
      {/* <Router>
      <Route exact path="/editor">
        <Editor />
      </Route>
      <Route exact path="/history">
        <History />
      </Route>
      <Redirect to="/editor" path="*" />
    </Router> */}
      <Router>
        <Routes>
          <Route
            path="/editor"
            element={<Editor text={text} setText={setText} />}
          />
          <Route path="/history" element={<History setText={setText} />} />
          <Route path="*" element={<Navigate to="/editor" replace />} />
        </Routes>
      </Router>
    </>
  );
};

render(<Main />, document.getElementById("app"));
