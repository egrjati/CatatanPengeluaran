import Pengeluaran from "@/pages/Pengeluaran";
import Auth from "@/pages/Auth";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Pengeluaran/>} />
    </Routes>
  );
}
export default App;
