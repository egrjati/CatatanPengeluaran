import { formatRupiah } from "@/utils/format";
import { warnaKategori } from "@/data/warnaKategori";
import { hitungPerKategori } from "@/utils/ringkasan";
import { Plus } from "lucide-react";

// datas = [{ kategori: "Transport", total: 40000, persen: 46 }, ...]
function CategoryBreakdown({ pengeluaran }) {
  const daftarTotal = hitungPerKategori(pengeluaran);

  return (
    <div className="rounded-2xl border-2 border-neutral-900 bg-white p-5 shadow-[5px_5px_0_#171717]">
      {/* Judul */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold text-neutral-900">
            Per Kategori
          </h2>

          <button
            type="button"
            aria-label="Tambah kategori"
            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border-2 border-neutral-900 bg-[#F2ECE4] px-2 py-0.5 text-[11px] font-bold text-neutral-900 shadow-[2px_2px_0_#171717] transition hover:-translate-y-0.5 hover:bg-[#FFE14D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <Plus className="h-3 w-3" strokeWidth={3} />
            Kategori
          </button>
        </div>
        <p className="mt-0.5 text-xs font-medium text-neutral-500">
          Klik untuk filter riwayat
        </p>
      </div>

      {/* Daftar kategori */}
      <div className="mt-5 space-y-4">
        {daftarTotal.map((item) => (
          <button
            key={item.kategori}
            type="button"
            className="block w-full cursor-pointer text-left transition hover:-translate-y-0.5"
          >
            {/* Nama + persen + nominal */}
            <div className="flex items-end justify-between gap-2">
              <p className="text-sm font-bold text-neutral-900">
                {item.kategori}
              </p>
              <p className="font-angka text-xs text-neutral-500">
                {item.persen}%{" "}
                <span className="font-bold text-neutral-900">
                  {formatRupiah.format(item.total)}
                </span>
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full border-2 border-neutral-900 bg-[#F2ECE4]">
              <div
                className={`h-full border-r-2 border-neutral-900 ${warnaKategori[item.kategori] ?? "bg-neutral-400"}`}
                style={{ width: `${item.persen}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
export default CategoryBreakdown;
