import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import notebookMark from "@/assets/icon/notebook-mark.svg";

function Header({ onBukaForm }) {
  return (
    // mobile: menyatu dengan background krem | desktop (md): putih + garis bawah
    <header className="sticky top-0 z-30 bg-[#FAF6F0] md:border-b-2 md:border-neutral-900 md:bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 md:py-3">
        {/* Logo + nama app */}
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={notebookMark}
            alt="Logo Catat Pengeluaran"
            className="h-10 w-10 shrink-0 md:h-9 md:w-9"
          />
          <h1 className="truncate text-lg font-extrabold tracking-tight text-neutral-900 md:text-base">
            Catat Pengeluaran
          </h1>
        </div>

        {/* Kanan */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Pemilih bulan versi MOBILE: pil dengan panah bawah */}
          {/* TODO: logika pilih bulan */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border-2 border-neutral-900 bg-white px-3.5 py-1.5 font-angka text-xs font-bold tracking-wider text-neutral-900 md:hidden"
          >
            NOV 2026
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </button>

          {/* Pemilih bulan versi DESKTOP: < bulan > */}
          {/* TODO: logika ganti bulan (prev / next) */}
          <div className="hidden items-center gap-1 rounded-full border-2 border-neutral-900 bg-white px-1 py-1 shadow-[2px_2px_0_#171717] md:flex">
            <button
              type="button"
              aria-label="Bulan sebelumnya"
              className="rounded-full p-1 transition hover:bg-neutral-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>

            {/* TODO: ganti teks statis ini dengan bulan aktif */}
            <span className="w-24 text-center font-angka text-xs font-bold tracking-wider text-neutral-900">
              NOV 2026
            </span>

            <button
              type="button"
              aria-label="Bulan berikutnya"
              className="rounded-full p-1 transition hover:bg-neutral-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Tombol catat (desktop saja, di mobile pindah ke bawah layar) */}
          <button
            type="button"
            onClick={onBukaForm}
            className="hidden items-center gap-1.5 rounded-xl border-2 border-neutral-900 bg-[#FFE14D] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-neutral-900 shadow-[3px_3px_0_#171717] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:flex"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Catat Pengeluaran
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
