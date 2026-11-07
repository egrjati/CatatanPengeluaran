import { formatRupiah } from "@/utils/format";

// Pilihan warna kartu
const gayaWarna = {
  merah: "bg-[#D62828] text-[#F2ECE4]",
  kuning: "bg-[#FFE14D] text-neutral-900",
  putih: "bg-white text-neutral-900",
};

// Pilihan warna stiker
const gayaStiker = {
  hitam: "bg-neutral-900 text-[#F2ECE4]",
  kuning: "bg-[#FFE14D] text-neutral-900",
  merah: "bg-[#D62828] text-[#F2ECE4]",
  putih: "bg-white text-neutral-900",
};

function KartuRingkasan({
  label,
  nilai,
  keterangan,
  warna = "putih",
  stiker,
  warnaStiker = "hitam",
}) {
  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center rounded-2xl border-2 border-neutral-900 px-5 pb-5 pt-6 text-center shadow-[5px_5px_0_#171717] ${gayaWarna[warna]}`}
    >
      {/* Stiker miring (opsional) */}
      {stiker && (
        <span className={`absolute -top-3.5 left-4 -rotate-3 rounded-full border-2 border-neutral-900 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide shadow-[2px_2px_0_#171717] ${gayaStiker[warnaStiker]}`}>
          {stiker}
        </span>
      )}

      {/* Label */}
      <p className="font-angka text-xs opacity-80">{label}</p>

      {/* Nominal */}
      <h2 className="mt-1 font-angka text-2xl font-extrabold lg:text-3xl">
        {formatRupiah.format(nilai)}
      </h2>

      {/* Keterangan */}
      <p className="mt-1 font-angka text-xs opacity-80">{keterangan}</p>
    </div>
  );
}
export default KartuRingkasan;
