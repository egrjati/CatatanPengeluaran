function FromPengeluaran() {
  return (
    <div className="mx-auto mt-5 max-w-lg border bg-[#2F7A63] p-4 rounded-md space-y-3">
      {/* Judul */}
      <div className="flex flex-col gap-1">

      <label htmlFor="item-judul" className="text-sm text-white font-semibold">Nama</label>
      <input
        id="item-judul"
        type="text"
        placeholder="Masukkan Nama"
        className="py-1 px-3 text-base border border-white text-white rounded-md"
      />
      </div>

      {/* Jumlah */}
      <div className="flex flex-col gap-1">

        <label htmlFor="item-jumlah" className="text-sm text-white font-semibold">Jumlah</label>
        <input type="text" />

      </div>

      {/* Kategori */}

      {/* Tanggal */}
    </div>
  );
}
export default FromPengeluaran;
