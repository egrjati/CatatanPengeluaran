import { daftarKategori } from "@/data/kategori";

// aktif = kategori terpilih
function FilterKategoriPil({ aktif = "Semua" }) {
  const semuaPilihan = ["Semua", ...daftarKategori];

  return (
    // mobile: geser samping | desktop: wrap
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 pt-1 scrollbar-none md:mx-0 md:flex-wrap md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden">
      {semuaPilihan.map((k) => (
        <button
          key={k}
          type="button"
          className={`shrink-0 cursor-pointer rounded-full border-2 border-neutral-900 px-5 py-2 text-sm font-bold shadow-[2px_2px_0_#171717] transition md:px-3.5 md:py-1 md:text-xs md:shadow-none md:hover:-translate-y-0.5 ${
            aktif === k
              ? "bg-neutral-900 text-white"
              : "bg-white text-neutral-900 md:hover:shadow-[2px_2px_0_#171717]"
          }`}
        >
          {k}
        </button>
      ))}
    </div>
  );
}
export default FilterKategoriPil;
