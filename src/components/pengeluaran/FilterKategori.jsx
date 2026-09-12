import {daftarKategori} from "@/data/kategori";

function FilterKategori() {
    return (
      <div className="pt-1">
        {/* Semua */}

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-between">
          <button className="py-1 px-3 border border-black/30 text-black/40 font-medium rounded-xl text-[12px]">
            Semua
          </button>
          {daftarKategori.map((kategori) => (
            <button
              key={kategori.index}
              className="py-1 px-3 border border-black/30 text-black/40 font-medium rounded-xl text-[12px]"
            >
              <p>{kategori}</p>
            </button>
          ))}
        </div>
      </div>
    );
}
export default FilterKategori;