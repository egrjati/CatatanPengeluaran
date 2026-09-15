import FilterKategori from "@/components/pengeluaran/FilterKategori";
import RingkasanTotal from "@/components/pengeluaran/RingkasanTotal";
import FormPengeluaran from "@/components/pengeluaran/FromPengeluaran";
import { dataPengeluaran } from "@/data/data";

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
      <FormPengeluaran/>

      {/* Filter Kategori */}
      <FilterKategori />

    </div>
  );
}
export default App;