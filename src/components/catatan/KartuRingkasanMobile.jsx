import { formatRupiah } from "@/utils/format";

// Versi mobile: 1 kartu merah besar, di dalamnya ada kartu "hari ini" & "rata-rata/hari"
function KartuRingkasanMobile({ total, hariIni, rataRata }) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-900 bg-[#D62828] px-5 pb-5 pt-7 shadow-[5px_5px_0_#171717]">
      {/* Stiker miring */}
      <span className="absolute -top-3.5 left-4 -rotate-3 rounded-full border-2 border-neutral-900 bg-[#FFE14D] px-3 py-0.5 text-xs font-extrabold uppercase tracking-wide text-neutral-900 shadow-[2px_2px_0_#171717]">
        Bulan ini
      </span>

      {/* Total bulan ini */}
      <p className="font-angka text-sm text-[#F2ECE4]/90">total pengeluaran</p>
      <h2 className="mt-1 font-angka text-4xl font-extrabold text-[#F2ECE4]">
        {formatRupiah.format(total)}
      </h2>

      {/* Kartu kecil di dalam */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-neutral-900 bg-[#FFE14D] px-3 py-2.5 text-neutral-900">
          <p className="font-angka text-xs">hari ini</p>
          <p className="mt-0.5 font-angka text-base font-extrabold">
            {formatRupiah.format(hariIni)}
          </p>
        </div>
        <div className="rounded-xl border-2 border-neutral-900 bg-white px-3 py-2.5 text-neutral-900">
          <p className="font-angka text-xs">rata-rata/hari</p>
          <p className="mt-0.5 font-angka text-base font-extrabold">
            {formatRupiah.format(rataRata)}
          </p>
        </div>
      </div>
    </div>
  );
}
export default KartuRingkasanMobile;
