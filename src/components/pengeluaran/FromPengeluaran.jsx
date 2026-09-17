import { useState } from "react";
import { CalendarFold } from "lucide-react";
import { daftarKategori } from "@/data/kategori";

function FormPengeluaran({onTambah}) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState(daftarKategori[0]);
  const [tanggal, setTanggal] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    const itemBaru = {
      id: crypto.randomUUID(),
      judul: nama,
      jumlah: Number(harga),
      kategori: kategori,
      tanggal: tanggal,
    };
    onTambah(itemBaru);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      {/* Input Nama */}
      <input
        type="text"
        value={nama}
        placeholder="Contoh : Kopi Americano"
        onChange={(e) => setNama(e.target.value)}
        className="w-full border border-black/30 rounded-md p-2.5 text-[14px]"
      />

      {/* Kategori & Harga */}
      <div className="flex gap-3">
        {/* Harga */}
        <input
          type="number"
          value={harga}
          placeholder="Rp. 0"
          onChange={(e) => setHarga(e.target.value)}
          className="w-full border border-black/30 rounded-md p-2.5 text-[14px]"
        />

        {/* Kategori */}
        <select
          value={kategori}
          className="w-full border border-black/30 rounded-md p-2.5 text-[14px]"
          onChange={(e) => setKategori(e.target.value)}
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="flex gap-3 ">
        <div className="relative flex-1">
          <input
            value={tanggal}
            type="date"
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border border-black/30 rounded-md py-2.5 pl-2.5 pr-10 text-[14px] [&::-webkit-calendar-picker-indicator]:opacity-0"
          />
          <CalendarFold className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
        </div>

        {/* Button tambah */}
        <button className="py-2 px-6 rounded-md bg-[#2F7A63] text-white">
          Tambah
        </button>

      </div>
    </form>
  );
}
export default FormPengeluaran;
