const BASE_URL = import.meta.env.VITE_API_URL;

export async function ambilSemuaCatatan() {
  const respon = await fetch(`${BASE_URL}/pengeluaran`);
  if (!respon.ok) throw new Error("Gagal mengambil data");
  const data = await respon.json();
  return data;
}

export async function tambahCatatan(data) {
  const respon = await fetch(`${BASE_URL}/pengeluaran`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const isiBalasan = await respon.json();

  if (!respon.ok) throw new Error(isiBalasan.pesan);
  return isiBalasan;
}

export async function hapusCatatan(id) {
  const respon = await fetch(`${BASE_URL}/pengeluaran/${id}`, {
    method: "DELETE",
  });
  const isiBalasan = await respon.json();

  if (!respon.ok) throw new Error(isiBalasan.pesan);
  return isiBalasan;
}
