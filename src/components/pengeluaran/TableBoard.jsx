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

  // Pengelompokan sesuai dengan data tanggal
  const perTanggal = datas.reduce((kelompok, item) => {
    const kunci = item.tanggal;
    const isiLama = kelompok[kunci] || [];
    kelompok[kunci] = [...isiLama, item];
    return kelompok;
  }, {});

  // sort by tanggal terbaru
  const tanggalUrut = Object.entries(perTanggal).sort((a, b) =>
    b[0].localeCompare(a[0]),
  );

  console.log(tanggalUrut);

  return (
    <div className="mt-4 w-full px-6 py-10 rounded-md bg-white border border-black/30 flex flex-col ">
      {tanggalUrut.map(([tanggal, items]) => {
        // subtotal per tanggal
        const subtotal = items.reduce((total, item) => total + item.jumlah, 0);

        return (
        <section key={tanggal}>
          <div className="mb-16">
            {/* tgl & total harga */}
            <div className="flex justify-between font-semibold text-black/40 text-xs">
              <p>{tanggal}</p>
              <p className="font-angka">{subtotal}</p>
            </div>
            <hr className="border-black/10 mt-2" />
            {/* map dalam */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mt-4"
              >
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-base lg:text-xl text-black/90">
                    {item.judul}
                  </h2>
                  <p className="text-xs font-medium bg-black/5 text-black/60 px-2 py-0.5 border border-black/30 rounded-2xl">
                    {item.kategori}
                  </p>
                </div>
                <p className="font-angka text-base font-light">
                  {" "}
                  Rp {item.jumlah}
                </p>
              </div>
            ))}
          </div>
        </section>
        );
      })}
    </div>
  );
}
export default TableBoard;
