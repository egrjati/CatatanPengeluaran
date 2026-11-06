import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Auth from "@/pages/Auth";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
export default App;
