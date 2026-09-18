import dcm from "@/assets/icon/dcm.png";

function TableBoard({ datas }) {
  // Early return
  if (datas.length === 0) {
    return (
      <div className="w-full py-24 mt-5 rounded-md bg-[#FBFBFA] border border-black/30 flex flex-col gap-2 justify-center items-center">
        <img
          src={dcm}
          alt="Logo Catatan"
          className="w-16 h-16 lg:w-22 lg:h-22 opacity-55"
        />
        <h1 className="font-bold text-sm md:text-base text-black/70">
          Belum ada pengeluaran
        </h1>
        <p className="text-black/70 font-medium text-xs lg:text-sm max-w-xs lg:max-w-sm text-center">
          Catat pengeluaran pertamamu lewat form di atas — kopi pagi pun layak
          dicatat.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul>
        {datas.map((item) => (
          <li key={item.id}>
            <p>Bama Barang {item.judul}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TableBoard;
