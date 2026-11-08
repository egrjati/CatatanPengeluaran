// src/components/expense/summary/SummaryPanel.jsx
import SummaryCard from "@/components/expense/summary/SummaryCard";
import SummaryCardMobile from "@/components/expense/summary/SummaryCardMobile";
import { hitungRingkasan } from "@/utils/ringkasan";

function SummaryPanel({ pengeluaran }) {
  const ringkasan = hitungRingkasan(pengeluaran);

  return (
    <>
      {/* Ringkasan mobile */}
      <div className="pt-3 md:hidden">
        <SummaryCardMobile
          total={ringkasan.totalBulanIni}
          hariIni={ringkasan.totalHariIni}
          rataRata={ringkasan.rataRata}
        />
      </div>

      {/* Ringkasan desktop */}
      <div className="hidden gap-5 pt-3 md:grid md:grid-cols-3">
        <SummaryCard
          warna="merah"
          stiker="Bulan ini"
          label="total pengeluaran"
          nilai={ringkasan.totalBulanIni}
          keterangan={`${ringkasan.transaksiBulanIni} transaksi`}
        />
        <SummaryCard
          warna="kuning"
          stiker="Hari ini"
          label="total pengeluaran"
          nilai={ringkasan.totalHariIni}
          keterangan={`${ringkasan.transaksiHariIni} transaksi`}
        />
        <SummaryCard
          warna="putih"
          stiker="Rata-rata"
          label="per hari"
          nilai={ringkasan.rataRata}
          keterangan={ringkasan.rentangTanggal}
        />
      </div>
    </>
  );
}
export default SummaryPanel;
