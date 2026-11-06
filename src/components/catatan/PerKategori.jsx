import { formatRupiah } from "@/utils/format";
import { warnaKategori } from "@/data/warnaKategori";

// datas = [{ kategori: "Transport", total: 40000, persen: 46 }, ...]
function PerKategori({ datas }) {
  return (
    <div className="rounded-2xl border-2 border-neutral-900 bg-white p-5 shadow-[5px_5px_0_#171717]">
      {/* Judul */}
      <h2 className="text-lg font-extrabold text-neutral-900">Per kategori</h2>
      <p className="mt-1 font-angka text-xs text-neutral-500">
        klik untuk filter riwayat
      </p>

      {/* Daftar kategori */}
      <div className="mt-5 space-y-4">
        {datas.map((item) => (
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
export default PerKategori;
