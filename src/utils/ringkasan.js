// hitungRingkasan(pengeluaran)
// return { hariIni, bulanIni, rataRata }(angka + keterangan);
// harga = field db

import { keTanggalLokal } from "@/utils/tanggal";
import { daftarKategori } from "@/data/kategori";

// Fungsi bantuan internal untuk catatan bulan ini saja
function ambilCatatanBulanIni(pengeluaran) {
  const hariIni = keTanggalLokal(new Date());
  const bulanIni = hariIni.slice(0, 7);

  return pengeluaran.filter((catatan) => catatan.tanggal.startsWith(bulanIni));
}

// Summary Total Pengeluaran
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
  const catatanBulanIni = ambilCatatanBulanIni(pengeluaran);

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

// Summary Kategori
export function hitungPerKategori(pengeluaran) {
  const catatanBulanIni = ambilCatatanBulanIni(pengeluaran);
  const totalPerKategori = catatanBulanIni.reduce((toples, catatan) => {
    //hitung per toples kategori
    const isiLama = toples[catatan.kategori] ?? 0;
    toples[catatan.kategori] = isiLama + catatan.harga;
    return toples;
  }, {});

  //Hitung totalSemua
  const totalSemua = catatanBulanIni.reduce(
    (total, catatan) => total + catatan.harga,
    0,
  );

  // Ubah toples jadi daftar semua kategori
  const daftarTotal = daftarKategori.map((kategori) => {
    // ambil total dari toples (0 kalau belum ada transaksi)
    const total = totalPerKategori[kategori] ?? 0;
    // Persen
    const persen =
      totalSemua === 0 ? 0 : Math.round((total / totalSemua) * 100);

    return { kategori, total, persen };
  });

  return daftarTotal.sort((a, b) => b.total - a.total);
}
