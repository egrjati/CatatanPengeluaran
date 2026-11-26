const BASE_URL = import.meta.env.VITE_API_URL;

// Get data category
export async function getAllCategory() {
  const respon = await fetch(`${BASE_URL}/categories`);
  if (!respon.ok) throw new Error("Gagal tarik data");
  const dataCategory = await respon.json();
  return dataCategory;
}

// Post
export async function addCategory(data) {
  const respon = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const isiBalasan = await respon.json();
  if (!respon.ok) throw new Error(isiBalasan.pesan);
  return isiBalasan;
}

// Put
export async function editCategory(id, data) {
  const respon = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const isiBalasan = await respon.json();

  if (!respon.ok) throw new Error(isiBalasan.pesan);
  return isiBalasan;
}

// Delete
export async function deleteCategory(id) {
  const respon = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  const isiBalasan = await respon.json();

  if (!respon.ok) throw new Error(isiBalasan.pesan);
  return isiBalasan;
}
