import dcm from "@/assets/icon/dcm.png";

function TableBoard({ datas }) {
  // Early return
  if (datas.length === 0) {
    return (
      <div className="w-full py-24 mt-5 rounded-md bg-white border border-black/30 flex flex-col gap-2 justify-center items-center tracking-wide">
        <img
          src={dcm}
          alt="Logo Catatan"
          className="w-16 h-16 lg:w-22 lg:h-22 opacity-55"
        />
        <h1 className="font-bold text-sm md:text-base text-black">
          Belum ada pengeluaran
        </h1>
        <p className="text-black/60 font-medium text-xs lg:text-sm max-w-xs lg:max-w-sm text-center tracking-wide">
          Catat pengeluaran pertamamu lewat form di atas
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full px-6 py-10 rounded-md bg-white border border-black/30 flex flex-col ">
      {datas.map((item) => (
        <section key={item.id}>
          <div className="mb-16">
            {/* tgl & total harga */}
            <div className="flex justify-between font-semibold text-black/40 text-xs">
              <p>{item.tanggal}</p>
              <p className="font-angka">{item.jumlah}</p>
            </div>
            <hr className="border-black/10 mt-2" />
            {/* nama + kategori + harga */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base lg:text-xl text-black/90">
                  {item.judul}
                </h2>
                <p className="text-xs font-medium bg-black/5 text-black/60 px-2 py-0.5 border border-black/30 rounded-2xl">
                  {item.kategori}
                </p>
              </div>
              <p className="font-angka text-base font-light"> Rp {item.jumlah}</p>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}
export default TableBoard;
