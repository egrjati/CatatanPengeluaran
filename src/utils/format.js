export const formatRupiah = new Intl.NumberFormat("id-ID" , {
    style: "currency",    // format mata uang
    currency: "IDR",      // mata uang -> Rp
    maximumFractionDigits: 0, //Buang ,00 | Rp tidak pakai sen
});