export function keTanggalLokal(date) {
  const tahun = date.getFullYear();
  const bulan = String(date.getMonth() + 1).padStart(2, "0");
  const tanggal = String(date.getDate()).padStart(2, "0");

  return `${tahun}-${bulan}-${tanggal}`;
}
