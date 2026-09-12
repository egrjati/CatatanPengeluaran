import CardPengeluaran from "@/components/pengeluaran/CardPengeluaran";
// import {useState} from "react";
import {dataPengeluaran} from "@/data/data";

function App() {
  // const [pengeluaran, setPengeluaran] = useState(dataPengeluaran);

  return (
    <div className="min-h-screen bg-white p-4 space-y-4 text-xl text-black ">
      <h1 className="text-center text-2xl font-bold mb-10">Data Pengeluaran</h1>

      {/* MAP */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
        {dataPengeluaran.map((keluar) => (
          // Spread
          <CardPengeluaran key={keluar.id} {...keluar} />
        ))}
      </ul>
    </div>
  );
}
export default App;
