import { CalendarFold } from "lucide-react";
import FilterKategori from "@/components/pengeluaran/FilterKategori";

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-white p-4">
      <h1 className="text-black/60 text-xl font-semibold">
        Catatan Pengeluaran
      </h1>

      {/* Total Pengeluaran */}
      <div className="mt-5 border border-black/30 text-black/40 rounded-md p-4 space-y-1.5">
        <p className="uppercase text-[12px]">total pengeluaran</p>
        <h2 className="font-angka text-3xl font-bold">RP 0</h2>
        <p className="text-[12px]">Belum ada catatan</p>
      </div>

      {/* Inputan */}
      <div className="mt-8 space-y-3">
        {/* Input Name */}
        <input
          type="text"
          placeholder="Contoh : Kopi Americano"
          className="w-full border border-black/30 rounded-md p-2.5 text-[14px]"
        />
        {/* Kategori & Harga */}
        <div className=" flex gap-3">
          <input
            type="text"
            placeholder="Rp. 0 "
            className="w-full border border-black/30 rounded-md p-2.5 text-[14px]"
          />

          <input
            type="text"
            placeholder="Makanan"
            className="w-full border border-black/30 rounded-md p-2.5 text-[14px]"
          />
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

      {/* Filter Kategori */}
      <FilterKategori/>

      </div>


    </div>
  );
}
export default App;
