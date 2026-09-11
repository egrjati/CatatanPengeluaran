import CardPengeluaran from "@/components/pengeluaran/CardPengeluaran"

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
          <CardPengeluaran
            key={keluar.id}
            judul={keluar.judul}
            jumlah={keluar.jumlah}
            kategori={keluar.kategori}
            tanggal={keluar.tanggal}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;
