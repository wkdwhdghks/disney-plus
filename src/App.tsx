import { Outlet, Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Search from "./pages/Search";

function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="main" element={<Main />} />
          <Route path=":movieId" element={<Detail />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}
