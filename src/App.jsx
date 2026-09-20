import {useState} from "react";
import FilterKategori from "@/components/pengeluaran/FilterKategori";
import RingkasanTotal from "@/components/pengeluaran/RingkasanTotal";
import FormPengeluaran from "@/components/pengeluaran/FromPengeluaran";
import TableBoard from "@/components/pengeluaran/TableBoard";
import { dataPengeluaran } from "./data/data";


function App() {
  const [pengeluaran, setPengeluaran] = useState(dataPengeluaran);

  function tambahPengeluaran(itemBaru) {
    // spredOpration | bongkar array dan tambahkan yang baru : 1,2,3,itemBaru
    setPengeluaran([...pengeluaran, itemBaru]);
  }

  // pengeluaran dari useState
  const totalPengeluaran = pengeluaran.reduce(
    (total, item) => total + item.jumlah,
    0,
  );

  return (
    <div className="min-h-screen overflow-hidden bg-white p-4">
      <h1 className="text-black/60 text-xl font-semibold mb-5">
       Catatan Pengeluaran 
      </h1>

      {/* Total Pengeluaran */}
      <RingkasanTotal hasil={totalPengeluaran} />

      {/* Inputan */}
      <FormPengeluaran onTambah={tambahPengeluaran}/>
      

      {/* Filter Kategori */}
      <FilterKategori  />

      {/* Table */}
      <TableBoard datas={pengeluaran}/>

    </div>
  ); 
}
export default App;