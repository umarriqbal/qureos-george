import HomePage from "./pages/Home/Home";
import MembersPage from "./pages/Members/Members";
import MemberPage from "./pages/Member/Member";
import TokenPage from "./pages/Token/Token";
import NotFoundPage from "./pages/Error/NotFound";

import { Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/members" element={<MembersPage />}></Route>
      <Route path="/member/:memberId" element={<MemberPage />}></Route>
      <Route path="/token" element={<TokenPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
