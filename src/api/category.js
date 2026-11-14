const BASE_URL = import.meta.env.VITE_API_URL;

export async function tarikSemuaCategory() {
  const respon = await fetch(`${BASE_URL}/categories`);
  if (!respon.ok) throw new Error("Gagal tarik data");
  const dataCategory = await respon.json();
  return dataCategory;
}
