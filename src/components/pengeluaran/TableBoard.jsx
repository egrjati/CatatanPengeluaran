import { formatRupiah } from "@/utils/format";
import { Trash } from "lucide-react";
import notebookLockup from "@/assets/icon/notebook-mark.svg";

function TableBoard({ datas, onHapus }) {
  // Early return
  if (datas.length === 0) {
    return (
      <div className="w-full py-24 mt-5 rounded-md bg-white border-2 border-dashed border-black/50 flex flex-col gap-2 justify-center items-center tracking-wide">
        <img
          src={notebookLockup}
          alt="Logo Catatan"
          className="w-16 h-16 lg:w-44 "
        />
        <h1 className="font-bold text-sm md:text-base text-black">
          Belum ada pengeluaran
        </h1>
        <p className="text-black/60 font-medium text-xs lg:text-sm max-w-xs lg:max-w-sm text-center tracking-wide">
          Catat pengeluaran pertamamu Segera
        </p>
      </div>
    );
  }

  // Pengelompokan sesuai dengan data tanggal
  const perTanggal = datas.reduce((kelompok, item) => {
    const kunci = item.tanggal;
    const isiLama = kelompok[kunci] || []; //bracket notion
    kelompok[kunci] = [...isiLama, item];
    return kelompok;
  }, {});

  // sort by tanggal terbaru
  const tanggalUrut = Object.entries(perTanggal).sort(
    (a, b) => b[0].localeCompare(a[0]), //baru kelama (ba) sebaliknya lama ke baru (ab)
  );

  // total semua pengeluaran untuk baris TOTAL di bawah struk
  const total = datas.reduce((jumlah, item) => jumlah + item.jumlah, 0);

  return (
    <div className="mt-2 w-full rounded-sm bg-[#F2ECE4] px-6 py-10 font-angka text-neutral-900">
      {/* header struk */}
      <div className="flex items-center justify-between">
        <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#D62828]">
          Receipt
        </p>
        <p className="text-sm font-semibold">
          No. {String(datas.length).padStart(6, "0")}
        </p>
      </div>

      {tanggalUrut.map(([tanggal, items]) => {
        // subtotal per tanggal
        const subtotal = items.reduce((total, item) => total + item.jumlah, 0);

        return (
          <section key={tanggal} className="mt-6">
            {/* tanggal diapit garis putus-putus */}
            <p className="border-y-2 border-dashed border-neutral-900 py-2 text-center text-sm font-semibold tracking-wider">
              DATE: {tanggal.split("-").reverse().join("/")}
            </p>

            {/* map dalam */}
            {items.map((item) => (
              <div key={item.id} className="mt-4 text-sm">
                {/* line 1 */}
                <div className="flex justify-between items-center">
                  <p>{item.judul}</p>
                  <button
                    type="button"
                    onClick={() => onHapus(item.id)}
                    aria-label={`Hapus ${item.nama}`}
                  >
                    <Trash className="w-3 mr-2 hover:text-[#D62828] cursor-pointer" />
                  </button>
                </div>
                {/* line 2 */}
                <div className="flex items-end gap-2">
                  <p className="text-xs text-neutral-500">{item.kategori}</p>
                  <span className="mb-1 flex-1 border-b-2 border-dotted border-neutral-400" />
                  <p>{formatRupiah.format(item.jumlah)}</p>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-between text-xs text-neutral-500">
              <p>Subtotal</p>
              <p>{formatRupiah.format(subtotal)}</p>
            </div>
          </section>
        );
      })}

      {/* total keseluruhan */}
      <div className="mt-6 flex items-center justify-between border-t-2 border-dashed border-neutral-900 pt-4 font-bold">
        <p className="text-lg">TOTAL:</p>
        <p className="text-xl">{formatRupiah.format(total)}</p>
      </div>

      <p className="mt-8 text-center font-sans text-3xl font-extrabold italic text-[#D62828]">
        Terima Kasih!
      </p>
    </div>
  );
}
export default TableBoard;
