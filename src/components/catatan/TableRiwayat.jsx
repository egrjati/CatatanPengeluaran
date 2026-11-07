import { formatRupiah, formatTanggal } from "@/utils/format";
import { Trash2 } from "lucide-react";
import notebookLockup from "@/assets/icon/notebook-mark.svg";

function TableRiwayat({ datas, onHapus, error, loading }) {
  if (loading)
    return (
      <div className="flex items-center justify-center px-6 py-24">
        <p className="animate-pulse font-angka text-sm font-semibold tracking-widest text-neutral-500">
          Memuat data...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center gap-1 px-6 py-24 text-center">
        <p className="font-angka text-sm font-bold tracking-widest text-[#D62828]">
          Terjadi kesalahan
        </p>
        <p className="font-angka text-xs text-neutral-500">{error}</p>
      </div>
    );

  // Early return
  if (datas.length === 0) {
    return (
      <div className="px-6 py-6">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-900/40 bg-white py-20 text-center">
          <img
            src={notebookLockup}
            alt="Logo Catatan"
            className="h-16 w-16 lg:h-24 lg:w-24"
          />
          <h3 className="text-sm font-extrabold text-neutral-900 md:text-base">
            Belum ada pengeluaran
          </h3>
          <p className="font-angka text-xs text-neutral-500">
            catat pengeluaran pertamamu segera
          </p>
        </div>
      </div>
    );
  }

  // Kelompokkan per tanggal
  const perTanggal = datas.reduce((kelompok, item) => {
    const kunci = item.tanggal;
    const isiLama = kelompok[kunci] || []; //bracket notion
    kelompok[kunci] = [...isiLama, item];
    return kelompok;
  }, {});

  // sort by tanggal terbaru
  const tanggalUrut = Object.entries(perTanggal).sort(
    (a, b) => b[0].localeCompare(a[0]), // b-a: terbaru dulu
  );

  return (
    <div className="px-6 pb-6 pt-4 text-neutral-900">
      {tanggalUrut.map(([tanggal, items]) => {
        // subtotal per tanggal
        const subtotal = items.reduce((total, item) => total + item.harga, 0);

        return (
          <section key={tanggal} className="pb-2 pt-4 first:pt-1">
            {/* Pembatas tanggal: --- tanggal · subtotal --- */}
            <div className="flex items-center gap-3">
              <span className="flex-1 border-t-2 border-dashed border-neutral-900/40" />
              <p className="shrink-0 text-xs font-extrabold uppercase tracking-wider text-neutral-900">
                {formatTanggal.format(new Date(`${tanggal}T00:00:00`))}
                <span className="ml-2 font-angka font-semibold normal-case tracking-normal text-neutral-500">
                  · {formatRupiah.format(subtotal)}
                </span>
              </p>
              <span className="flex-1 border-t-2 border-dashed border-neutral-900/40" />
            </div>

            {/* map dalam */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                {/* Kiri: nama + badge kategori */}
                <div className="min-w-0">
                  <p className="wrap-break-word text-sm font-bold">
                    {item.nama}
                  </p>
                  <span className="mt-1 inline-block rounded-full border-2 border-neutral-900 bg-white px-2 py-0.5 font-angka text-[10px] font-bold uppercase tracking-wider">
                    {item.kategori}
                  </span>
                </div>

                {/* Kanan: harga + hapus */}
                <div className="flex shrink-0 items-center gap-3">
                  <p className="font-angka text-sm font-bold">
                    {formatRupiah.format(item.harga)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onHapus(item.id)}
                    aria-label={`Hapus ${item.nama}`}
                    className="cursor-pointer rounded-md p-1 text-neutral-400 transition hover:bg-[#D62828]/10 hover:text-[#D62828]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
export default TableRiwayat;
