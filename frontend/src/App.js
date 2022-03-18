import HomePage from "./pages/Home/Home";
import MembersPage from "./pages/Members/Members";

import { Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/members" element={<MembersPage />}></Route>
    </Routes>
  );
}

export default App;
