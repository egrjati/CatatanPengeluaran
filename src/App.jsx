import { CalendarFold } from "lucide-react";
import FilterKategori from "@/components/pengeluaran/FilterKategori";
import RingkasanTotal from "@/components/pengeluaran/RingkasanTotal";
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
      <form className="mt-8 space-y-3">
        {/* Input Name */}
        <input
          type="text"
          placeholder="Contoh : Kopi Americano"
          className="w-full border border-black/30 rounded-md p-2.5 text-[14px] mt-1"
        />

        {/* Kategori & Harga */}
        <div className="flex gap-3">
          {/* Harga */}
          <input
            type="number"
            placeholder="Rp. 0"
            className="w-full border border-black/30 rounded-md mt-1 p-2.5 text-[14px]"
          />

          {/* Kategori */}
          <select className="w-full border border-black/30 rounded-md p-2.5 text-[14px] mt-1">
          {daftarKategori.map((kategori) => (
          <option key={kategori} value={kategori}>{kategori}</option>
          ))}

          </select>
        </div>

        {/* Date */}
        <div className="flex gap-3 ">
          <div className="relative flex-1">
            <input
              type="date"
              className="w-full border border-black/30 rounded-md py-2.5 pl-2.5 pr-10 text-[14px] [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
            <CalendarFold className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
          </div>

          <button className="py-2 px-6 rounded-md bg-[#2F7A63] text-white">
            Tambah
          </button>
        </div>
      </form>
      {/* Filter Kategori */}
      <FilterKategori />
    </div>
  );
}
export default App;