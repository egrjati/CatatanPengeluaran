import { useState, useEffect } from "react";
import {
  ambilSemuaCatatan,
  tambahCatatan,
  hapusCatatan,
} from "@/api/catatan.js";
import FilterKategori from "@/components/catatan/FilterKategori";
import FormTambah from "@/components/catatan/FormTambah";
import TableBoard from "@/components/catatan/TableBoard";

function HomePage() {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="mx-auto flex flex-col lg:flex lg:flex-row lg:items-start justify-center gap-4 lg:gap-12 p-4">
      {/* Inputan */}
      <div className="lg:sticky lg:top-4">
        <FormTambah onTambah={tambahPengeluaran} />
      </div>

      {/* Kanan */}
      <div className="min-w-0">
        {/* Filter Kategori */}
        <div className="lg:sticky lg:top-4 z-10 bg-white px-1 pt-1 pb-1 before:absolute before:inset-x-0 before:-top-4 before:h-4 before:bg-white">
          <FilterKategori />
        </div>

        {/* Table */}
        <TableBoard
          datas={pengeluaran}
          loading={loading}
          error={error}
          onHapus={hapusPengeluaran}
        />
      </div>
    </div>
  );
}
export default HomePage;
