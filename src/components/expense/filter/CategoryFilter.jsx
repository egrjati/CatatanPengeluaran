import { ChevronDown } from "lucide-react";
import { daftarKategori } from "@/data/kategori";

// Dropdown kategori, gaya sama dengan SearchInput
function CategoryFilter({ value, onChange }) {
  const semuaPilihan = ["Semua", ...daftarKategori];

  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={onChange}
        aria-label="Filter kategori"
        className="cursor-pointer appearance-none rounded-xl border-2 border-neutral-900 bg-white py-2 pl-3 pr-9 font-angka text-xs font-bold text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition focus:-translate-y-0.5 focus:shadow-[5px_5px_0_#171717]"
      >
        {semuaPilihan.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      {/* Ikon panah */}
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-900"
        strokeWidth={2.5}
      />
    </div>
  );
}
export default CategoryFilter;
