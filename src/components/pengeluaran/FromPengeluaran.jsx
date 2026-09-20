import { useState } from "react";
import { CalendarFold, TriangleAlert } from "lucide-react";
import { daftarKategori } from "@/data/kategori";

function FormPengeluaran({ onTambah }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState(daftarKategori[0]);
  const [tanggal, setTanggal] = useState("");
  const [error, setError] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    // Guard Validation
    const hargaAngka = Number(harga); //ubah [harga] jadi number di hargaAngka

    if (nama.trim() === "") {
      setError({ nama: "Nama tidak boleh kosong" });
      return;
    }
    if (Number.isNaN(hargaAngka) || hargaAngka <= 0) {
      setError({ harga: "Harga wajib diisi" });
      return;
    }
    if (tanggal === "") {
      setError({ tanggal: "tanggal belum diisi" });
      return;
    }

    const itemBaru = {
      id: crypto.randomUUID(),
      judul: nama,
      jumlah: hargaAngka,
      kategori: kategori,
      tanggal: tanggal,
    };
    onTambah(itemBaru);

    // Kosongkan lagi
    setNama("");
    setHarga("");
    setKategori(daftarKategori[0]);
    setTanggal("");
    setError({});
  }

  // Dipakai semua input, biar class-nya gak ditulis berulang
  const kelasInput = "w-full border rounded-md text-[14px]";
  const kelasBorder = (adaError) =>
    adaError ? "border-red-500" : "border-black/30";

  // Validasi pakai early return
  const pesanError = Object.values(error)[0];

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      {/* Input Nama */}
      <input
        type="text"
        value={nama}
        placeholder="Contoh : Kopi Americano"
        onChange={(e) => setNama(e.target.value)}
        className={`${kelasInput} ${kelasBorder(error.nama)} p-2.5`}
      />

      {/* Kategori & Harga */}
      <div className="flex gap-3">
        {/* Harga */}
        <input
          type="number"
          value={harga}
          placeholder="Rp. 0"
          onChange={(e) => setHarga(e.target.value)}
          className={`${kelasInput} ${kelasBorder(error.harga)} flex-1 min-w-0 p-2.5`}
        />

        {/* Kategori */}
        <select
          value={kategori}
          className={`${kelasInput} border-black/30 flex-1 min-w-0 p-2.5`}
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
      <div className="flex gap-3">
        <div className="relative flex-1 min-w-0">
          <input
            value={tanggal}
            type="date"
            onChange={(e) => setTanggal(e.target.value)}
            className={`${kelasInput} ${kelasBorder(error.tanggal)} py-2.5 pl-2.5 pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0`}
          />
          <CalendarFold className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
        </div>

        {/* Button tambah */}
        <button className="shrink-0 border border-transparent py-2.5 px-6 rounded-md bg-[#2F7A63] text-white text-[14px]">
          Tambah
        </button>
      </div>

      {/* Satu tempat tetap untuk pesan error */}
      {pesanError && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
          {pesanError}
        </p>
      )}
    </form>
  );
}
export default FormPengeluaran;
