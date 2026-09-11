import CardPengeluaran from "@/components/pengeluaran/CardPengeluaran";

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
  {
    id: 4,
    judul: "Pentol",
    jumlah: 5000,
    kategori: "Camilan",
    tanggal: "2026-09-10",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-white p-4 space-y-4 text-xl text-black ">
      <h1 className="text-center text-2xl font-bold mb-10">Data Pengeluaran</h1>

      {/* MAP */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
        {dataPengeluaran.map((keluar) => (
          // Spread
          <CardPengeluaran key={keluar.id} {...keluar} />
        ))}
      </ul>
    </div>
  );
}
export default App;
