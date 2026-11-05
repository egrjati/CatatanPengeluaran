import HomePage from "@/pages/HomePage";
import MenuUtama from "@/pages/MenuUtama";
import Register from "./pages/Register";
import Auth from "@/pages/Auth";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/menu" element={<MenuUtama />} />
    </Routes>
  );
}
export default App;
