import { useState } from "react";
import { ArrowUpRight, TriangleAlert } from "lucide-react";

function AddCategory({ onTambah }) {
  const [namaCategory, setCategoryName] = useState("");
  const [warna, setColor] = useState("#000000");
  const [error, setError] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    // GuardValidation
    const namaBersih = namaCategory.trim();

    if (namaBersih === "") {
      setError({ namaCategory: "Nama wajib diisi" });
      return;
    }

    if (warna === "") {
      setError({ warna: "Warna wajib diisi" });
      return;
    }

    // Objek
    const itemBaru = {
      namaCategory: namaBersih,
      warna: warna,
    };

    // Kosongkan if success
    try {
      await onTambah(itemBaru);
      setCategoryName("");
      setColor("#000000");
      setError({});
    } catch (err) {
      setError({ server: err.message });
    }
  }

  // error objek
  const pesanError = Object.values(error)[0];
  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-10 rounded-2xl border-2 border-neutral-900 bg-[#D62828] px-6 pb-6 pt-8 shadow-[6px_6px_0_#171717]"
    >
      {/* stiker miring di pojok */}
      <span className="absolute -top-4 left-5 -rotate-3 rounded-full border-2 border-neutral-900 bg-[#FFE14D] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-neutral-900 shadow-[2px_2px_0_#171717]">
        🏷️ Bikin kategori baru
      </span>

      {/* Nama form */}
      <h2 className="text-2xl lg:text-3xl text-center font-extrabold text-[#F2ECE4]">
        Daftar Kategori
      </h2>

      {/* Input Nama */}
      <label className="mt-4 block">
        <span className="text-sm font-bold uppercase tracking-wider text-[#F2ECE4]">
          Nama Kategori
        </span>
        <input
          type="text"
          value={namaCategory}
          placeholder="Makanan"
          onChange={(e) => {
            setCategoryName(e.target.value);
            setError((prev) => ({ ...prev, namaCategory: "" }));
          }}
          className={`mt-1.5 w-full rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] px-4 py-3 text-sm font-semibold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717] ${error.namaCategory ? "ring-4 ring-[#FFE14D]" : ""}`}
        />
      </label>

      {/* Input WARNA */}
      <label className="mt-3 block cursor-pointer">
        <span className="text-sm font-bold uppercase tracking-wider text-[#F2ECE4]">
          Warna
        </span>
        <div className="mt-1.5 flex items-center gap-3">
          <input
            type="color"
            value={warna}
            onChange={(e) => {
              setColor(e.target.value);
              setError((prev) => ({ ...prev, warna: "" }));
            }}
            className={`h-12 w-12 shrink-0 cursor-pointer appearance-none rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] p-1 shadow-[3px_3px_0_#171717] outline-none transition focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717] [&::-moz-color-swatch]:rounded-lg [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none ${error.warna ? "ring-4 ring-[#FFE14D]" : ""}`}
          />
          <span className="flex-1 rounded-xl border-2 border-neutral-900 bg-[#F2ECE4] px-4 py-3 font-angka text-sm font-bold uppercase text-neutral-900 shadow-[3px_3px_0_#171717]">
            {warna}
          </span>
        </div>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#FFE14D] py-3.5 text-base font-extrabold uppercase tracking-wide text-neutral-900 shadow-[4px_4px_0_#171717] transition hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Tambah Kategori
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
export default AddCategory;
