import { daftarKategori } from "@/data/kategori";

function FilterKategori() {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {/* Filter */}
      <button className="py-1 px-3 border border-black/30 text-white bg-black/90 font-medium rounded-xl text-xs">
        Semua
      </button>
      {daftarKategori.map((kategori) => (
        <button
          key={kategori}
          className="py-1 px-3 border border-black/30 text-black/40 font-medium rounded-xl text-xs"
        >
          {kategori}
        </button>
      ))}
    </div>
  );
}
export default FilterKategori;
