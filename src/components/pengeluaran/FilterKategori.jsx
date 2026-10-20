import { daftarKategori } from "@/data/kategori";

function FilterKategori() {
  return (
    <div className="flex flex-wrap gap-2 py-3">
      {/* Filter */}
      <button className="py-1 px-3 border border-black/30 text-white bg-black/90 font-medium rounded-xl text-xs">
        Semua
      </button>
      {daftarKategori.map((filter) => (
        <button
          key={filter}
          className="py-1 px-3 border border-black/30 text-black/40 font-medium rounded-xl text-xs"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
export default FilterKategori;
