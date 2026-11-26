import { useState } from "react";

function AddCategory({ onTambah }) {
  const [namaCategory, setCategoryName] = useState("");
  const [warna, setColor] = useState("#000000");
  const [error, setError] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    // GuardValidation
    const namaBersih = namaCategory.trim();

    if (namaBersih === "") {
      setError({ namaCategory: "Nama wajib diisi" });
      return;
    }

    if (warna === "") {
      setError({ warna: "Warna wajib diisi" });
      return;
    }

    // Objek
    const itemBaru = {
      namaCategory: namaBersih,
      warna: warna,
    };

    // Kosongkan if success
    try {
      await onTambah(itemBaru);
      setCategoryName("");
      setColor("#000000");
      setError({});
    } catch (err) {
      setError({ server: err.message });
    }
  }

  // error objek
  const pesanError = Object.values(error)[0];
  return (
    <form onSubmit={handleSubmit} className="">
      {/* Nama form */}
      <h2 className="text-2xl lg:text-3xl text-center font-extrabold text-[#F2ECE4]">
        Daftar Kategori
      </h2>

      {/* Input Nama */}
      <label className="">
        <span>Nama Kategori</span>
        <input
          type="text"
          value={namaCategory}
          placeholder="Makanan"
          onChange={(e) => {
            setCategoryName(e.target.value);
            setError((prev) => ({ ...prev, namaCategory: "" }));
          }}
        />
      </label>

      {/* Input WARNA */}
      <label className="">
        <span>Warna</span>
        <input
          type="color"
          value={warna}
          onChange={(e) => {
            setColor(e.target.value);
            setError((prev) => ({ ...prev, warna: "" }));
          }}
        />
      </label>

      {/* Submit */}
      <button type="submit">Tambah Kategori</button>

      {/* Pesan error */}
      {pesanError && <p>{pesanError}</p>}
    </form>
  );
}
export default AddCategory;
