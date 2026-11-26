import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import EditCategoryForm from "./form/EditCategoryForm";

function ManageCategory({ categories, onSimpan, onHapus }) {
  const [kategoriTerpilih, setKategoriTerpilih] = useState(null);

  //   Early retrun
  if (kategoriTerpilih) {
    return (
      <>
        <EditCategoryForm
          kategory={kategoriTerpilih}
          onSimpan={async (id, isiBaru) => {
            await onSimpan(id, isiBaru);
            setKategoriTerpilih(null); // balik ke daftar
          }}
          onKembali={() => setKategoriTerpilih(null)}
        />
      </>
    );
  }

  return (
    <div className="relative rounded-t-2xl border-2 border-b-0 border-neutral-900 bg-white px-5 pb-14 pt-8 md:mt-10 md:rounded-2xl md:border-b-2 md:pb-5 md:shadow-[5px_5px_0_#171717]">
      <span className="absolute -top-4 left-5 -rotate-2 rounded-full border-2 border-neutral-900 bg-[#FFE14D] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-neutral-900 shadow-[2px_2px_0_#171717]">
        Kelola kategori
      </span>

      <h1 className="text-lg font-extrabold text-neutral-900">
        Kelola Kategori
      </h1>
      <ul className="mt-2 max-h-[55dvh] divide-y-2 divide-dashed divide-neutral-900/40 overflow-y-auto pr-1">
        {/* Map */}
        {categories.map((kategori) => (
          <li key={kategori.id} className="flex items-center gap-3 py-3">
            <span
              aria-hidden="true"
              className="h-4 w-4 shrink-0 rounded-full border border-neutral-900"
              style={{ backgroundColor: kategori.warna }}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="truncate text-sm font-bold text-neutral-900">
                {kategori.namaCategory}
              </div>
              <div className="font-angka text-[11px] uppercase text-neutral-500">
                {kategori.warna}
              </div>
            </div>

            {/* Edit */}
            <button
              onClick={() => setKategoriTerpilih(kategori)}
              className="shrink-0 cursor-pointer rounded-md p-1 text-neutral-500 transition hover:bg-[#7B9CFF]/10 hover:text-[#5f87ff]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            {/* Delete */}
            <button
              type="button"
              onClick={() => onHapus(kategori.id)}
              className="shrink-0 cursor-pointer rounded-md p-1 text-neutral-500 transition hover:bg-[#ffbd92]/10 hover:text-[#ff825f]"
            >
              <Trash className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ManageCategory;
