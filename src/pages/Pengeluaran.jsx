import { useState } from "react";
import FilterKategori from "@/components/pengeluaran/FilterKategori";
import FormPengeluaran from "@/components/pengeluaran/FormPengeluaran";
import TableBoard from "@/components/pengeluaran/TableBoard";
import { dataPengeluaran } from "@/data/data";

function Pengeluaran() {
  const [pengeluaran, setPengeluaran] = useState(dataPengeluaran);

  function tambahCatatan(itemBaru) {
    // spredOpration | bongkar array dan tambahkan yang baru : 1,2,3,itemBaru
    setPengeluaran((prev) => [...prev, itemBaru]);
  }

  function hapusCatatan(id) {
    setPengeluaran((prev) => prev.filter((catatan) => catatan.id !== id));
  }

  return (
    <div className="mx-auto flex flex-col lg:flex lg:flex-row lg:items-start justify-center gap-4 lg:gap-12 p-4">
      {/* Inputan */}
      <div className="lg:sticky lg:top-4">
        <FormPengeluaran onTambah={tambahCatatan} />
      </div>

      {/* Kanan */}
      <div className="min-w-0">
        {/* Filter Kategori */}
        <div className="lg:sticky lg:top-4 z-10 bg-white px-1 pt-1 pb-1 before:absolute before:inset-x-0 before:-top-4 before:h-4 before:bg-white">
          <FilterKategori />
        </div>

        {/* Table */}
        <TableBoard datas={pengeluaran} onHapus={hapusCatatan} />
      </div>
    </div>
  );
}
export default Pengeluaran;
