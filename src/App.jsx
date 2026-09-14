import FilterKategori from "@/components/pengeluaran/FilterKategori";
import RingkasanTotal from "@/components/pengeluaran/RingkasanTotal";
import FromPengeluaran from "@/components/pengeluaran/FromPengeluaran";
import { dataPengeluaran } from "./data/data";
import {daftarKategori} from "@/data/kategori";

function App() {
  const totalPengeluaran = dataPengeluaran.reduce(
    (total, item) => total + item.jumlah,
    0,
  );

  return (
    <div className="min-h-screen overflow-hidden bg-white p-4">
      <h1 className="text-black/60 text-xl font-semibold mb-5">
        Catatan Pengeluaran
      </h1>

      {/* Total Pengeluaran */}
      <RingkasanTotal hasil={totalPengeluaran} />

      {/* Inputan */}
      <FromPengeluaran daftar={daftarKategori}/>

      {/* Filter Kategori */}
      <FilterKategori />
    </div>
  );
}
export default App;