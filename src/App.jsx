const dataPengeluaran = [
  {
    id: 1,
    judul: "Kopi Americano",
    jumlah: 16000,
    kategori: "Minuman",
    tanggal: "2026-09-10",
  },
  {
    id: 2,
    judul: "Bensin",
    jumlah: 10000,
    kategori: "Transport",
    tanggal: "2026-09-10",
  },
  {
    id: 3,
    judul: "Nasi",
    jumlah: 8000,
    kategori: "Makanan",
    tanggal: "2026-09-10",
  },
];
function App() {
  return (
    <div className="min-h-screen bg-white p-4 space-y-4 text-xl text-black ">
      <h1 className="text-center">Data Pengeluaran</h1>

      {/* MAP */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {dataPengeluaran.map((keluar) => (
          // Output
          <li
            key={keluar.id}
            className="p-2 w-44 bg-white border border-black/60 rounded-sm shadow-sm"
          >
            {/* Image */}
            <div className="w-full bg-black h-24 rounded-sm flex justify-center items-center text-white text-lg">
              <h1>{keluar.judul}</h1>
            </div>
            <div className=" flex justify-between items-center mt-2 rounded-xl ">
              <div className="py-1 px-2 border w-fit rounded-xl">
                <p className="text-sm">{keluar.kategori}</p>
              </div>
              <p className="text-sm">{keluar.tanggal}</p>
            </div>
            <h2 className="text-lg mt-1 text-red-400 font-medium text-center">
              Rp.{keluar.jumlah}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
