import Pengeluaran from "@/pages/Pengeluaran";
import Register from "./pages/Register";
import Auth from "@/pages/Auth";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Pengeluaran/>} />
    </Routes>
  );
}
export default App;