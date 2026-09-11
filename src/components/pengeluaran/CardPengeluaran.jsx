function CardPengeluaran({judul, kategori, tanggal, jumlah}) {
    return (
      <li
        className="p-2 w-44 bg-white border border-black/60 rounded-sm shadow-sm"
      >
        {/* Image */}
        <div className="w-full bg-black h-24 rounded-sm flex justify-center items-center text-white text-lg">
          <h1 className="text-sm">{judul}</h1>
        </div>
        <div className=" flex justify-between items-center mt-2 rounded-xl ">
          <div className="py-1 px-2 border w-fit rounded-xl">
            <p className="text-sm">{kategori}</p>
          </div>
          <p className="text-sm">{tanggal}</p>
        </div>
        <h2 className="text-lg mt-1 text-red-400 font-medium text-center">
          Rp.{jumlah}
        </h2>
      </li>
    );
}
export default CardPengeluaran;