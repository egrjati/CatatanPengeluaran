import { useState, useEffect } from "react";
import {
  ambilSemuaCatatan,
  tambahCatatan,
  hapusCatatan,
  editCatatan,
} from "@/api/catatan.js";
import Header from "@/components/layouts/Header";
import ExpenseList from "@/components/expense/list/ExpenseList";
import CategoryBreakdown from "@/components/expense/summary/CategoryBreakdown";
import SearchInput from "@/components/ui/SearchInput";
import CategoryFilter from "@/components/expense/filter/CategoryFilter";
import AddExpenseForm from "@/components/expense/form/AddExpenseForm";
import EditExpenseForm from "@/components/expense/form/EditExpenseForm";
import SummaryPanel from "@/components/expense/summary/SummaryPanel";
import { Plus } from "lucide-react";

function Home() {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bukaForm, setBukaForm] = useState(false);
  const [catatanTerpilih, setCatatanTerpilih] = useState(null);

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

  async function editPengeluaran(id, isiBaru) {
    const catatanDiEdit = await editCatatan(id, isiBaru);
    setPengeluaran((prev) =>
      prev.map((catatan) =>
        catatan.id === catatanDiEdit.id ? catatanDiEdit : catatan,
      ),
    );
  }

  return (
    // Mobile & lg: tinggi dikunci 1 layar, hanya riwayat yang scroll. md: scroll normal
    <div className="flex h-dvh flex-col overflow-hidden bg-[#FAF6F0] md:block md:h-auto md:min-h-screen md:overflow-visible lg:flex lg:h-dvh lg:overflow-hidden">
      <Header onBukaForm={() => setBukaForm(true)} />

      {/* Popup form Tambah */}
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
            <AddExpenseForm
              onTambah={async (itemBaru) => {
                await tambahPengeluaran(itemBaru);
                setBukaForm(false); // tutup popup
              }}
            />
          </div>
        </div>
      )}

      {/* Popup form edit */}
      {catatanTerpilih && (
        // Lapisan gelap
        <div
          onClick={() => setCatatanTerpilih(null)} // ⬅️ tutup popup
          className="fixed inset-0 z-50 flex animate-fade-masuk items-end justify-center bg-black/50 md:items-center md:overflow-y-auto md:p-4"
        >
          {/* klik form tidak menutup popup */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] w-full animate-sheet-naik overflow-y-auto pt-5 [&>form]:mt-0 [&>form]:rounded-b-none [&>form]:border-b-0 [&>form]:pb-14 [&>form]:shadow-none md:max-h-none md:max-w-md lg:max-w-lg md:animate-pop-masuk md:overflow-visible md:pt-0 md:[&>form]:mt-10 md:[&>form]:rounded-b-2xl md:[&>form]:border-b-2 md:[&>form]:pb-6 md:[&>form]:shadow-[6px_6px_0_#171717]"
          >
            {/* EditExpenseForm nanti */} {/* ⬅️ diisi di 7d */}
            <EditExpenseForm
              catatan={catatanTerpilih}
              onSimpan={async (id, isiBaru) => {
                await editPengeluaran(id, isiBaru);
                setCatatanTerpilih(null); // tutup popup
              }}
            />
          </div>
        </div>
      )}

      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 pt-4 md:block md:py-3 lg:flex">
        {/* Ringkasan */}
        <SummaryPanel pengeluaran={pengeluaran} />

        <div className="mt-7 flex min-h-0 flex-1 flex-col md:grid md:items-start md:gap-5 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-[minmax(0,1fr)]">
          {/* Histori*/}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col md:block md:overflow-hidden md:rounded-2xl md:border-2 md:border-neutral-900 md:bg-[#F2ECE4] md:shadow-[5px_5px_0_#171717] lg:col-span-2 lg:flex lg:min-h-0 lg:flex-col lg:self-stretch">
            {/* Header: judul (desktop) + search + kategori */}
            <div className="flex items-center justify-between gap-3 md:px-6 md:pt-6">
              <div className="hidden shrink-0 md:block">
                <h2 className="text-lg font-extrabold text-neutral-900">
                  Riwayat
                </h2>
                <p className="mt-1 font-angka text-xs text-neutral-500">
                  {pengeluaran.length} transaksi tercatat
                </p>
              </div>
              <div className="flex w-full items-center gap-3 md:w-auto">
                <div className="min-w-0 flex-1">
                  <SearchInput />
                </div>
                <CategoryFilter />
              </div>
            </div>

            {/* Garis (desktop) */}
            <div className="mx-6 mt-5 hidden border-t-2 border-neutral-900 md:block" />

            {/* Wadah mobile: kartu sampai dekat bawah layar*/}
            <div className="flex min-h-0 flex-1 flex-col pb-10 md:contents">
              {/* Tabel*/}
              <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-2xl pb-20 md:pb-0 border-2 border-neutral-900 bg-[#F2ECE4] shadow-[5px_5px_0_#171717] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-0 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none lg:overflow-y-auto">
                <ExpenseList
                  datas={pengeluaran}
                  loading={loading}
                  error={error}
                  onEdit={(catatan) => setCatatanTerpilih(catatan)}
                  onHapus={hapusPengeluaran}
                />
              </div>
            </div>
          </div>

          {/* Kanan:kategori (desktop) */}
          <div className="hidden min-w-0 md:block">
            <CategoryBreakdown pengeluaran={pengeluaran} />
          </div>
        </div>
      </main>

      {/* Tombol tambah mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-5 md:hidden">
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
