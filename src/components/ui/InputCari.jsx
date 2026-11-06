import { Search } from "lucide-react";

function InputCari({ value, onChange, placeholder = "cari transaksi..." }) {
  return (
    <div className="relative w-full transition focus-within:-translate-y-0.5 md:w-64">
      <Search
        className="pointer-events-none absolute left-3 z-10 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-900"
        strokeWidth={2.5}
      />

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-xl border-2 border-neutral-900 bg-white py-2 pl-9 pr-3 font-angka text-xs text-neutral-900 shadow-[3px_3px_0_#171717] outline-none transition placeholder:text-neutral-400 focus:shadow-[5px_5px_0_#171717]"
      />
    </div>
  );
}
export default InputCari;
