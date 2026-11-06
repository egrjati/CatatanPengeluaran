import { useState, useEffect } from "react";
import {
  ambilSemuaCatatan,
  tambahCatatan,
  hapusCatatan,
} from "@/api/catatan.js";
import Header from "@/components/layouts/Header";
import KartuRingkasan from "@/components/catatan/KartuRingkasan";
import TableRiwayat from "@/components/catatan/TableRiwayat";
import PerKategori from "@/components/catatan/PerKategori";
import InputCari from "@/components/ui/InputCari";
import FilterKategori from "@/components/catatan/FilterKategori";
import FormTambah from "@/components/catatan/FormTambah";
import KartuRingkasanMobile from "@/components/catatan/KartuRingkasanMobile";
import { Plus } from "lucide-react";

function Home() {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bukaForm, setBukaForm] = useState(false);

  // Get
  useEffect(() => {
    async function muatCatatan() {
      try {
        const data = await ambilSemuaCatatan();
        setPengeluaran(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    muatCatatan();
  }, []);

  // Kunci scroll saat popup buka
  useEffect(() => {
    if (!bukaForm) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // buka kunci
    };
  }, [bukaForm]);

  async function tambahPengeluaran(itemBaru) {
    const catatanBaru = await tambahCatatan(itemBaru);
    setPengeluaran((prev) => [catatanBaru, ...prev]);
  }

  async function hapusPengeluaran(id) {
    try {
      await hapusCatatan(id);
      setPengeluaran((prev) => prev.filter((catatan) => catatan.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] lg:flex lg:h-dvh lg:flex-col lg:overflow-hidden">
      <Header onBukaForm={() => setBukaForm(true)} />

      {/* Popup form tambah */}
      {bukaForm && (
        // Lapisan gelap
        <div
          onClick={() => setBukaForm(false)}
          className="fixed inset-0 z-50 flex animate-fade-masuk items-end justify-center bg-black/50 md:items-center md:overflow-y-auto md:p-4"
        >
          {/* klik form tidak menutup popup */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] w-full animate-sheet-naik overflow-y-auto pt-5 [&>form]:mt-0 [&>form]:rounded-b-none [&>form]:border-b-0 [&>form]:pb-14[&>form]:shadow-none md:max-h-none md:max-w-md lg:max-w-lg md:animate-pop-masuk md:overflow-visible md:pt-0 md:[&>form]:mt-10 md:[&>form]:rounded-b-2xl md:[&>form]:border-b-2 md:[&>form]:pb-6 md:[&>form]:shadow-[6px_6px_0_#171717]"
          >
            <FormTambah
              onTambah={async (itemBaru) => {
                await tambahPengeluaran(itemBaru);
                setBukaForm(false); // tutup popup
              }}
            />
          </div>
        </div>
      )}

      {/* pb-28: ruang tombol mobile */}
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:py-3 lg:flex lg:min-h-0 lg:w-full lg:flex-1 lg:flex-col">
        {/* Ringkasan mobile */}
        <div className="pt-3 md:hidden">
          <KartuRingkasanMobile
            total={87500}
            hariIni={17500}
            rataRata={17500}
          />
        </div>

        {/* Ringkasan desktop */}
        <div className="hidden gap-5 pt-3 md:grid md:grid-cols-3">
          <KartuRingkasan
            warna="merah"
            stiker="Bulan ini"
            label="total pengeluaran"
            nilai={87500}
            keterangan="8 transaksi"
          />
          <KartuRingkasan
            warna="kuning"
            label="hari ini"
            nilai={17500}
            keterangan="3 transaksi"
          />
          <KartuRingkasan
            warna="putih"
            label="rata-rata per hari"
            nilai={17500}
            keterangan="1-5 November"
          />
        </div>

        <div className="mt-7 grid items-start gap-5 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-[minmax(0,1fr)]">
          {/* Histori*/}
          <div className="min-w-0 md:overflow-hidden md:rounded-2xl md:border-2 md:border-neutral-900 md:bg-[#F2ECE4] md:shadow-[5px_5px_0_#171717] lg:col-span-2 lg:flex lg:min-h-0 lg:flex-col lg:self-stretch">
            {/* Header: judul (desktop) + search + kategori */}
            <div className="flex items-center justify-between gap-3 md:px-6 md:pt-6">
              <h2 className="hidden font-angka text-sm font-bold uppercase tracking-[0.2em] text-[#D62828] md:block">
                Riwayat
              </h2>
              <div className="flex w-full items-center gap-3 md:w-auto">
                <div className="min-w-0 flex-1">
                  <InputCari />
                </div>
                <FilterKategori />
              </div>
            </div>

            {/* Garis (desktop) */}
            <div className="mx-6 mt-5 hidden border-t-2 border-neutral-900 md:block" />

            {/* Tabel*/}
            <div className="mt-4 rounded-2xl border-2 border-neutral-900 bg-[#F2ECE4] shadow-[5px_5px_0_#171717] md:mt-0 md:rounded-none md:border-0 md:bg-transparent md:shadow-none lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:scrollbar-none lg:[&::-webkit-scrollbar]:hidden">
              <TableRiwayat
                datas={pengeluaran}
                loading={loading}
                error={error}
                onHapus={hapusPengeluaran}
              />
            </div>
          </div>

          {/* Kanan:(desktop) */}
          <div className="hidden min-w-0 md:block">
            <PerKategori
              datas={[
                { kategori: "Transport", total: 40000, persen: 46 },
                { kategori: "Makanan", total: 30000, persen: 34 },
                { kategori: "Camilan", total: 8000, persen: 9 },
                { kategori: "Minuman", total: 6500, persen: 7 },
                { kategori: "Lainnya", total: 3000, persen: 3 },
              ]}
            />
          </div>
        </div>
      </main>

      {/* Tombol tambah mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-linear-to-t from-[#FAF6F0] via-[#FAF6F0]/90 to-transparent px-4 pb-5 pt-6 md:hidden">
        <button
          type="button"
          onClick={() => setBukaForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-neutral-900 bg-[#FFE14D] py-4 text-base font-extrabold uppercase tracking-wide text-neutral-900 shadow-[4px_4px_0_#171717] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Plus className="h-5 w-5" strokeWidth={3} />
          Catat Pengeluaran
        </button>
      </div>
    </div>
  );
}
export default Home;
