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
import FilterKategoriPil from "@/components/catatan/FilterKategoriPil";
import FormTambah from "@/components/catatan/FormTambah";
import KartuRingkasanMobile from "@/components/catatan/KartuRingkasanMobile";
import { Plus } from "lucide-react";

function MenuUtama() {
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

  // Kunci scroll halaman saat popup terbuka
  useEffect(() => {
    if (!bukaForm) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // kembalikan saat popup ditutup
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
    <div className="min-h-screen bg-[#FAF6F0]">
      <Header onBukaForm={() => setBukaForm(true)} />

      {/* Popup form tambah */}
      {bukaForm && (
        // Lapisan gelap
        <div
          onClick={() => setBukaForm(false)}
          className="fixed inset-0 z-50 flex animate-fade-masuk items-end justify-center bg-black/50 md:items-center md:overflow-y-auto md:p-4"
        >
          {/* stopPropagation: klik di dalam form tidak ikut menutup popup */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] w-full animate-sheet-naik overflow-y-auto pt-5 [&>form]:mt-0 [&>form]:rounded-b-none [&>form]:border-b-0 [&>form]:pb-10 [&>form]:shadow-none md:max-h-none md:max-w-md lg:max-w-lg md:animate-pop-masuk md:overflow-visible md:pt-0 md:[&>form]:mt-10 md:[&>form]:rounded-b-2xl md:[&>form]:border-b-2 md:[&>form]:pb-6 md:[&>form]:shadow-[6px_6px_0_#171717]"
          >
            <FormTambah
              onTambah={async (itemBaru) => {
                await tambahPengeluaran(itemBaru);
                setBukaForm(false); // tutup popup setelah berhasil
              }}
            />
          </div>
        </div>
      )}

      {/* pb-28 di mobile: ruang supaya konten terbawah tidak tertutup tombol tambah */}
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:py-6">
        {/* Kartu ringkasan MOBILE */}
        {/* TODO: ganti angka dummy dengan hasil hitunganmu */}
        <div className="pt-3 md:hidden">
          <KartuRingkasanMobile
            total={87500}
            hariIni={17500}
            rataRata={17500}
          />
        </div>

        {/* Kartu ringkasan TABLET/DESKTOP */}
        {/* TODO: ganti angka dummy dengan hasil hitunganmu */}
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

        {/* Bagian bawah: kiri (riwayat) + kanan (per kategori) */}
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
          {/* Kiri */}
          {/* mobile: filter di luar kartu | desktop (md): semua jadi satu panel */}
          <div className="min-w-0 md:overflow-hidden md:rounded-2xl md:border-2 md:border-neutral-900 md:bg-[#F2ECE4] md:shadow-[5px_5px_0_#171717] lg:col-span-2">
            {/* Header riwayat: judul + search (disembunyikan di mobile) */}
            <div className="hidden items-center justify-between gap-3 px-6 pt-6 md:flex">
              <h2 className="font-angka text-sm font-bold uppercase tracking-[0.2em] text-[#D62828]">
                Riwayat
              </h2>
              {/* TODO: value & onChange untuk logika pencarian */}
              <InputCari />
            </div>

            {/* Filter kategori */}
            {/* TODO: prop aktif & logika klik filter */}
            <div className="md:px-6 md:pt-4">
              <FilterKategoriPil />
            </div>

            {/* mobile: kartu sendiri | desktop: menyatu dengan panel */}
            <div className="mt-4 rounded-2xl border-2 border-neutral-900 bg-[#F2ECE4] shadow-[5px_5px_0_#171717] md:mt-0 md:rounded-none md:border-0 md:bg-transparent md:shadow-none">
              <TableRiwayat
                datas={pengeluaran}
                loading={loading}
                error={error}
                onHapus={hapusPengeluaran}
              />
            </div>
          </div>

          {/* Kanan (disembunyikan di mobile, tampil mulai tablet/md) */}
          <div className="hidden min-w-0 md:block">
            {/* TODO: ganti data dummy dengan hasil hitunganmu */}
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

      {/* Tombol tambah MOBILE: menempel di bawah layar */}
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
export default MenuUtama;
