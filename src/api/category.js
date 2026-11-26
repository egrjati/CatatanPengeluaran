const BASE_URL = import.meta.env.VITE_API_URL;

// Get data category
export async function tarikSemuaCategory() {
  const respon = await fetch(`${BASE_URL}/categories`);
  if (!respon.ok) throw new Error("Gagal tarik data");
  const dataCategory = await respon.json();
  return dataCategory;
}

// Post data category
export async function tambahCategory(data) {
  const respon = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    // label kalau ini isinya json
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const isiBalasan = await respon.json();
  if (!respon.ok) throw new Error(isiBalasan.pesan);
  return isiBalasan;
}
