import { formatRupiah } from "@/utils/format";

function RingkasanTotal({hasil}) {
  return (
    <div className=" border border-black/30 rounded-md p-4 space-y-1.5">
      <p className="uppercase text-sm tracking-wide">total pengeluaran</p>
      <h2 className="font-angka text-3xl font-bold">{formatRupiah.format(hasil)}</h2>
    </div>
  );
}
export default RingkasanTotal;
