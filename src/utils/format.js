export const formatRupiah = new Intl.NumberFormat("id-ID" , {
    style: "currency",    // format mata uang
    currency: "IDR",      // mata uang -> Rp
    maximumFractionDigits: 0, // tanpa ,00
});

// contoh: Kamis, 5 Nov 2026
export const formatTanggal = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
});