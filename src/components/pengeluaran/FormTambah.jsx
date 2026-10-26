import { useState } from "react";
import { ArrowUpRight, CalendarFold, TriangleAlert } from "lucide-react";
import { daftarKategori } from "@/data/kategori";

function FormTambah({ onTambah }) {
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
      setError({ nama: "Nama Barang wajib diisi" });
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
      harga: hargaAngka,
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

  // Validasi pakai early return
  const pesanError = Object.values(error)[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-10 rounded-2xl border-2 border-neutral-900 bg-[#D62828] px-6 pb-6 pt-8 shadow-[6px_6px_0_#171717]"
    >
      {/* stiker miring di pojok */}
      <span className="absolute -top-4 left-5 -rotate-3 rounded-full border-2 border-neutral-900 bg-[#FFE14D] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-neutral-900 shadow-[2px_2px_0_#171717]">
        ✍️ Beli apa aja hari ini?
      </span>

      {/* judul form */}
      <h2 className="text-2xl font-extrabold text-[#F2ECE4]">
        Catat Pengeluaran
      </h2>
      <p className="mt-1 font-angka text-sm lg:text-base text-[#F2ECE4]/70">
        biar dompet gak kaget di akhir bulan
      </p>

      {/* Input Nama */}
      <label className="mt-6 block">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F2ECE4]">
          Beli apa?
        </span>
        <input
          type="text"
          value={nama}
          placeholder="Contoh : Kopi Americano"
          onChange={(e) => setNama(e.target.value)}
          className={`mt-1.5 w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] px-4 py-3 text-sm font-semibold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717] ${error.nama ? "ring-4 ring-[#FFE14D]" : ""}`}
        />
      </label>

      {/* Harga & Tanggal */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* Harga */}
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F2ECE4]">
            Harga
          </span>
          <div className="relative mt-1.5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-angka text-sm font-bold text-neutral-500">
              Rp
            </span>
            <input
              type="number"
              value={harga}
              placeholder="0"
              onChange={(e) => setHarga(e.target.value)}
              className={`w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] py-3 pl-11 pr-4 font-angka text-sm font-bold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition placeholder:text-neutral-400 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717] ${error.harga ? "ring-4 ring-[#FFE14D]" : ""}`}
            />
          </div>
        </label>

        {/* Tanggal */}
        <label className="block min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F2ECE4]">
            Kapan?
          </span>
          <div className="relative mt-1.5">
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className={`w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] py-3 pl-4 pr-10 font-angka text-sm font-bold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717] [&::-webkit-calendar-picker-indicator]:opacity-0 ${error.tanggal ? "ring-4 ring-[#FFE14D]" : ""}`}
            />
            <CalendarFold className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-900" />
          </div>
        </label>
      </div>

      {/* Kategori */}
      <label className="mt-5 block">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F2ECE4]">
          Kategori
        </span>
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="mt-1.5 w-full cursor-pointer rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] px-4 py-3 text-sm font-semibold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717]"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>

      {/* Button tambah */}
      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#FFE14D] py-3.5 text-base font-extrabold uppercase tracking-wide text-neutral-900 shadow-[4px_4px_0_#171717] transition hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Gas, Catat!
        <ArrowUpRight className="h-5 w-5" strokeWidth={3} />
      </button>

      {/* Satu tempat tetap untuk pesan error */}
      {pesanError && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#FFE14D] px-4 py-2.5 text-xs font-bold text-neutral-900">
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {pesanError}
        </p>
      )}
    </form>
  );
}
export default FormTambah;
