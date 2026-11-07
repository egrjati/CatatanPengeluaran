// hitungRingkasan(pengeluaran)
// return { hariIni, bulanIni, rataRata }(angka + keterangan);

import { keTanggalLokal } from "@/utils/tanggal";

export function hitungRingkasan(pengeluaran) {
  const sekarang = new Date();
  const hariIni = keTanggalLokal(sekarang);

  // Hari ini
  const catatanHariIni = pengeluaran.filter(
    (catatan) => catatan.tanggal === hariIni,
  );
  const totalHariIni = catatanHariIni.reduce(
    (total, catatan) => total + catatan.harga,
    0,
  );
  const transaksiHariIni = catatanHariIni.length;

  // Bulan ini
  const bulanIni = hariIni.slice(0, 7);
  const catatanBulanIni = pengeluaran.filter((catatan) =>
    catatan.tanggal.startsWith(bulanIni),
  );
  const totalBulanIni = catatanBulanIni.reduce(
    (total, catatan) => total + catatan.harga,
    0,
  );
  const transaksiBulanIni = catatanBulanIni.length;

  // Rata-rata per hari
  const hariBerjalan = sekarang.getDate();
  const rataRata = Math.round(totalBulanIni / hariBerjalan);
  const namaBulan = sekarang.toLocaleDateString("id-ID", { month: "long" });
  const rentangTanggal = `1-${hariBerjalan} ${namaBulan}`;

  return {
    totalHariIni,
    transaksiHariIni,
    totalBulanIni,
    transaksiBulanIni,
    rataRata,
    rentangTanggal,
  };
}
