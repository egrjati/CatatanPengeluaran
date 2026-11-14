import { useState } from "react";
import { keTanggalLokal } from "@/utils/tanggal";
import { ArrowUpRight, CalendarFold, TriangleAlert } from "lucide-react";

function AddExpenseForm({ onTambah, categories }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [tanggal, setTanggal] = useState(keTanggalLokal(new Date()));
  const [error, setError] = useState({});

  const objKemarin = new Date();
  objKemarin.setDate(objKemarin.getDate() - 1);
  const kemarin = keTanggalLokal(objKemarin);

  const hariIni = keTanggalLokal(new Date());

  async function handleSubmit(e) {
    e.preventDefault();

    // Guard Validation
    const namaBersih = nama.trim();
    const hargaAngka = Number(harga); // string -> number

    // Nama
    if (namaBersih === "") {
      setError({ nama: "Nama Barang wajib diisi" });
      return;
    }
    if (!/[a-zA-Z]/.test(nama)) {
      setError({ nama: "Nama harus mengandung huruf" });
      return;
    }
    if (namaBersih.length > 50) {
      setError({ nama: "Nama terlalu panjang" });
      return;
    }

    // Harga
    if (Number.isNaN(hargaAngka) || hargaAngka <= 0) {
      setError({ harga: "Harga wajib diisi" });
      return;
    }
    if (!Number.isInteger(hargaAngka)) {
      setError({ harga: "Format wajib bilangan bulat" });
      return;
    }

    if (hargaAngka > 2147483647) {
      setError({ harga: "Harga Terlalu banyak" });
      return;
    }

    // Tanggal
    if (tanggal === "") {
      setError({ tanggal: "tanggal belum diisi" });
      return;
    }

    // kategori
    if (kategoriId === "") {
      setError({ kategoriId: "Pilih Kategori" });
      return;
    }

    // objek
    const itemBaru = {
      nama: nama,
      harga: hargaAngka,
      kategoriId: kategoriId,
      tanggal: tanggal,
    };

    try {
      await onTambah(itemBaru);
      // Kosongkan lagi
      setNama("");
      setHarga("");
      setKategoriId("");
      setTanggal(hariIni);
      setError({});
    } catch (err) {
      setError({ server: err.message });
    }
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

      {/* Nama form */}
      <h2 className="text-2xl lg:text-3xl text-center font-extrabold text-[#F2ECE4]">
        Catat Pengeluaran
      </h2>

      {/* Input Nama */}
      <label className="mt-4 block">
        <span className="text-sm font-bold uppercase tracking-wider text-[#F2ECE4]">
          Beli apa?
        </span>
        <input
          type="text"
          value={nama}
          placeholder="Contoh : Kopi Americano"
          onChange={(e) => {
            setNama(e.target.value);
            setError((prev) => ({ ...prev, nama: "" }));
          }}
          className={`mt-1.5 w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] px-4 py-3 text-sm font-semibold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717] ${error.nama ? "ring-4 ring-[#FFE14D]" : ""}`}
        />
      </label>

      {/* Harga */}
      <label className="mt-3 block">
        <span className="text-sm font-bold uppercase tracking-wider text-[#F2ECE4]">
          Harga
        </span>
        <div className="relative mt-1.5 transition focus-within:-translate-y-0.5">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 font-angka text-sm font-bold text-neutral-500">
            Rp
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={harga === "" ? "" : Number(harga).toLocaleString("id-ID")}
            placeholder="0"
            onChange={(e) => {
              setHarga(e.target.value.replace(/\D/g, ""));
              setError((prev) => ({ ...prev, harga: "" }));
            }}
            className={`w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] py-3 pl-11 pr-4 font-angka text-sm font-bold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition placeholder:text-neutral-400 focus:shadow-[5px_5px_0_#171717] ${error.harga ? "ring-4 ring-[#FFE14D]" : ""}`}
          />
        </div>
      </label>

      {/* Tanggal */}
      <div className="mt-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F2ECE4]">
          Kapan?
        </span>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          {/* Hariini */}
          <button
            onClick={() => {
              setTanggal(hariIni);
              setError((prev) => ({ ...prev, tanggal: "" }));
            }}
            type="button"
            className={`shrink-0 cursor-pointer rounded-xl border-2 border-neutral-900 px-4 py-3 text-xs font-bold shadow-[3px_3px_0_#171717] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#171717] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              ${
                tanggal === hariIni
                  ? "bg-neutral-900 text-white"
                  : "bg-[#F2ECE4] text-neutral-900"
              }
              `}
          >
            Hari ini
          </button>

          {/* Kemarin */}
          <button
            onClick={() => {
              setTanggal(kemarin);
              setError((prev) => ({ ...prev, tanggal: "" }));
            }}
            type="button"
            className={`shrink-0 cursor-pointer rounded-xl border-2 border-neutral-900 px-4 py-3 text-xs font-bold shadow-[3px_3px_0_#171717] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#171717] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              ${tanggal === kemarin ? "bg-neutral-900 text-white" : "bg-[#F2ECE4] text-neutral-900"}
              `}
          >
            Kemarin
          </button>

          {/* Tanggal custom */}
          <div className="relative min-w-40 flex-1 transition focus-within:-translate-y-0.5">
            <input
              type="date"
              value={tanggal}
              onClick={(e) => e.currentTarget.showPicker()}
              onChange={(e) => {
                setTanggal(e.target.value);
                setError((prev) => ({ ...prev, tanggal: "" }));
              }}
              className={`w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] py-3 pl-4 pr-10 font-angka text-sm font-bold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition focus:shadow-[5px_5px_0_#171717] [&::-webkit-calendar-picker-indicator]:opacity-0 ${error.tanggal ? "ring-4 ring-[#FFE14D]" : ""}`}
            />
            <CalendarFold className="pointer-events-none absolute right-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neutral-900" />
          </div>
        </div>
      </div>

      {/* Kategori */}
      <label className="mt-5 block">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F2ECE4]">
          Kategori
        </span>
        <select
          value={kategoriId}
          onChange={(e) => {
            setKategoriId(e.target.value);
            setError((prev) => ({ ...prev, kategoriId: "" }));
          }}
          className="mt-1.5 w-full cursor-pointer rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] px-4 py-3 text-sm font-semibold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717]"
        >
          {/* Isi awal kosong, sebelum dipilih */}
          <option value=""> Pilih categori</option>,
          {categories.map((kategori) => (
            // Opsi kategori dari API
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
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

      {/* Pesan error (absolute, form tidak bergeser) */}
      {pesanError && (
        <p
          role="alert"
          className="absolute bottom-3 left-1/2 z-10 flex w-max max-w-[calc(100%-3rem)] -translate-x-1/2 rotate-1 animate-pop-masuk items-center gap-2 rounded-full border-2 border-neutral-900 bg-[#FFE14D] px-4 py-1.5 text-xs font-bold text-neutral-900 shadow-[2px_2px_0_#171717] md:-bottom-4"
        >
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {pesanError}
        </p>
      )}
    </form>
  );
}
export default AddExpenseForm;
