import HomePage from "@/pages/HomePage";
import Register from "./pages/Register";
import Auth from "@/pages/Auth";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
export default App;
