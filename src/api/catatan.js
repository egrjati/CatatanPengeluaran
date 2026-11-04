const BASE_URL = import.meta.env.VITE_API_URL;

export async function ambilSemuaCatatan() {
  const respon = await fetch(`${BASE_URL}/pengeluaran`);
  if (!respon.ok) throw new Error("Gagal mengambil data");
  const data = await respon.json();
  return data;
}
