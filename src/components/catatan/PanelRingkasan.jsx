// src/components/catatan/PanelRingkasan.jsx
import KartuRingkasan from "@/components/catatan/KartuRingkasan";
import KartuRingkasanMobile from "@/components/catatan/KartuRingkasanMobile";
import { hitungRingkasan } from "@/utils/ringkasan";

function PanelRingkasan({ pengeluaran }) {
  const ringkasan = hitungRingkasan(pengeluaran);

  return (
    <>
      {/* Ringkasan mobile */}
      <div className="pt-3 md:hidden">
        <KartuRingkasanMobile
          total={ringkasan.totalBulanIni}
          hariIni={ringkasan.totalHariIni}
          rataRata={ringkasan.rataRata}
        />
      </div>

      {/* Ringkasan desktop */}
      <div className="hidden gap-5 pt-3 md:grid md:grid-cols-3">
        <KartuRingkasan
          warna="merah"
          stiker="Bulan ini"
          label="total pengeluaran"
          nilai={ringkasan.totalBulanIni}
          keterangan={`${ringkasan.transaksiBulanIni} transaksi`}
        />
        <KartuRingkasan
          warna="kuning"
          stiker="Hari ini"          label="total pengeluaran"
          nilai={ringkasan.totalHariIni}
          keterangan={`${ringkasan.transaksiHariIni} transaksi`}
        />
        <KartuRingkasan
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
export default PanelRingkasan;
